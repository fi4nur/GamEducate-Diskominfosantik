"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Award,
  Lock,
  Wifi,
  Trophy,
  Star,
  TrendingUp,
  Medal,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const topThree = [
  {
    rank: 2,
    name: "Anon-88",
    xp: 1240,
    avatarColor: "from-surface-300 to-surface-500",
    initials: "A8",
    borderColor: "border-surface-300",
    highlight: false,
    size: "small",
  },
  {
    rank: 1,
    name: "User-X",
    xp: 1450,
    avatarColor: "from-brand-500 to-brand-800",
    initials: "UX",
    borderColor: "border-accent-400",
    highlight: true,
    size: "large",
  },
  {
    rank: 3,
    name: "Anon-12",
    xp: 980,
    avatarColor: "from-surface-300 to-surface-500",
    initials: "A1",
    borderColor: "border-brand-300",
    highlight: false,
    size: "small",
  },
];

const leaderboardRows = [
  {
    rank: 4,
    name: "Anon-72",
    subtitle: "Level 12 • Junior Guardian",
    xp: 820,
    isCurrentUser: true,
  },
  { rank: 5, name: "Anon-44", subtitle: "Level 11", xp: 790, isCurrentUser: false },
  { rank: 6, name: "User-Beta", subtitle: "Level 10", xp: 715, isCurrentUser: false },
  { rank: 7, name: "Anon-102", subtitle: "Level 9", xp: 680, isCurrentUser: false },
];

const badges = [
  {
    icon: Shield,
    label: "Penjaga Privasi",
    earned: true,
    color: "from-brand-600 to-brand-800",
  },
  {
    icon: Award,
    label: "Etika Emas",
    earned: true,
    color: "from-brand-500 to-brand-700",
  },
  {
    icon: Lock,
    label: "Pemburu Hoax",
    earned: false,
    color: "from-surface-400 to-surface-600",
  },
  {
    icon: Wifi,
    label: "Master Koneksi",
    earned: false,
    color: "from-surface-400 to-surface-600",
  },
];

const rankMedalColors: Record<number, string> = {
  1: "text-accent-400",
  2: "text-surface-400",
  3: "text-amber-600",
};

export default function LeaderboardPage() {
  const userLevel = 12;
  const currentXP = 820;
  const nextLevelXP = 1000;
  const progressPct = (currentXP / nextLevelXP) * 100;
  const xpToNext = nextLevelXP - currentXP;
  const earnedBadges = badges.filter((b) => b.earned).length;

  return (
    <main className="min-h-screen bg-surface-50">
      <Navbar activePage="leaderboard" />

      {/* Page Header */}
      <section className="bg-white border-b border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-surface-900 mb-2">
              Leaderboard &amp; Pencapaian
            </h1>
            <p className="text-surface-500 text-base md:text-lg">
              Lihat peringkatmu dan kumpulkan lencana langka melalui tantangan
              digital literacy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Leaderboard Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden"
          >
            {/* Top 3 Podium */}
            <div className="bg-gradient-to-b from-surface-50 to-white px-6 py-8 border-b border-surface-100">
              <div className="flex items-end justify-center gap-6 md:gap-10">
                {topThree.map((player, i) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="flex flex-col items-center gap-2"
                  >
                    {/* Rank badge */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                        player.rank === 1
                          ? "bg-accent-400 text-surface-900"
                          : "bg-surface-200 text-surface-600"
                      }`}
                    >
                      {player.rank}
                    </div>

                    {/* Avatar */}
                    <div
                      className={`relative ${
                        player.size === "large"
                          ? "w-20 h-20 md:w-24 md:h-24"
                          : "w-16 h-16 md:w-20 md:h-20"
                      } rounded-full bg-gradient-to-br ${player.avatarColor} border-4 ${player.borderColor} flex items-center justify-center shadow-md ${
                        player.highlight ? "ring-4 ring-accent-300/50" : ""
                      }`}
                    >
                      <span
                        className={`font-display font-extrabold text-white ${
                          player.size === "large" ? "text-2xl" : "text-lg"
                        }`}
                      >
                        {player.initials}
                      </span>
                      {player.rank === 1 && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <Trophy
                            size={20}
                            className="text-accent-400 drop-shadow"
                          />
                        </div>
                      )}
                    </div>

                    {/* Name & XP */}
                    <p
                      className={`font-display font-bold text-surface-900 text-center ${
                        player.size === "large" ? "text-lg" : "text-sm"
                      }`}
                    >
                      {player.name}
                    </p>
                    <span className="text-brand-700 font-bold text-sm">
                      {player.xp.toLocaleString()} XP
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Table Header */}
            <div className="px-6 py-3 grid grid-cols-[80px_1fr_auto] gap-4 border-b border-surface-100">
              <span className="text-xs font-extrabold uppercase tracking-widest text-surface-400">
                Peringkat
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-surface-400">
                Pemain
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-surface-400">
                Skor Total
              </span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-surface-50">
              {leaderboardRows.map((row, i) => (
                <motion.div
                  key={row.rank}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className={`px-6 py-4 grid grid-cols-[80px_1fr_auto] gap-4 items-center transition-colors duration-150 ${
                    row.isCurrentUser
                      ? "bg-brand-50 border-l-4 border-l-brand-700"
                      : "hover:bg-surface-50"
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-center gap-2">
                    {row.rank <= 3 ? (
                      <Medal
                        size={18}
                        className={rankMedalColors[row.rank] || "text-surface-400"}
                      />
                    ) : (
                      <span className="text-surface-500 font-bold text-sm w-5 text-center">
                        {row.rank}
                      </span>
                    )}
                  </div>

                  {/* Player */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm ${
                        row.isCurrentUser
                          ? "bg-gradient-to-br from-brand-500 to-brand-800"
                          : "bg-gradient-to-br from-surface-300 to-surface-500"
                      }`}
                    >
                      {row.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          row.isCurrentUser
                            ? "text-brand-800"
                            : "text-surface-800"
                        }`}
                      >
                        {row.name}
                        {row.isCurrentUser && (
                          <span className="ml-1 text-xs font-normal text-surface-500">
                            (Anda)
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-surface-400">{row.subtitle}</p>
                    </div>
                  </div>

                  {/* XP */}
                  <span
                    className={`font-display font-bold text-sm ${
                      row.isCurrentUser ? "text-brand-700" : "text-surface-600"
                    }`}
                  >
                    {row.xp.toLocaleString()} XP
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Sidebar */}
          <div className="lg:w-80 xl:w-96 flex flex-col gap-5">
            {/* Badges Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-2xl border border-surface-200 shadow-sm p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-base font-bold text-surface-900">
                  Lencana Anda
                </h2>
                <span className="text-sm font-bold text-brand-700">
                  {earnedBadges}/{badges.length} Selesai
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, i) => {
                  const Icon = badge.icon;
                  return (
                    <motion.div
                      key={badge.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                      className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                        badge.earned
                          ? "bg-brand-50 border-brand-200 hover:border-brand-400"
                          : "bg-surface-50 border-surface-200 opacity-60"
                      }`}
                    >
                      {!badge.earned && (
                        <Lock
                          size={12}
                          className="absolute top-2 right-2 text-surface-400"
                        />
                      )}
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-md`}
                      >
                        <Icon size={20} className="text-white" />
                      </div>
                      <span className="text-[11px] font-bold text-surface-600 text-center uppercase tracking-wide leading-tight">
                        {badge.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-4 w-full py-3 bg-brand-800 hover:bg-brand-700 text-white text-sm font-semibold font-display rounded-xl transition-colors duration-200 shadow-md"
              >
                Main terus untuk kumpulkan semua lencana!
              </motion.button>
            </motion.div>

            {/* Level Progress Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl gradient-cta text-white p-6 shadow-md"
            >
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-400/30 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={14} className="text-accent-300" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                    Progress Level
                  </span>
                </div>

                <div className="flex items-end gap-2 mb-4">
                  <h3 className="font-display text-4xl font-extrabold">
                    Level {userLevel}
                  </h3>
                  <Star
                    size={20}
                    className="text-accent-400 mb-1 fill-accent-400"
                  />
                </div>

                {/* XP Bar */}
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-accent-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
                  />
                </div>

                <p className="text-sm text-white/70">
                  {xpToNext} XP lagi menuju Level {userLevel + 1}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
