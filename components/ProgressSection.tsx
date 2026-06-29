"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Heart, Lock, Globe, Fish } from "lucide-react";

const badges = [
  {
    icon: Shield,
    name: "Security Ace",
    earned: true,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    icon: Eye,
    name: "Truth Finder",
    earned: true,
    color: "text-brand-600",
    bgColor: "bg-brand-50",
    borderColor: "border-brand-200",
  },
  {
    icon: Globe,
    name: "Digital Citizen",
    earned: true,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    icon: Heart,
    name: "Kindness Hero",
    earned: false,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  {
    icon: Lock,
    name: "Privacy Guard",
    earned: false,
    color: "text-violet-500",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
  },
  {
    icon: Fish,
    name: "Phishing Detector",
    earned: false,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProgressSection() {
  return (
    <section className="py-20 md:py-28 bg-surface-50" id="leaderboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-surface-900 leading-tight mb-4">
              Lacak Progresmu Selayaknya{" "}
              <span className="text-gradient-brand">Game RPG</span>
            </h2>
            <p className="text-surface-500 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Setiap modul yang kamu selesaikan akan memberikan XP dan lencana.
              Kumpulkan semuanya dan jadilah &quot;Master of Digital
              Literacy&quot;!
            </p>

            {/* Progress Bar */}
            <div className="card-glass p-4 px-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-surface-500">
                  Modul: Keamanan Kata Sandi
                </span>
                <span className="text-xs font-bold text-brand-700">75%</span>
              </div>
              <div className="w-full h-2.5 bg-surface-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "75%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Badges Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {badges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.name}
                  variants={itemVariants}
                  whileHover={badge.earned ? { y: -6, scale: 1.03 } : {}}
                  className={`relative flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                    badge.earned
                      ? `${badge.bgColor} ${badge.borderColor} hover:shadow-lg`
                      : `${badge.bgColor} ${badge.borderColor} opacity-60`
                  }`}
                >
                  {/* Badge icon */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                      badge.earned ? "bg-white shadow-sm" : "bg-surface-200"
                    }`}
                  >
                    <Icon
                      size={28}
                      className={`${badge.color} ${
                        badge.earned ? "" : "opacity-50"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-display font-semibold text-sm ${
                      badge.earned ? "text-surface-800" : "text-surface-400"
                    }`}
                  >
                    {badge.name}
                  </span>

                  {/* Locked overlay */}
                  {!badge.earned && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
                      <Lock
                        size={20}
                        className="text-surface-400 absolute top-3 right-3"
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
