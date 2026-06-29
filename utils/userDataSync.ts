import { ref, get, set, update } from "firebase/database";
import { database, auth } from "@/utils/firebase/client";
import { signOut } from "firebase/auth";
import {
  type GuestProfile,
  type Badge,
  type ActivityItem,
  DEFAULT_BADGES,
  saveProfile,
  formatLearningTime,
} from "@/data/profileData";

// ─── Types ────────────────────────────────────────────────────
export interface FirebaseUserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  module_progress: Record<string, ModuleResult>;
  quiz_accuracy: number;
  learning_time: number; // in minutes
  user_activities: ActivityItem[];
  achievement_badges: Badge[];
  xp_level: number;
  streaks: number;
  last_quiz_date: string | null; // ISO date for daily streak tracking
  updated_at: string;
}

export interface ModuleResult {
  completed: boolean;
  score: number;
  accuracy: number;
  completedAt: string;
}

// ─── Constants ────────────────────────────────────────────────
const STORAGE_KEY = "gameducate_profile";
const QUIZ_RESULTS_KEY = "gameducate_quiz_results";
const TOTAL_MODULES = 6;

// ─── Daily Streak Helpers ─────────────────────────────────────
/**
 * Calculate the new streak value based on the last quiz date.
 * - Same day: streak unchanged (already counted today)
 * - Yesterday: streak + 1 (consecutive day)
 * - Older: reset to 1 (streak broken, starting fresh today)
 * - No previous date: start at 1
 */
export function calculateDailyStreak(
  currentStreak: number,
  lastQuizDate: string | null | undefined
): { newStreak: number; isNewDay: boolean } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!lastQuizDate) {
    return { newStreak: 1, isNewDay: true };
  }

  const lastDate = new Date(lastQuizDate);
  lastDate.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - lastDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Same day — no change
    return { newStreak: currentStreak, isNewDay: false };
  } else if (diffDays === 1) {
    // Consecutive day — increment
    return { newStreak: currentStreak + 1, isNewDay: true };
  } else {
    // Streak broken — reset
    return { newStreak: 1, isNewDay: true };
  }
}

/**
 * Get bonus XP based on streak tier.
 * streak 3+  = +20 XP
 * streak 7+  = +50 XP
 * streak 14+ = +100 XP
 * streak 30+ = +200 XP
 */
export function getStreakBonusXp(streak: number): number {
  if (streak >= 30) return 200;
  if (streak >= 14) return 100;
  if (streak >= 7) return 50;
  if (streak >= 3) return 20;
  return 0;
}

// ─── Fresh Profile for New User ───────────────────────────────
function createFreshProfile(displayName: string): GuestProfile {
  // All badges start locked (level 0)
  const freshBadges: Badge[] = DEFAULT_BADGES.map((b) => ({
    ...b,
    level: 0,
    unlockedAt: undefined,
  }));

  const joinedActivity: ActivityItem = {
    id: `act_joined_${Date.now()}`,
    title: "Bergabung dengan Gameducate",
    description: "Memulai perjalanan literasi digital hari ini!",
    timestamp: new Date().toISOString(),
    type: "joined",
  };

  return {
    displayName,
    title: "Pemula Digital",
    level: 1,
    xp: 0,
    xpToNextLevel: 500,
    streak: 0,
    globalRank: 0,
    stats: {
      modulesCompleted: 0,
      modulesTotal: TOTAL_MODULES,
      quizAccuracy: 0,
      learningTimeMinutes: 0,
    },
    badges: freshBadges,
    activities: [joinedActivity],
    createdAt: new Date().toISOString(),
    lastQuizDate: undefined,
  };
}

// ─── Load User Profile from Firebase ──────────────────────────
export async function loadUserProfile(
  userId: string,
  displayName: string,
  avatarUrl?: string | null
): Promise<GuestProfile> {
  const dbRef = ref(database, `users/${userId}`);
  const snapshot = await get(dbRef);

  if (!snapshot.exists()) {
    const freshProfile = createFreshProfile(displayName);
    await initNewUserData(userId, displayName, avatarUrl);
    saveProfile(freshProfile);
    localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify({}));
    return freshProfile;
  }

  const data = snapshot.val() as FirebaseUserProfile;
  const profile = firebaseToLocalProfile(data, displayName);

  // Populate localStorage
  saveProfile(profile);

  // Also sync quiz results
  const moduleProgress = (data.module_progress as Record<string, ModuleResult>) || {};
  localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(moduleProgress));

  return profile;
}

// ─── Convert Firebase node to local GuestProfile ───────────────
function firebaseToLocalProfile(
  data: FirebaseUserProfile,
  displayName: string
): GuestProfile {
  const moduleProgress = (data.module_progress as Record<string, ModuleResult>) || {};
  const badges = (data.achievement_badges as Badge[]) || DEFAULT_BADGES.map((b) => ({ ...b, level: 0, unlockedAt: undefined }));
  const activities = (data.user_activities as ActivityItem[]) || [];

  const completedModules = Object.values(moduleProgress).filter((m) => m.completed).length;

  // Calculate accuracy from module progress
  const completedEntries = Object.values(moduleProgress).filter((m) => m.completed);
  const avgAccuracy =
    completedEntries.length > 0
      ? Math.round(completedEntries.reduce((sum, m) => sum + m.accuracy, 0) / completedEntries.length)
      : 0;

  // Calculate XP level from xp_level field
  const level = data.xp_level || 1;

  // Calculate XP — we derive from level
  const xpToNextLevel = Math.round(500 * Math.pow(1.25, level - 1));

  // Calculate total XP earned from completed modules
  const totalXpFromModules = completedEntries.reduce((sum, m) => sum + m.score, 0);
  const xpInCurrentLevel = totalXpFromModules % xpToNextLevel;

  // Determine title based on level
  let title = "Pemula Digital";
  if (level >= 10) title = "Master of Digital Literacy";
  else if (level >= 7) title = "Digital Guardian";
  else if (level >= 4) title = "Digital Explorer";
  else if (level >= 2) title = "Pelajar Digital";

  return {
    displayName,
    title,
    level,
    xp: xpInCurrentLevel,
    xpToNextLevel,
    streak: data.streaks || 0,
    globalRank: 0,
    stats: {
      modulesCompleted: completedModules,
      modulesTotal: TOTAL_MODULES,
      quizAccuracy: data.quiz_accuracy || avgAccuracy,
      learningTimeMinutes: data.learning_time || 0,
    },
    badges: badges.length > 0 ? badges : DEFAULT_BADGES.map((b) => ({ ...b, level: 0, unlockedAt: undefined })),
    activities:
      activities.length > 0
        ? activities
        : [
            {
              id: `act_joined_${Date.now()}`,
              title: "Bergabung dengan Gameducate",
              description: "Memulai perjalanan literasi digital hari ini!",
              timestamp: new Date().toISOString(),
              type: "joined" as const,
            },
          ],
    createdAt: data.updated_at || new Date().toISOString(),
    lastQuizDate: data.last_quiz_date || undefined,
  };
}

// ─── Initialize New User Data in Firebase ─────────────────────
export async function initNewUserData(
  userId: string,
  displayName: string,
  avatarUrl?: string | null
): Promise<void> {
  const freshBadges = DEFAULT_BADGES.map((b) => ({
    ...b,
    level: 0,
    unlockedAt: Date.now(),
  }));

  const joinedActivity: ActivityItem = {
    id: `act_joined_${Date.now()}`,
    title: "Bergabung dengan Gameducate",
    description: "Memulai perjalanan literasi digital hari ini!",
    timestamp: new Date().toISOString(),
    type: "joined",
  };

  const dbRef = ref(database, `users/${userId}`);
  await set(dbRef, {
    id: userId,
    full_name: displayName,
    avatar_url: avatarUrl || null,
    module_progress: {},
    quiz_accuracy: 0,
    learning_time: 0,
    user_activities: [joinedActivity],
    achievement_badges: freshBadges,
    xp_level: 1,
    streaks: 0,
    last_quiz_date: null,
    updated_at: new Date().toISOString(),
  });
}

// ─── Save Progress to Firebase ────────────────────────────────
export async function saveUserProgress(
  userId: string,
  profile: GuestProfile,
  quizResults: Record<string, ModuleResult>
): Promise<void> {
  const dbRef = ref(database, `users/${userId}`);
  await update(dbRef, {
    module_progress: quizResults,
    quiz_accuracy: profile.stats.quizAccuracy,
    learning_time: profile.stats.learningTimeMinutes,
    user_activities: profile.activities,
    achievement_badges: profile.badges,
    xp_level: profile.level,
    streaks: profile.streak,
    last_quiz_date: profile.lastQuizDate || null,
    updated_at: new Date().toISOString(),
  });
}

// ─── Clear All Local Data (Logout) ───────────────────────────
export function clearLocalData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(QUIZ_RESULTS_KEY);
}

// ─── Handle Logout ────────────────────────────────────────────
export async function handleLogout(): Promise<void> {
  clearLocalData();
  await signOut(auth);
}
