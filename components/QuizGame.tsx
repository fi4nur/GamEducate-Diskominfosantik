"use client";

import { useState, useEffect, useCallback } from "react";
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
  MessageSquare,
  Share2,
  ThumbsUp,
  Lightbulb,
  ShieldAlert,
  Flame,
  BadgeCheck,
} from "lucide-react";
import { quizQuestions, MAX_LIVES, type Answer } from "@/data/quizData";

type GamePhase = "playing" | "feedback" | "gameover" | "complete";

export default function QuizGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [phase, setPhase] = useState<GamePhase>("playing");
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [showTip, setShowTip] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedbackShake, setFeedbackShake] = useState(false);

  const question = quizQuestions[currentIdx];
  const completedCount = currentIdx;
  const totalQuestions = quizQuestions.length;

  const handleAnswer = useCallback(
    (answer: Answer) => {
      if (phase !== "playing") return;
      setSelectedAnswer(answer);
      setShowTip(false);
      const isCorrect = answer === question.answer;

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
    if (lives <= 0 && selectedAnswer !== question.answer) {
      setPhase("gameover");
      return;
    }
    if (currentIdx >= totalQuestions - 1) {
      setPhase("complete");
      return;
    }
    setCurrentIdx((i) => i + 1);
    setSelectedAnswer(null);
    setShowTip(false);
    setPhase("playing");
  }, [lives, selectedAnswer, question, currentIdx, totalQuestions]);

  // After lives reach 0 on feedback, transition to gameover
  useEffect(() => {
    if (phase === "feedback" && lives <= 0 && selectedAnswer !== question.answer) {
      const t = setTimeout(() => setPhase("gameover"), 1800);
      return () => clearTimeout(t);
    }
  }, [phase, lives, selectedAnswer, question]);

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setLives(MAX_LIVES);
    setPhase("playing");
    setSelectedAnswer(null);
    setShowTip(false);
    setCorrectCount(0);
    setStreak(0);
  };

  const isCorrectAnswer = selectedAnswer === question.answer;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100);

  /* ── GAME OVER ── */
  if (phase === "gameover") {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-surface-50 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="bg-white rounded-3xl shadow-2xl border border-surface-100 p-10 max-w-md w-full text-center"
        >
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">💀</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-surface-900 mb-2">
            Game Over!
          </h2>
          <p className="text-surface-500 mb-6">
            Nyawamu habis, Detektif! Tapi jangan menyerah — latihan lebih keras
            lagi!
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-surface-50 rounded-2xl p-4">
              <p className="text-2xl font-extrabold font-display text-brand-700">
                {score}
              </p>
              <p className="text-xs text-surface-400 mt-1 font-medium">Skor Akhir</p>
            </div>
            <div className="bg-surface-50 rounded-2xl p-4">
              <p className="text-2xl font-extrabold font-display text-amber-500">
                {correctCount}/{totalQuestions}
              </p>
              <p className="text-xs text-surface-400 mt-1 font-medium">Benar</p>
            </div>
          </div>
          <button
            onClick={handleRestart}
            className="w-full btn-primary justify-center"
          >
            <RotateCcw size={18} />
            Coba Lagi
          </button>
        </motion.div>
      </div>
    );
  }

  /* ── COMPLETE ── */
  if (phase === "complete") {
    const accuracy = Math.round((correctCount / totalQuestions) * 100);
    const rank =
      accuracy >= 90
        ? { label: "Master Detektif 🏆", color: "text-amber-500", bg: "bg-amber-50" }
        : accuracy >= 70
        ? { label: "Detektif Senior 🥈", color: "text-brand-600", bg: "bg-brand-50" }
        : { label: "Detektif Junior 🥉", color: "text-rose-500", bg: "bg-rose-50" };

    return (
      <div className="min-h-[calc(100vh-4rem)] bg-surface-50 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="bg-white rounded-3xl shadow-2xl border border-surface-100 p-10 max-w-md w-full text-center"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h2 className="font-display text-3xl font-extrabold text-surface-900 mb-2">
            Kasus Selesai!
          </h2>
          <p className="text-surface-500 mb-6">
            Semua kasus telah kamu tangani dengan gemilang!
          </p>

          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full ${rank.bg} ${rank.color} font-display font-bold mb-6`}>
            <Trophy size={18} />
            {rank.label}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-surface-50 rounded-2xl p-4">
              <p className="text-2xl font-extrabold font-display text-brand-700">
                {score}
              </p>
              <p className="text-xs text-surface-400 mt-1 font-medium">Total XP</p>
            </div>
            <div className="bg-surface-50 rounded-2xl p-4">
              <p className="text-2xl font-extrabold font-display text-emerald-600">
                {correctCount}
              </p>
              <p className="text-xs text-surface-400 mt-1 font-medium">Benar</p>
            </div>
            <div className="bg-surface-50 rounded-2xl p-4">
              <p className="text-2xl font-extrabold font-display text-amber-500">
                {accuracy}%
              </p>
              <p className="text-xs text-surface-400 mt-1 font-medium">Akurasi</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 btn-outline justify-center"
            >
              <RotateCcw size={18} />
              Main Lagi
            </button>
            <a href="/learning-path" className="flex-1 btn-primary justify-center">
              <ChevronRight size={18} />
              Lanjut
            </a>
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
              <h3 className="font-display font-bold text-brand-700 flex items-center gap-2 mb-4 text-sm uppercase tracking-wider">
                <ShieldAlert size={16} />
                Status Detektif
              </h3>

              {/* Score */}
              <div className="flex items-center justify-between mb-3 bg-surface-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-surface-500">
                    Skor
                  </span>
                </div>
                <motion.span
                  key={score}
                  initial={{ scale: 1.4, color: "#f59e0b" }}
                  animate={{ scale: 1, color: "#d97706" }}
                  transition={{ duration: 0.4 }}
                  className="font-display font-extrabold text-lg text-amber-600"
                >
                  {score}
                </motion.span>
              </div>

              {/* Lives */}
              <div className="flex items-center justify-between bg-surface-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-rose-500 fill-rose-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-surface-500">
                    Nyawa
                  </span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: MAX_LIVES }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={
                        i >= lives && phase === "feedback"
                          ? { scale: [1, 1.4, 0.8, 1] }
                          : {}
                      }
                      transition={{ duration: 0.4 }}
                    >
                      <Heart
                        size={18}
                        className={
                          i < lives
                            ? "text-rose-500 fill-rose-500"
                            : "text-surface-200 fill-surface-200"
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Streak */}
              {streak >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5"
                >
                  <Flame size={16} className="text-amber-500" />
                  <span className="text-xs font-bold text-amber-700">
                    Streak x{streak}! +10 XP bonus
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-surface-200 shadow-sm p-5"
            >
              <h3 className="font-display font-bold text-surface-700 flex items-center gap-2 mb-3 text-sm">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Progres Modul
              </h3>
              <div className="w-full h-2.5 bg-surface-100 rounded-full overflow-hidden mb-2">
                <motion.div
                  key={completedCount}
                  initial={{ width: `${Math.round(((completedCount > 0 ? completedCount - 1 : 0) / totalQuestions) * 100)}%` }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                />
              </div>
              <p className="text-xs text-surface-400 font-medium">
                {completedCount} dari {totalQuestions} Tantangan Selesai
              </p>
            </motion.div>

            {/* Bantuan */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setShowTip((v) => !v)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-brand-200 text-brand-700 font-display font-semibold text-sm hover:bg-brand-50 transition-colors"
            >
              <Lightbulb size={16} />
              Bantuan
            </motion.button>
          </aside>

          {/* ── MAIN QUIZ CARD ── */}
          <div className="flex-1 min-w-0 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={
                  feedbackShake
                    ? { opacity: 1, x: [0, -10, 10, -6, 6, 0] }
                    : { opacity: 1, x: 0 }
                }
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6 md:p-8"
              >
                {/* Case Badge */}
                <div className="flex justify-center mb-4">
                  <span className="badge-tag bg-brand-700 text-white text-xs">
                    {question.caseLabel}
                  </span>
                </div>

                {/* Question */}
                <h2 className="font-display text-2xl md:text-3xl font-bold text-surface-900 text-center mb-6">
                  {question.question}
                </h2>

                {/* Social Post Card */}
                <div className="border border-surface-200 rounded-2xl overflow-hidden mb-6 bg-white shadow-sm">
                  {/* Post Header */}
                  <div className="flex items-center gap-3 p-4 pb-3 border-b border-surface-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-surface-300 to-surface-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {question.post.username[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-surface-800 text-sm truncate">
                          {question.post.username}
                        </span>
                        {question.post.verified && (
                          <BadgeCheck size={15} className="text-brand-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-surface-400">
                        {question.post.verified ? "Akun Resmi" : "Sponsor"} •{" "}
                        {question.post.timeAgo}
                      </p>
                    </div>
                  </div>

                  {/* Post Image */}
                  {question.post.imageEmoji && (
                    <div className="bg-gradient-to-br from-teal-400 to-blue-500 flex flex-col items-center justify-center py-12 gap-3">
                      <span className="text-6xl">{question.post.imageEmoji}</span>
                      <span className="text-white/80 text-sm font-medium">
                        {question.post.imageDescription}
                      </span>
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="p-4">
                    <p className="text-surface-700 text-sm leading-relaxed">
                      {question.post.content}
                    </p>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center gap-5 px-4 pb-4 text-surface-400 text-xs">
                    <div className="flex items-center gap-1.5">
                      <ThumbsUp size={14} />
                      <span>{question.post.likes.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare size={14} />
                      <span>{question.post.comments.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Share2 size={14} />
                      <span>{question.post.shares.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>

                {/* Answer Buttons */}
                <AnimatePresence mode="wait">
                  {phase === "playing" && (
                    <motion.div
                      key="buttons"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleAnswer("hoax")}
                        id="btn-hoax"
                        className="flex flex-col items-center justify-center gap-2 py-6 rounded-2xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-display font-bold text-xl shadow-lg shadow-red-200 transition-all duration-150"
                      >
                        <XCircle size={32} />
                        Hoax!
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleAnswer("fakta")}
                        id="btn-fakta"
                        className="flex flex-col items-center justify-center gap-2 py-6 rounded-2xl bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-yellow-900 font-display font-bold text-xl shadow-lg shadow-yellow-200 transition-all duration-150"
                      >
                        <CheckCircle2 size={32} />
                        Fakta!
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Feedback */}
                  {phase === "feedback" && (
                    <motion.div
                      key="feedback"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className={`rounded-2xl p-5 border-2 ${
                        isCorrectAnswer
                          ? "bg-emerald-50 border-emerald-300"
                          : "bg-red-50 border-red-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {isCorrectAnswer ? (
                          <CheckCircle2
                            size={24}
                            className="text-emerald-600 flex-shrink-0"
                          />
                        ) : (
                          <XCircle
                            size={24}
                            className="text-red-500 flex-shrink-0"
                          />
                        )}
                        <div>
                          <p
                            className={`font-display font-bold text-base ${
                              isCorrectAnswer
                                ? "text-emerald-700"
                                : "text-red-600"
                            }`}
                          >
                            {isCorrectAnswer
                              ? `Tepat! +${question.xpReward}${streak >= 2 ? " +10 bonus" : ""} XP`
                              : "Salah! -1 Nyawa"}
                          </p>
                          <p
                            className={`text-sm leading-relaxed mt-1 ${
                              isCorrectAnswer
                                ? "text-emerald-600"
                                : "text-red-500"
                            }`}
                          >
                            {question.explanation}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleNext}
                        id="btn-next"
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-display font-semibold text-sm transition-all mt-2 ${
                          isCorrectAnswer
                            ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                            : "bg-red-500 hover:bg-red-400 text-white"
                        }`}
                      >
                        {currentIdx >= totalQuestions - 1
                          ? "Lihat Hasil"
                          : "Kasus Berikutnya"}
                        <ChevronRight size={16} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {/* Tips Detektif */}
            <AnimatePresence>
              {showTip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="absolute bottom-4 right-4 left-4 md:left-auto md:w-80 bg-brand-800 text-white rounded-2xl shadow-2xl p-4 z-20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Info size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm mb-1">
                        Tips Detektif:
                      </p>
                      <p className="text-white/85 text-xs leading-relaxed">
                        {question.tip}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowTip(false)}
                      className="text-white/60 hover:text-white ml-auto flex-shrink-0"
                    >
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
