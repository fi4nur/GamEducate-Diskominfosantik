"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Shield,
  Heart,
  Lock,
  Fish,
  Globe,
  Flame,
  Trophy,
  BookOpen,
  Target,
  Clock,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getProfile,
  formatLearningTime,
  timeAgo,
  type GuestProfile,
  type Badge as BadgeType,
  type ActivityItem,
} from "@/data/profileData";

/* ─── Icon map ─────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Eye,
  Shield,
  Heart,
  Lock,
  Fish,
  Globe,
};

/* ─── Activity type icon + color ───────────────────────────── */
function activityMeta(type: ActivityItem["type"]) {
  switch (type) {
    case "module_complete":
      return { icon: BookOpen, color: "bg-brand-500" };
    case "quiz_score":
      return { icon: Target, color: "bg-amber-500" };
    case "badge_earned":
      return { icon: Star, color: "bg-violet-500" };
    case "joined":
      return { icon: Sparkles, color: "bg-emerald-500" };
  }
}

/* ─── Badge color map ──────────────────────────────────────── */
function badgeColors(color: string, unlocked: boolean) {
  if (!unlocked)
    return {
      bg: "bg-surface-100",
      border: "border-surface-200",
      iconBg: "bg-surface-200",
      text: "text-surface-400",
      lvBg: "bg-surface-200 text-surface-400",
    };

  const map: Record<string, { bg: string; border: string; iconBg: string; text: string; lvBg: string }> = {
    brand: {
      bg: "bg-brand-50",
      border: "border-brand-200",
      iconBg: "bg-brand-100",
      text: "text-brand-700",
      lvBg: "bg-brand-600 text-white",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      iconBg: "bg-amber-100",
      text: "text-amber-700",
      lvBg: "bg-amber-500 text-white",
    },
    rose: {
      bg: "bg-rose-50",
      border: "border-rose-200",
      iconBg: "bg-rose-100",
      text: "text-rose-600",
      lvBg: "bg-rose-500 text-white",
    },
    violet: {
      bg: "bg-violet-50",
      border: "border-violet-200",
      iconBg: "bg-violet-100",
      text: "text-violet-600",
      lvBg: "bg-violet-500 text-white",
    },
    cyan: {
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      iconBg: "bg-cyan-100",
      text: "text-cyan-700",
      lvBg: "bg-cyan-600 text-white",
    },
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      iconBg: "bg-emerald-100",
      text: "text-emerald-700",
      lvBg: "bg-emerald-600 text-white",
    },
  };
  return map[color] ?? map.brand;
}

/* ─── Animated counter hook ────────────────────────────────── */
function useCounter(end: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return value;
}

/* ═══════════════════════════════════════════════════════════════
   PROFILE PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function ProfilePage() {
  const [profile, setProfile] = useState<GuestProfile | null>(null);
  const [showAllBadges, setShowAllBadges] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  /* ── SSR placeholder ───────────────────────────────────────── */
  if (!profile) {
    return (
      <main className="min-h-screen bg-surface-50">
        <Navbar activePage="profile" />
        <div className="flex items-center justify-center h-[60vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-10 h-10 border-4 border-brand-200 border-t-brand-700 rounded-full"
          />
        </div>
      </main>
    );
  }

  const xpPercent = Math.round((profile.xp / profile.xpToNextLevel) * 100);
  const visibleBadges = showAllBadges ? profile.badges : profile.badges.slice(0, 4);

  return (
    <main className="min-h-screen bg-surface-50">
      <Navbar activePage="profile" />

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — Profile Header
         ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-cta" />
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-400 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-yellow-400 shadow-xl overflow-hidden bg-gradient-to-br from-brand-300 to-brand-700 flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-display font-extrabold text-white/90 select-none">
                  {profile.displayName.charAt(0)}
                </span>
              </div>
              {/* Level badge on avatar */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -bottom-1 -right-1 px-2.5 py-1 bg-yellow-400 rounded-lg border-2 border-white shadow-md"
              >
                <span className="text-[10px] font-display font-extrabold text-surface-900 leading-none block">
                  LV
                </span>
                <span className="text-sm font-display font-extrabold text-surface-900 leading-none block">
                  {profile.level}
                </span>
              </motion.div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-1">
                {profile.displayName}
              </h1>
              <p className="text-brand-200 font-display font-semibold text-sm md:text-base mb-4">
                {profile.title}
              </p>

              {/* XP Bar */}
              <div className="max-w-md mx-auto md:mx-0 mb-5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-brand-200 flex items-center gap-1">
                    <Zap size={12} className="text-yellow-400" />
                    {profile.xp.toLocaleString("id-ID")} XP
                  </span>
                  <span className="text-xs font-medium text-brand-300">
                    Next Level: {profile.xpToNextLevel.toLocaleString("id-ID")} XP
                  </span>
                </div>
                <div className="w-full h-3 bg-white/15 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPercent}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-300 shadow-sm"
                  />
                </div>
              </div>

              {/* Streak + Rank */}
              <div className="flex items-center justify-center md:justify-start gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Flame size={18} className="text-orange-400" />
                    <span className="font-display text-2xl font-extrabold text-white">
                      {profile.streak}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest">
                    Hari Beruntun
                  </span>
                </motion.div>

                <div className="w-px h-10 bg-white/20" />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Trophy size={18} className="text-yellow-400" />
                    <span className="font-display text-2xl font-extrabold text-white">
                      #{profile.globalRank}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest">
                    Peringkat Global
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — Stats Cards
         ══════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <StatCard
            icon={<BookOpen size={22} className="text-brand-600" />}
            value={`${profile.stats.modulesCompleted} / ${profile.stats.modulesTotal}`}
            label="Modul Selesai"
            accent="brand"
          />
          <StatCard
            icon={<Target size={22} className="text-amber-600" />}
            value={`${profile.stats.quizAccuracy}%`}
            label="Akurasi Kuis"
            accent="amber"
          />
          <StatCard
            icon={<Clock size={22} className="text-violet-600" />}
            value={formatLearningTime(profile.stats.learningTimeMinutes)}
            label="Waktu Belajar"
            accent="violet"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — Badges & Activity
         ══════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ── Left: Badges ───────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-surface-900">
                Lencana Pencapaian
              </h2>
              <button
                onClick={() => setShowAllBadges(!showAllBadges)}
                className="text-xs font-display font-bold text-brand-700 uppercase tracking-wider hover:text-brand-500 transition-colors flex items-center gap-1"
              >
                {showAllBadges ? "Sembunyikan" : "Lihat Semua"}
                <ChevronRight
                  size={14}
                  className={`transition-transform duration-200 ${showAllBadges ? "rotate-90" : ""}`}
                />
              </button>
            </div>

            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3"
            >
              {visibleBadges.map((badge, i) => (
                <BadgeCard key={badge.id} badge={badge} index={i} />
              ))}
            </motion.div>
          </div>

          {/* ── Right: Activities ──────────────────────────────── */}
          <div>
            <h2 className="font-display text-xl font-bold text-surface-900 mb-6">
              Aktivitas Terbaru
            </h2>
            <div className="space-y-0">
              {profile.activities.map((act, i) => (
                <ActivityRow key={act.id} activity={act} index={i} isLast={i === profile.activities.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — Guest Mode Warning
         ══════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-surface-50 border-2 border-surface-200 p-5 sm:p-7"
        >
          {/* Subtle pattern bg */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center">
              <AlertCircle size={20} className="text-amber-600" />
            </div>
            <div>
              <h3 className="font-display font-bold text-surface-900 text-base mb-1">
                Mode Tamu Aktif
              </h3>
              <p className="text-sm text-surface-500 leading-relaxed">
                Progres Anda hanya disimpan di perangkat ini selama sesi berlangsung.
                Hubungkan ke akun sekolah untuk menyimpan progres selamanya dan
                berkolaborasi dengan teman.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-brand-800 text-white text-sm font-display font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-md"
              >
                Hubungkan Akun
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/* ── Stat Card ─────────────────────────────────────────────── */
function StatCard({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  accent: string;
}) {
  const borderMap: Record<string, string> = {
    brand: "hover:border-brand-300",
    amber: "hover:border-amber-300",
    violet: "hover:border-violet-300",
  };

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      className={`bg-white rounded-2xl border border-surface-200 shadow-sm p-5 flex items-center gap-4 transition-all duration-200 ${borderMap[accent] ?? ""}`}
    >
      <div className="w-12 h-12 rounded-xl bg-surface-50 border border-surface-100 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <span className="font-display text-xl md:text-2xl font-extrabold text-surface-900 block leading-tight">
          {value}
        </span>
        <span className="text-xs font-bold text-surface-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Badge Card ────────────────────────────────────────────── */
function BadgeCard({ badge, index }: { badge: BadgeType; index: number }) {
  const unlocked = badge.level > 0;
  const colors = badgeColors(badge.color, unlocked);
  const Icon = ICON_MAP[badge.icon] ?? Shield;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={unlocked ? { y: -4, scale: 1.04 } : {}}
      className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${colors.bg} ${colors.border} ${
        unlocked ? "hover:shadow-lg" : "opacity-60"
      }`}
    >
      {/* Icon circle */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${colors.iconBg}`}
      >
        <Icon
          size={24}
          className={`${colors.text} ${!unlocked ? "opacity-50" : ""}`}
        />
      </div>

      {/* Name */}
      <span
        className={`font-display font-semibold text-xs text-center leading-tight ${
          unlocked ? "text-surface-800" : "text-surface-400"
        }`}
      >
        {unlocked ? badge.name : "Terkunci"}
      </span>

      {/* Level tag */}
      {unlocked && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 + index * 0.06, type: "spring" }}
          className={`mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-display font-extrabold ${colors.lvBg}`}
        >
          LV {badge.level}
        </motion.span>
      )}

      {/* Lock icon */}
      {!unlocked && (
        <Lock
          size={14}
          className="absolute top-2.5 right-2.5 text-surface-400"
        />
      )}
    </motion.div>
  );
}

/* ── Activity Row ──────────────────────────────────────────── */
function ActivityRow({
  activity,
  index,
  isLast,
}: {
  activity: ActivityItem;
  index: number;
  isLast: boolean;
}) {
  const meta = activityMeta(activity.type);
  const Icon = meta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="flex gap-4"
    >
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${meta.color} shadow-sm`}
        >
          <Icon size={14} className="text-white" />
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-surface-200 my-1" />}
      </div>

      {/* Content */}
      <div className={`pb-6 ${isLast ? "" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-display font-bold text-sm text-surface-900 leading-snug">
              {activity.title}
            </h4>
            <p className="text-xs text-surface-500 mt-0.5 leading-relaxed">
              {activity.description}
            </p>
          </div>
          <span className="text-[10px] font-bold text-surface-400 uppercase tracking-wider whitespace-nowrap shrink-0 pt-0.5">
            {timeAgo(activity.timestamp)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
