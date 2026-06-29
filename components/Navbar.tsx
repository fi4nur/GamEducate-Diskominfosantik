"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, User, LogIn, LogOut, ChevronDown, Command } from "lucide-react";
import { auth } from "@/utils/firebase/client";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { handleLogout } from "@/utils/userDataSync";
import { moduleQuizzes } from "@/data/moduleQuizData";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const onLogout = async () => {
    setLoggingOut(true);
    try {
      await handleLogout();
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
      setLoggingOut(false);
    }
  };

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
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-surface-50 border border-surface-200 rounded-lg text-surface-400 text-sm hover:border-brand-300 transition-colors"
            >
              <Search size={14} />
              <span className="hidden lg:inline text-xs">Cari Modul...</span>
              <span className="hidden lg:flex items-center gap-0.5 ml-2 px-1.5 py-0.5 bg-surface-100 rounded text-[10px] font-bold">
                <Command size={10} /> K
              </span>
            </button>

            {/* Resources button */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-brand-800 hover:bg-brand-700 text-white text-sm font-semibold font-display rounded-lg transition-colors duration-200 shadow-md"
            >
              Resources
            </motion.a>

            {/* Profile / Login */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-900 hover:bg-surface-800 transition-colors duration-200 group"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white shadow-sm overflow-hidden">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={14} />
                    )}
                  </div>
                  <span className="text-xs font-display font-semibold text-white pr-1 hidden lg:inline">
                    {user.displayName || user.email?.split('@')[0] || "Profil Saya"}
                  </span>
                  <ChevronDown
                    size={12}
                    className={`text-white/70 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-surface-200 shadow-xl overflow-hidden z-50"
                    >
                      {/* User info header */}
                      <div className="px-4 py-3 border-b border-surface-100 bg-surface-50">
                        <p className="text-sm font-display font-bold text-surface-900 truncate">
                          {user.displayName || "Pengguna"}
                        </p>
                        <p className="text-[10px] text-surface-400 truncate">
                          {user.email}
                        </p>
                      </div>

                      {/* Menu items */}
                      <div className="py-1">
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50 transition-colors"
                        >
                          <User size={16} className="text-surface-400" />
                          Profil Saya
                        </Link>
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            onLogout();
                          }}
                          disabled={loggingOut}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          <LogOut size={16} />
                          {loggingOut ? "Keluar..." : "Keluar"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-800 hover:bg-brand-700 text-white transition-colors duration-200 group"
              >
                <LogIn size={16} />
                <span className="text-sm font-display font-semibold hidden lg:inline">
                  Masuk
                </span>
              </Link>
            )}
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
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-50 transition-all"
                      onClick={() => setMobileOpen(false)}
                    >
                      <User size={16} />
                      Profil Saya
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        onLogout();
                      }}
                      disabled={loggingOut}
                      className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
                    >
                      <LogOut size={16} />
                      {loggingOut ? "Keluar..." : "Keluar"}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-brand-800 hover:bg-brand-50 transition-all"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LogIn size={16} />
                    Masuk / Daftar
                  </Link>
                )}
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

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-surface-900/60 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-surface-200 overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center px-4 border-b border-surface-100 shrink-0">
                <Search size={20} className="text-brand-500" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Cari modul (contoh: Password, Hoax...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none py-4 px-4 text-base focus:outline-none font-medium placeholder:text-surface-400"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-md hover:bg-surface-100 text-surface-400 transition"
                >
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded border border-surface-200">ESC</span>
                </button>
              </div>

              <div className="overflow-y-auto p-4 custom-scrollbar">
                {Object.values(moduleQuizzes)
                  .filter(
                    (m) =>
                      m.moduleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      m.moduleDescription?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((mod) => (
                    <Link
                      href={`/learning-path/quiz/${mod.moduleSlug}`}
                      key={mod.moduleId}
                      onClick={() => {
                        sessionStorage.setItem("fromLearningPath", "true");
                        setSearchOpen(false);
                      }}
                      className="flex items-center gap-4 p-4 hover:bg-surface-50 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-surface-200 mb-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                        <Search size={16} className="text-brand-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-surface-900 group-hover:text-brand-700 truncate transition-colors">
                          {mod.moduleTitle}
                        </h4>
                        <p className="text-xs text-surface-500 line-clamp-1">
                          {mod.moduleDescription}
                        </p>
                      </div>
                    </Link>
                  ))}
                
                {searchQuery && Object.values(moduleQuizzes).filter((m) =>
                  m.moduleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  m.moduleDescription?.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 && (
                  <div className="py-12 text-center text-surface-400">
                    <Search size={32} className="mx-auto mb-3 text-surface-300" />
                    <p className="font-medium">Tidak ada modul yang ditemukan.</p>
                    <p className="text-xs mt-1">Coba kata kunci lain.</p>
                  </div>
                )}

                {!searchQuery && (
                  <div className="py-8 text-center text-surface-400">
                    <p className="font-medium text-sm">Ketik untuk mulai mencari...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
