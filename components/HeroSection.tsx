"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-white">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1a27c9 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="badge-tag bg-accent-100 text-accent-500 mb-6 w-fit"
            >
              <span className="text-base">🎮</span>
              BELAJAR SAMBIL BERMAIN
            </motion.div>

            {/* Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-surface-900 leading-[1.1] mb-5">
              Jadilah Jagoan Digital{" "}
              <span className="text-gradient-brand">Tanpa Batas!</span>
            </h1>

            {/* Subtitle */}
            <p className="text-surface-500 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Belajar keamanan internet, cara mengenali hoax, dan etika digital
              lewat game seru. Gratis dan tanpa daftar!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#learning-path"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
              >
                Mulai Belajar
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="/quiz"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline"
              >
                🎯 Coba Quiz
              </motion.a>
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400/20 to-brand-800/20 rounded-3xl blur-3xl" />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/safe-security.png"
                  alt="Robot mentor digital Gameducate"
                  width={520}
                  height={520}
                  className="relative z-10 drop-shadow-2xl rounded-2xl"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
