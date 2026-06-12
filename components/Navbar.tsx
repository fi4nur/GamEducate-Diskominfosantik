"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, User } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Learning Path", href: "/learning-path" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Quiz", href: "/quiz" },
];

interface NavbarProps {
  /** Optional override – pass "learning-path" | "leaderboard" | "home" to force-highlight a link */
  activePage?: string;
}

export default function Navbar({ activePage }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (activePage) {
      // map activePage slug to href
      const slugMap: Record<string, string> = {
        home: "/",
        "learning-path": "/learning-path",
        leaderboard: "/leaderboard",
        profile: "/profile",
      };
      return slugMap[activePage] === href;
    }
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-surface-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-display text-xl font-extrabold text-brand-800 tracking-tight group-hover:text-brand-600 transition-colors">
              Gameducate
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-surface-900 font-semibold"
                    : "text-surface-500 hover:text-surface-800 hover:bg-surface-50"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-700 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-50 border border-surface-200 rounded-lg text-surface-400 text-sm hover:border-brand-300 transition-colors cursor-pointer">
              <Search size={14} />
              <span className="hidden lg:inline text-xs">Cari Modul ...</span>
            </div>

            {/* Resources button */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-brand-800 hover:bg-brand-700 text-white text-sm font-semibold font-display rounded-lg transition-colors duration-200 shadow-md"
            >
              Resources
            </motion.a>

            {/* Profile Link */}
            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 hover:bg-surface-800 transition-colors duration-200 group"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white shadow-sm">
                <User size={14} />
              </div>
              <span className="text-xs font-display font-semibold text-white pr-1 hidden lg:inline">
                Guest Profile
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-50 transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={22} className="text-surface-700" />
            ) : (
              <Menu size={22} className="text-surface-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-surface-100"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-brand-50 text-brand-800 font-semibold"
                      : "text-surface-600 hover:bg-surface-50"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-surface-100 space-y-1">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-50 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={16} />
                  Profil Saya
                </Link>
                <a
                  href="#"
                  className="block px-4 py-2.5 text-sm text-white bg-brand-800 rounded-xl font-semibold hover:bg-brand-700 transition-colors"
                >
                  Resources
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
