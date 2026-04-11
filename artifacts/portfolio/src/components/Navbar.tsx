import { useEffect, useState } from "react";
import { Sun, Moon, User, Code2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const links = [
  { name: "About", id: "about", icon: User },
  { name: "Projects", id: "projects", icon: Code2 },
  { name: "Contact", id: "contact", icon: Send },
];

const menuVars = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.12, 0, 0.39, 0],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVars = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-white/80 dark:bg-gray-950/85 shadow-lg shadow-black/10 dark:shadow-black/30 border-b border-gray-200/50 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span
          className="font-bold text-xl tracking-tight bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          KR
        </span>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          {/* Custom Animated Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 relative z-50 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center items-center relative">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute w-full h-[2px] bg-current rounded-full"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute w-full h-[2px] bg-current rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute w-full h-[2px] bg-current rounded-full"
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="md:hidden overflow-hidden backdrop-blur-3xl bg-white/95 dark:bg-[#070b19]/95 border-b border-gray-200/50 dark:border-white/10 shadow-2xl"
          >
            <div className="px-6 pb-8 pt-4 flex flex-col gap-3">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.button
                    variants={itemVars}
                    key={link.name}
                    onClick={() => scrollTo(link.id)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05] hover:bg-violet-50 hover:dark:bg-violet-500/10 hover:border-violet-200 hover:dark:border-violet-500/30 text-gray-700 dark:text-gray-300 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-violet-600 dark:group-hover:text-violet-400 group-hover:scale-110 transition-all">
                      <Icon size={16} />
                    </div>
                    <span className="text-base font-bold tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {link.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
