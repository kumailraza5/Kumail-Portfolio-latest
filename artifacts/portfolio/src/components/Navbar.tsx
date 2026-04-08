import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const links = ["About", "Projects", "Contact"];

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
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
            >
              {link}
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

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 backdrop-blur-xl bg-white/90 dark:bg-gray-950/90 border-b border-gray-200/50 dark:border-white/10">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
