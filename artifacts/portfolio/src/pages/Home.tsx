import { useRef, useEffect } from "react";
import { HeroScene } from "../components/HeroScene";
import { HeroOverlay } from "../components/HeroOverlay";
import { Navbar } from "../components/Navbar";
import { AboutSection } from "../components/AboutSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { useTheme } from "../hooks/useTheme";

export function Home() {
  const { theme, toggleTheme } = useTheme();
  const mouse = useRef<[number, number]>([0, 0]);
  const scrollY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-500">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Dark gradient backdrop for cinematic feel */}
        <div
          className={`absolute inset-0 z-0 transition-colors duration-700 ${
            theme === "dark"
              ? "bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
              : "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
          }`}
        />

        {/* Subtle glow effect */}
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-700 ${
            theme === "dark" ? "opacity-100" : "opacity-60"
          }`}
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)",
          }}
        />

        {/* R3F Canvas */}
        <div className="absolute inset-0 z-[1]">
          <HeroScene mouse={mouse} scrollY={scrollY} isDark={theme === "dark"} />
        </div>

        {/* Bottom gradient overlay for text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-72 z-[2] bg-gradient-to-t from-gray-950/90 via-gray-950/50 to-transparent pointer-events-none" />

        {/* Overlay UI */}
        <div className="absolute inset-0 z-[3]">
          <HeroOverlay />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 animate-bounce pointer-events-none">
          <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
