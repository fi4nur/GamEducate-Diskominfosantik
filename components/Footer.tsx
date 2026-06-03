"use client";

import { motion } from "framer-motion";

const footerLinks = [
  { label: "Curriculum Guide", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Teacher Dashboard", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Accessibility", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Branding */}
          <div className="text-center md:text-left">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display text-lg font-extrabold text-surface-900"
            >
              Gameducate
            </motion.span>
            <p className="text-surface-400 text-xs mt-1">
              © 2024 Gameducate. Learning Through Play.
            </p>
          </div>

          {/* Right: Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-surface-500 hover:text-brand-700 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
