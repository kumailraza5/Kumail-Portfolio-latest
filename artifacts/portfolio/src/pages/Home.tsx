import { useRef, useEffect } from "react";
import { HeroScene } from "../components/HeroScene";
import { HeroOverlay } from "../components/HeroOverlay";
import { Navbar } from "../components/Navbar";
import { AboutSection } from "../components/AboutSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { useTheme } from "../hooks/useTheme";
import { HeroImage } from "../components/HeroImage";

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
        {/* Dark backdrop */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              theme === "dark"
                ? "radial-gradient(ellipse 80% 80% at 70% 60%, rgba(79,46,229,0.18) 0%, transparent 60%), linear-gradient(to bottom, #050816 0%, #0a0f2e 50%, #060c24 100%)"
                : "radial-gradient(ellipse 80% 80% at 70% 60%, rgba(99,102,241,0.14) 0%, transparent 60%), linear-gradient(to bottom, #0a0f2e 0%, #111827 50%, #060c24 100%)",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* 3D Canvas — background only (code rain + particles) */}
        <div className="absolute inset-0 z-[1]">
          <HeroScene mouse={mouse} scrollY={scrollY} isDark={theme === "dark"} />
          {/* Note: mouse/scrollY props are forwarded but scene no longer needs them directly */}
        </div>

        {/* Photo — right side, anchored to bottom */}
        <div
          className="absolute bottom-0 z-[2] flex items-end pointer-events-none select-none"
          style={{ right: "6%", maxHeight: "88vh" }}
        >
          <HeroImage scrollY={scrollY} />
        </div>

        {/* Gradient fades at the bottom and right-to-left to blend image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 z-[3] pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(5,8,22,0.85) 0%, rgba(5,8,22,0.4) 40%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 w-1/4 z-[3] pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgba(5,8,22,0.3) 0%, transparent 100%)",
          }}
        />

        {/* Text overlay — left side */}
        <div className="absolute inset-0 z-[4]">
          <HeroOverlay />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-2 animate-bounce pointer-events-none">
          <span className="text-xs text-white/40 uppercase tracking-widest font-mono">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-violet-400/50 to-transparent" />
        </div>
      </section>

      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
