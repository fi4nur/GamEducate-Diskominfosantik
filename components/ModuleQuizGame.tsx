"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  CheckCircle2,
  XCircle,
  Info,
  ChevronRight,
  Trophy,
  RotateCcw,
  ShieldAlert,
  Flame,
  Lightbulb,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { moduleQuizzes, type ModuleQuestion, type ModuleQuiz } from "@/data/moduleQuizData";
import { getProfile, saveProfile, type GuestProfile, type ActivityItem } from "@/data/profileData";
import { auth } from "@/utils/firebase/client";
import { saveUserProgress, type ModuleResult, calculateDailyStreak, getStreakBonusXp } from "@/utils/userDataSync";
import { shuffleModuleQuestions } from "@/utils/quizShuffle";

interface ModuleQuizGameProps {
  moduleSlug: string;
}

type GamePhase = "playing" | "feedback" | "gameover" | "complete";
const MAX_LIVES = 3;

export default function ModuleQuizGame({ moduleSlug }: ModuleQuizGameProps) {
  const router = useRouter();
  const quiz: ModuleQuiz | undefined = moduleQuizzes[moduleSlug];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [phase, setPhase] = useState<GamePhase>("playing");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedbackShake, setFeedbackShake] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<ModuleQuestion[]>([]);

  // Timer to track real learning time
  const startTimeRef = useRef<number>(Date.now());

  // Initialize shuffled questions on mount
  useEffect(() => {
    if (quiz?.questions) {
      setShuffledQuestions(shuffleModuleQuestions(quiz.questions));
    }
  }, [quiz]);

  // If slug doesn't match any quiz
  if (!quiz) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="font-display text-2xl font-bold text-surface-900 mb-2">Quiz Tidak Ditemukan</h2>
        <p className="text-surface-500 mb-4">Maaf, modul quiz yang Anda cari tidak tersedia.</p>
        <button onClick={() => router.push("/learning-path")} className="btn-primary">
          Kembali ke Learning Path
        </button>
      </div>
    );
  }

  const question = shuffledQuestions[currentIdx];
  const completedCount = currentIdx;
  const totalQuestions = shuffledQuestions.length;

  const handleAnswer = useCallback(
    (optionIdx: number) => {
      if (phase !== "playing" || !question) return;
      setSelectedIdx(optionIdx);
      const isCorrect = optionIdx === question.correctIndex;

      if (isCorrect) {
        const bonus = streak >= 2 ? 10 : 0;
        setScore((s) => s + question.xpReward + bonus);
        setCorrectCount((c) => c + 1);
        setStreak((s) => s + 1);
      } else {
        setLives((l) => l - 1);
        setStreak(0);
        setFeedbackShake(true);
        setTimeout(() => setFeedbackShake(false), 600);
      }
      setPhase("feedback");
    },
    [phase, question, streak]
  );

  const handleNext = useCallback(() => {
    if (lives <= 0 && selectedIdx !== question.correctIndex) {
      setPhase("gameover");
      return;
    }
    if (currentIdx >= totalQuestions - 1) {
      setPhase("complete");
      return;
    }
    setCurrentIdx((i) => i + 1);
    setSelectedIdx(null);
    setPhase("playing");
  }, [lives, selectedIdx, question, currentIdx, totalQuestions]);

  // Handle saving profile upon completion
  useEffect(() => {
    if (phase === "complete") {
      const saveCompletionData = async () => {
        const profile = getProfile();
        if (!profile) return;

        // Map module to badge ID
        const slugToBadgeId: Record<string, string> = {
          "keamanan-password": "security-ace",
          "detektif-hoax": "truth-finder",
          "jejak-digital": "digital-citizen",
          "etika-chatting": "kindness-hero",
          "privasi-data": "privacy-guard",
          "phishing-alert": "phishing-detector",
        };

        const badgeId = slugToBadgeId[moduleSlug];

        // Calculate real elapsed time in minutes
        const elapsedMs = Date.now() - startTimeRef.current;
        const elapsedMinutes = Math.max(1, Math.round(elapsedMs / 60000));
        
        // 1. Mark module as completed in localStorage quiz results
        const storedResults = localStorage.getItem("gameducate_quiz_results");
        const results: Record<string, ModuleResult> = storedResults ? JSON.parse(storedResults) : {};
        results[moduleSlug] = {
          completed: true,
          score: score,
          accuracy: Math.round((correctCount / totalQuestions) * 100),
          completedAt: new Date().toISOString()
        };
        localStorage.setItem("gameducate_quiz_results", JSON.stringify(results));

        // 2. Update Profile Stats & Activities
        // Avoid duplicate counting if already completed in profile stats
        const isAlreadyCompleted = profile.activities.some(
          (act) => act.type === "module_complete" && act.title.includes(quiz.moduleTitle)
        );

        if (!isAlreadyCompleted) {
          profile.stats.modulesCompleted += 1;
        }

        // Calculate daily streak
        const { newStreak, isNewDay } = calculateDailyStreak(profile.streak, profile.lastQuizDate);
        
        let bonusXp = 0;
        if (isNewDay) {
          profile.streak = newStreak;
          profile.lastQuizDate = new Date().toISOString();
          bonusXp = getStreakBonusXp(newStreak);
        }

        const totalEarnedXp = score + bonusXp;

        // Add XP and handle level up
        profile.xp += totalEarnedXp;
        while (profile.xp >= profile.xpToNextLevel) {
          profile.level += 1;
          profile.xp -= profile.xpToNextLevel;
          profile.xpToNextLevel = Math.round(profile.xpToNextLevel * 1.25);
        }

        // Update accuracy
        const newAccuracy = Math.round(
          ((profile.stats.quizAccuracy * (profile.stats.modulesCompleted - 1)) + 
          ((correctCount / totalQuestions) * 100)) / profile.stats.modulesCompleted
        );
        profile.stats.quizAccuracy = isNaN(newAccuracy) ? 100 : newAccuracy;
        
        // Update study duration with real elapsed time
        profile.stats.learningTimeMinutes += elapsedMinutes;

        // Upgrade corresponding badge level
        if (badgeId) {
          const badgeIndex = profile.badges.findIndex((b) => b.id === badgeId);
          if (badgeIndex !== -1) {
            const currentLevel = profile.badges[badgeIndex].level;
            if (currentLevel < profile.badges[badgeIndex].maxLevel) {
              profile.badges[badgeIndex].level += 1;
              profile.badges[badgeIndex].unlockedAt = new Date().toISOString();
              
              // Add badge activity
              profile.activities.unshift({
                id: `act_badge_${Date.now()}`,
                title: `Lencana Naik: ${profile.badges[badgeIndex].name} LV ${profile.badges[badgeIndex].level}`,
                description: `Berhasil meningkatkan lencana karena kelulusan modul ${quiz.moduleTitle}.`,
                timestamp: new Date().toISOString(),
                type: "badge_earned"
              });
            }
          }
        }

        // Add module complete activity
        profile.activities.unshift({
          id: `act_mod_${Date.now()}`,
          title: `Selesai Modul: ${quiz.moduleTitle}`,
          description: `Memperoleh ${score} XP${bonusXp > 0 ? ` + ${bonusXp} Streak Bonus` : ""} dengan tingkat akurasi ${Math.round((correctCount / totalQuestions) * 100)}%.`,
          timestamp: new Date().toISOString(),
          type: "module_complete"
        });

        // Slice activities to keep only latest 10
        profile.activities = profile.activities.slice(0, 10);

        saveProfile(profile);

        // 3. Sync to Firebase if user is logged in
        try {
          const currentUser = auth.currentUser;
          if (currentUser) {
            await saveUserProgress(currentUser.uid, profile, results);
          }
        } catch (err) {
          console.error("Failed to sync to Firebase:", err);
        }
      };

      saveCompletionData();
    }
  }, [phase, moduleSlug, quiz.moduleTitle, score, correctCount, totalQuestions]);

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setLives(MAX_LIVES);
    setPhase("playing");
    setSelectedIdx(null);
    setCorrectCount(0);
    setStreak(0);
    startTimeRef.current = Date.now(); // Reset timer
    if (quiz?.questions) {
      setShuffledQuestions(shuffleModuleQuestions(quiz.questions));
    }
  };

  if (!question && phase === "playing") return null;

  const isCorrectAnswer = selectedIdx === question?.correctIndex;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100);

  /* ── GAME OVER ── */
  if (phase === "gameover") {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-surface-50 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl border border-surface-100 p-10 max-w-md w-full text-center"
        >
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">💀</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-surface-900 mb-2">
            Game Over!
          </h2>
          <p className="text-surface-500 mb-6 text-sm">
            Nyawamu habis dalam modul ini! Tapi jangan berkecil hati, belajar kembali dan coba lagi!
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-surface-50 rounded-2xl p-4">
              <p className="text-2xl font-extrabold font-display text-brand-700">
                {score}
              </p>
              <p className="text-xs text-surface-400 mt-1 font-medium">Skor</p>
            </div>
            <div className="bg-surface-50 rounded-2xl p-4">
              <p className="text-2xl font-extrabold font-display text-amber-500">
                {correctCount}/{totalQuestions}
              </p>
              <p className="text-xs text-surface-400 mt-1 font-medium">Benar</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={handleRestart} className="w-full btn-primary justify-center">
              <RotateCcw size={18} />
              Coba Lagi
            </button>
            <button onClick={() => router.push("/learning-path")} className="w-full btn-outline justify-center">
              Kembali ke Misi
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── COMPLETE ── */
  if (phase === "complete") {
    const accuracy = Math.round((correctCount / totalQuestions) * 100);
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-surface-50 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl border border-surface-100 p-10 max-w-md w-full text-center"
        >
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="font-display text-3xl font-extrabold text-surface-900 mb-1">
            Modul Selesai!
          </h2>
          <p className="text-brand-700 font-display font-bold text-sm mb-6 uppercase tracking-wider">
            {quiz.moduleTitle}
          </p>
          <p className="text-surface-500 mb-6 text-sm">
            Selamat! Kamu telah menyelesaikan modul pembelajaran ini dengan gemilang dan progresmu telah disimpan sementara!
          </p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-surface-50 rounded-2xl p-4">
              <p className="text-xl font-extrabold font-display text-brand-700">
                +{score} XP
              </p>
              <p className="text-[10px] text-surface-400 mt-1 font-semibold uppercase">Reward</p>
            </div>
            <div className="bg-surface-50 rounded-2xl p-4">
              <p className="text-xl font-extrabold font-display text-emerald-600">
                {correctCount}
              </p>
              <p className="text-[10px] text-surface-400 mt-1 font-semibold uppercase">Benar</p>
            </div>
            <div className="bg-surface-50 rounded-2xl p-4">
              <p className="text-xl font-extrabold font-display text-amber-500">
                {accuracy}%
              </p>
              <p className="text-[10px] text-surface-400 mt-1 font-semibold uppercase">Akurasi</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleRestart} className="flex-1 btn-outline justify-center text-xs">
              <RotateCcw size={16} />
              Ulangi
            </button>
            <button onClick={() => router.push("/learning-path")} className="flex-1 btn-primary justify-center text-xs">
              Lanjut
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── MAIN QUIZ ── */
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-4">
            {/* Status Detektif */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-surface-200 shadow-sm p-5"
            >
              <h3 className="font-display font-bold text-brand-700 flex items-center gap-2 mb-4 text-xs uppercase tracking-wider">
                <ShieldAlert size={16} />
                Status Misi
              </h3>

              {/* Score */}
              <div className="flex items-center justify-between mb-3 bg-surface-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-surface-500">Skor</span>
                </div>
                <span className="font-display font-extrabold text-sm text-amber-600">{score}</span>
              </div>

              {/* Lives */}
              <div className="flex items-center justify-between bg-surface-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-rose-500 fill-rose-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-surface-500">Nyawa</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: MAX_LIVES }).map((_, i) => (
                    <Heart
                      key={i}
                      size={16}
                      className={i < lives ? "text-rose-500 fill-rose-500" : "text-surface-200 fill-surface-200"}
                    />
                  ))}
                </div>
              </div>

              {/* Streak */}
              {streak >= 2 && (
                <div className="mt-3 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2">
                  <Flame size={14} className="text-amber-500" />
                  <span className="text-[10px] font-bold text-amber-700">Streak x{streak}! +10 XP</span>
                </div>
              )}
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-surface-200 shadow-sm p-5"
            >
              <h3 className="font-display font-bold text-surface-700 flex items-center gap-2 mb-3 text-xs">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Kemajuan Quiz
              </h3>
              <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                />
              </div>
              <p className="text-[10px] text-surface-400 font-semibold uppercase">
                {completedCount} dari {totalQuestions} Soal Selesai
              </p>
            </motion.div>

            {/* Tips / Help */}
            <button
              onClick={() => setShowTip((v) => !v)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-brand-200 text-brand-700 font-display font-semibold text-xs hover:bg-brand-50 transition-colors"
            >
              <Lightbulb size={14} />
              Petunjuk
            </button>
          </aside>

          {/* ── MAIN QUIZ CARD ── */}
          <div className="flex-1 min-w-0 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={feedbackShake ? { opacity: 1, x: [0, -10, 10, -6, 6, 0] } : { opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6 md:p-8"
              >
                {/* Module title header */}
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-surface-100">
                  <span className="text-[10px] font-bold text-brand-700 uppercase tracking-widest">
                    {quiz.moduleTitle}
                  </span>
                  <span className="text-[10px] font-bold text-surface-400 uppercase tracking-wider">
                    Soal {currentIdx + 1} / {totalQuestions}
                  </span>
                </div>

                {/* Question */}
                <h2 className="font-display text-xl md:text-2xl font-bold text-surface-900 mb-6 leading-snug">
                  {question.question}
                </h2>

                {/* Multiple Choice Options */}
                <div className="space-y-3 mb-6">
                  {question.options.map((option, idx) => {
                    const isSelected = selectedIdx === idx;
                    const isCorrect = idx === question.correctIndex;
                    
                    let cardClass = "border-surface-200 hover:border-brand-300 hover:bg-surface-50";
                    let prefixClass = "bg-surface-100 text-surface-500 group-hover:bg-brand-100 group-hover:text-brand-700";

                    if (phase === "feedback") {
                      if (isCorrect) {
                        cardClass = "border-emerald-500 bg-emerald-50 text-emerald-900";
                        prefixClass = "bg-emerald-500 text-white";
                      } else if (isSelected) {
                        cardClass = "border-red-500 bg-red-50 text-red-900";
                        prefixClass = "bg-red-500 text-white";
                      } else {
                        cardClass = "border-surface-200 opacity-60";
                      }
                    } else if (isSelected) {
                      cardClass = "border-brand-500 bg-brand-50 text-brand-900";
                      prefixClass = "bg-brand-500 text-white";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={phase !== "playing"}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left p-4 rounded-xl border-2 flex items-center gap-4 transition-all duration-200 group ${cardClass}`}
                      >
                        <span className={`w-8 h-8 rounded-lg font-display font-extrabold flex items-center justify-center shrink-0 transition-colors ${prefixClass}`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm md:text-base font-medium">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback description block */}
                {phase === "feedback" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-2xl border-2 mb-6 ${
                      isCorrectAnswer ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrectAnswer ? (
                        <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                      ) : (
                        <XCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                      )}
                      <div>
                        <p className="font-display font-extrabold text-sm mb-1">
                          {isCorrectAnswer ? "Jawaban Benar! 🎉" : "Jawaban Kurang Tepat"}
                        </p>
                        <p className="text-xs leading-relaxed opacity-90">{question.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Action button */}
                {phase === "feedback" && (
                  <button
                    onClick={handleNext}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-display font-semibold text-sm transition-all ${
                      isCorrectAnswer ? "bg-emerald-600 hover:bg-emerald-500 text-white" : "bg-red-500 hover:bg-red-400 text-white"
                    }`}
                  >
                    {currentIdx >= totalQuestions - 1 ? "Selesai & Lihat Hasil" : "Lanjut ke Soal Berikutnya"}
                    <ChevronRight size={16} />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Instruction tooltip */}
            <AnimatePresence>
              {showTip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute bottom-4 right-4 left-4 bg-brand-800 text-white rounded-2xl shadow-xl p-4 z-20"
                >
                  <div className="flex items-start gap-3 text-xs leading-relaxed">
                    <Info size={16} className="text-yellow-400 shrink-0" />
                    <div>
                      <p className="font-display font-bold mb-1 text-sm">Petunjuk Misi:</p>
                      <p className="text-white/80">
                        Bacalah pertanyaan dengan seksama. Pilihlah opsi yang menunjukkan tindakan literasi digital terbaik untuk keamanan dan privasi dirimu. Anda memiliki 3 nyawa untuk menyelesaikan modul ini!
                      </p>
                    </div>
                    <button onClick={() => setShowTip(false)} className="text-white/60 hover:text-white ml-auto">
                      ✕
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
