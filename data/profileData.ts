// ─── Types ────────────────────────────────────────────────────
export interface ProfileStats {
  modulesCompleted: number;
  modulesTotal: number;
  quizAccuracy: number; // 0-100
  learningTimeMinutes: number; // total minutes
}

export interface Badge {
  id: string;
  name: string;
  icon: string; // lucide icon name
  level: number; // 0 = locked
  maxLevel: number;
  description: string;
  unlockedAt?: string; // ISO date
  color: string; // tailwind color key
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string; // ISO date
  type: "module_complete" | "quiz_score" | "badge_earned" | "joined";
}

export interface GuestProfile {
  displayName: string;
  title: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  globalRank: number;
  stats: ProfileStats;
  badges: Badge[];
  activities: ActivityItem[];
  createdAt: string;
  lastQuizDate?: string; // ISO date string for daily streak tracking
}

// ─── Default Badges ───────────────────────────────────────────
export const DEFAULT_BADGES: Badge[] = [
  {
    id: "security-ace",
    name: "Security Ace",
    icon: "Shield",
    level: 0,
    maxLevel: 5,
    description: "Menguasai keamanan digital dasar",
    color: "amber",
  },
  {
    id: "truth-finder",
    name: "Truth Finder",
    icon: "Eye",
    level: 0,
    maxLevel: 5,
    description: "Ahli memverifikasi fakta dan hoax",
    color: "brand",
  },
  {
    id: "digital-citizen",
    name: "Digital Citizen",
    icon: "Globe",
    level: 0,
    maxLevel: 5,
    description: "Warga digital yang bertanggung jawab",
    color: "emerald",
  },
  {
    id: "kindness-hero",
    name: "Kindness Hero",
    icon: "Heart",
    level: 0,
    maxLevel: 5,
    description: "Menunjukkan etika digital yang baik",
    color: "rose",
  },
  {
    id: "privacy-guard",
    name: "Privacy Guard",
    icon: "Lock",
    level: 0,
    maxLevel: 5,
    description: "Ahli dalam menjaga privasi data",
    color: "violet",
  },
  {
    id: "phishing-detector",
    name: "Phishing Detector",
    icon: "Fish",
    level: 0,
    maxLevel: 5,
    description: "Mengenali upaya phishing dan penipuan",
    color: "cyan",
  },
];

// ─── Default Activities ───────────────────────────────────────
export const DEFAULT_ACTIVITIES: ActivityItem[] = [
  {
    id: "a1",
    title: "Selesai Modul: Keamanan Kata Sandi",
    description: "Memperoleh 250 XP dan badge Keamanan Dasar.",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    type: "module_complete",
  },
  {
    id: "a2",
    title: "Mencapai Skor Baru di Detektif Hoax",
    description: "Skor sempurna 100% pada level Menengah.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    type: "quiz_score",
  },
  {
    id: "a3",
    title: "Badge Baru: Truth Finder LV 3",
    description: "Naik ke level 3 pada lencana Truth Finder!",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    type: "badge_earned",
  },
  {
    id: "a4",
    title: "Bergabung dengan Gameducate",
    description: "Memulai perjalanan literasi digital hari ini!",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    type: "joined",
  },
];

// ─── Default Guest Profile ───────────────────────────────────
export const DEFAULT_GUEST_PROFILE: GuestProfile = {
  displayName: "Agen Tamu #123",
  title: "Pemula Digital",
  level: 1,
  xp: 0,
  xpToNextLevel: 500,
  streak: 0,
  globalRank: 0,
  stats: {
    modulesCompleted: 0,
    modulesTotal: 6,
    quizAccuracy: 0,
    learningTimeMinutes: 0,
  },
  badges: DEFAULT_BADGES,
  activities: DEFAULT_ACTIVITIES,
  createdAt: new Date().toISOString(),
  lastQuizDate: undefined,
};

// ─── LocalStorage Helpers ─────────────────────────────────────
const STORAGE_KEY = "gameducate_profile";

export function getProfile(): GuestProfile {
  if (typeof window === "undefined") return DEFAULT_GUEST_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as GuestProfile;
      
      // Sync badges to ensure old/removed badges in localStorage don't appear
      parsed.badges = DEFAULT_BADGES.map(defaultBadge => {
        const existingBadge = parsed.badges.find(b => b.id === defaultBadge.id);
        return existingBadge ? { ...defaultBadge, level: existingBadge.level, unlockedAt: existingBadge.unlockedAt } : defaultBadge;
      });
      parsed.stats.modulesTotal = DEFAULT_GUEST_PROFILE.stats.modulesTotal;
      
      return parsed;
    }
  } catch {
    // corrupted data — reset
  }
  // First visit: seed with defaults
  saveProfile(DEFAULT_GUEST_PROFILE);
  return DEFAULT_GUEST_PROFILE;
}

export function saveProfile(profile: GuestProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // storage full — silently fail
  }
}

export function resetProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// ─── Utility ──────────────────────────────────────────────────
export function formatLearningTime(minutes: number): string {
  if (minutes < 60) return `${minutes} Mnt`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours} Jam`;
  return `${hours} Jam ${mins} Mnt`;
}

export function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Kemarin";
  if (days < 7) return `${days} hari lalu`;
  return "Hari ini";
}
