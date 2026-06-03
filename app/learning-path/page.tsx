"use client";

import { motion } from "framer-motion";
import {
  Lock,
  Shield,
  Eye,
  MessageSquare,
  EyeOff,
  Fish,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const missions = [
  {
    id: 1,
    icon: Lock,
    difficulty: "Mudah",
    difficultyColor: "bg-accent-200 text-amber-700",
    duration: "15 Menit",
    title: "Keamanan Password",
    description:
      "Pelajari cara membuat benteng pertahanan digital yang tidak bisa ditembus oleh hacker.",
    completed: false,
    locked: false,
  },
  {
    id: 2,
    icon: Eye,
    difficulty: "Sedang",
    difficultyColor: "bg-orange-100 text-orange-700",
    duration: "20 Menit",
    title: "Detektif Hoax",
    description:
      "Jadilah agen rahasia yang mampu membedakan fakta dan berita bohong di internet.",
    completed: false,
    locked: false,
  },
  {
    id: 3,
    icon: Shield,
    difficulty: "Mudah",
    difficultyColor: "bg-accent-200 text-amber-700",
    duration: "10 Menit",
    title: "Jejak Digital",
    description:
      "Lihat bagaimana bayanganmu tertinggal di internet dan cara menjaganya tetap bersih.",
    completed: false,
    locked: false,
  },
  {
    id: 4,
    icon: MessageSquare,
    difficulty: "Mudah",
    difficultyColor: "bg-accent-200 text-amber-700",
    duration: "15 Menit",
    title: "Etika Chatting",
    description:
      "Belajar cara berkomunikasi yang sopan dan menyenangkan di ruang obrolan digital.",
    completed: false,
    locked: false,
  },
  {
    id: 5,
    icon: EyeOff,
    difficulty: "Sedang",
    difficultyColor: "bg-orange-100 text-orange-700",
    duration: "25 Menit",
    title: "Privasi Data",
    description:
      "Lindungi informasi pribadimu agar tidak jatuh ke tangan orang yang salah.",
    completed: false,
    locked: false,
  },
  {
    id: 6,
    icon: Fish,
    difficulty: "Sulit",
    difficultyColor: "bg-red-100 text-red-700",
    duration: "30 Menit",
    title: "Phishing Alert",
    description:
      "Waspadai umpan berbahaya! Belajar mengenali link dan email palsu yang menipu.",
    completed: false,
    locked: false,
  },
];

export default function LearningPathPage() {
  const completedCount = missions.filter((m) => m.completed).length;

  return (
    <main className="min-h-screen bg-surface-50">
      <Navbar activePage="learning-path" />

      {/* Page Header */}
      <section className="bg-white border-b border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-surface-900 mb-2">
                Petualangan Belajarmu
              </h1>
              <p className="text-surface-500 text-base md:text-lg">
                Selesaikan misi untuk menjadi pahlawan digital!
              </p>
            </motion.div>

            {/* Progress Summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-start md:items-end shrink-0"
            >
              <span className="text-xs font-bold text-brand-700 uppercase tracking-widest mb-1">
                Progress Kamu
              </span>
              <span className="font-display text-lg font-bold text-surface-900">
                Misi Selesai:{" "}
                <span className="text-brand-800">
                  {completedCount}/{missions.length}
                </span>
              </span>
              {/* Progress bar */}
              <div className="mt-2 w-48 h-2 bg-surface-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-700 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(completedCount / missions.length) * 100}%`,
                  }}
                  transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission, i) => {
            const Icon = mission.icon;
            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-surface-200 shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col gap-4 relative overflow-hidden group"
              >
                {/* Top shimmer on hover */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-500 to-accent-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-surface-50 border border-surface-100 flex items-center justify-center">
                  <Icon size={24} className="text-brand-700" />
                </div>

                {/* Badges row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${mission.difficultyColor}`}
                  >
                    {mission.difficulty}
                  </span>
                  <span className="text-xs text-surface-400 font-medium">
                    • {mission.duration}
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-surface-900 mb-1">
                    {mission.title}
                  </h3>
                  <p className="text-sm text-surface-500 leading-relaxed">
                    {mission.description}
                  </p>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-800 text-white text-sm font-semibold font-display rounded-xl hover:bg-brand-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  {mission.completed ? (
                    <>
                      <CheckCircle2 size={16} />
                      Selesai
                    </>
                  ) : (
                    <>
                      Main Sekarang
                      <PlayCircle size={16} />
                    </>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Challenge CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl gradient-cta text-white"
        >
          {/* Background glow */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-400 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-14 py-12">
            <div className="max-w-lg">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-3">
                Ingin Tantangan Lebih?
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                Selesaikan semua modul dasar dan buka &apos;Ujian Pahlawan
                Digital&apos; untuk mendapatkan sertifikat eksklusif Gameducate!
              </p>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#facc15" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3 bg-accent-400 text-surface-900 font-display font-bold rounded-xl transition-colors duration-200 shadow-lg"
              >
                Lihat Sertifikasi
                <ArrowRight size={18} />
              </motion.button>
            </div>

            {/* Decorative image area */}
            <div className="shrink-0 w-full md:w-64 lg:w-80 h-48 md:h-56 rounded-2xl bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Monitor decoration */}
                <div className="w-40 h-28 bg-surface-900/80 rounded-lg border-2 border-surface-700 flex items-center justify-center shadow-xl">
                  <div className="grid grid-cols-3 gap-1 p-3">
                    {Array.from({ length: 9 }).map((_, j) => (
                      <div
                        key={j}
                        className="w-5 h-3 rounded-sm"
                        style={{
                          backgroundColor: `hsl(${220 + j * 15}, 70%, ${40 + j * 5}%)`,
                          opacity: 0.8 + j * 0.02,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-4 w-16 h-2 bg-surface-700/60 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
