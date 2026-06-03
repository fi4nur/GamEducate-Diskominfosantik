"use client";

import { motion } from "framer-motion";
import { Shield, Search, Users } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Shield,
    title: "Keamanan Internet",
    description:
      "Pelajari cara membuat kata sandi yang kuat dan menghindari penipuan online melalui simulasi misi rahasia.",
    color: "text-brand-700",
    bgColor: "bg-brand-50",
  },
  {
    icon: Search,
    title: "Detektif Hoax",
    description:
      "Asah instingmu dalam membedakan fakta dan berita bohong dengan permainan teka-teki yang menantang.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Users,
    title: "Etika Digital",
    description:
      "Bagaimana cara berkomentar yang baik? Pelajari netiket dan jadilah warga digital yang inspiratif.",
    color: "text-brand-700",
    bgColor: "bg-brand-50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function WhySection() {
  return (
    <section className="py-20 md:py-28 bg-white" id="learning-path">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-title">
            Kenapa Literasi Digital Itu Penting?
          </h2>
          <p className="section-subtitle">
            Dunia internet itu luas dan penuh petualangan. Kami membekalimu
            dengan &quot;senjata&quot; yang tepat untuk tetap aman.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* Card 1: Keamanan Internet */}
          <motion.div
            variants={itemVariants}
            className="card-glass p-6 md:p-8 group cursor-pointer transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl ${features[0].bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
              <Shield size={24} className={features[0].color} />
            </div>
            <h3 className="font-display font-bold text-lg text-surface-900 mb-2">
              {features[0].title}
            </h3>
            <p className="text-surface-500 text-sm leading-relaxed">
              {features[0].description}
            </p>
          </motion.div>

          {/* Card 2: Center Image */}
          <motion.div
            variants={itemVariants}
            className="card-glass overflow-hidden group cursor-pointer transition-all duration-300 row-span-2"
          >
            <div className="relative w-full h-full min-h-[280px]">
              <Image
                src="/safe-security.png"
                alt="Brankas keamanan digital"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-900/30 to-transparent" />
            </div>
          </motion.div>

          {/* Card 3: Detektif Hoax */}
          <motion.div
            variants={itemVariants}
            className="card-glass p-6 md:p-8 group cursor-pointer transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl ${features[1].bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
              <Search size={24} className={features[1].color} />
            </div>
            <h3 className="font-display font-bold text-lg text-surface-900 mb-2">
              {features[1].title}
            </h3>
            <p className="text-surface-500 text-sm leading-relaxed">
              {features[1].description}
            </p>
          </motion.div>

          {/* Card 4: Etika Digital */}
          <motion.div
            variants={itemVariants}
            className="card-glass p-6 md:p-8 group cursor-pointer transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl ${features[2].bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
              <Users size={24} className={features[2].color} />
            </div>
            <h3 className="font-display font-bold text-lg text-surface-900 mb-2">
              {features[2].title}
            </h3>
            <p className="text-surface-500 text-sm leading-relaxed">
              {features[2].description}
            </p>
          </motion.div>

          {/* Card 5: CTA Mini */}
          <motion.div
            variants={itemVariants}
            className="gradient-cta rounded-2xl p-6 md:p-8 text-white relative overflow-hidden group cursor-pointer"
          >
            {/* Decorative circles */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-white/10 rounded-full" />

            <h3 className="font-display font-bold text-xl mb-2 relative z-10">
              Main Sekarang, Daftar Nanti
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-5 relative z-10">
              Kami percaya pendidikan harus mudah diakses. Langsung masuk ke
              modul tanpa perlu repot mengisi formulir pendaftaran.
            </p>
            <motion.a
              href="#explore"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 border border-white/30 text-white text-sm font-display font-semibold rounded-xl hover:bg-white/25 transition-all"
            >
              Eksplor Game
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
