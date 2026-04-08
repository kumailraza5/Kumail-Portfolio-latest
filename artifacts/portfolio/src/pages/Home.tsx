import { useRef, useEffect, useState } from "react";
import { HeroScene } from "../components/HeroScene";
import { HeroOverlay } from "../components/HeroOverlay";
import { Navbar } from "../components/Navbar";
import { AboutSection } from "../components/AboutSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { useTheme } from "../hooks/useTheme";
import { HeroImage } from "../components/HeroImage";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

export function Home() {
  const { theme, toggleTheme } = useTheme();
  const mouse = useRef<[number, number]>([0, 0]);
  const scrollY = useRef(0);
  const isMobile = useIsMobile();

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

      {/* ═══ HERO ═══ */}
      <section className="relative w-full h-screen overflow-hidden">

        {/* Dark space backdrop */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 65% 55%, rgba(79,46,229,0.18) 0%, transparent 60%), linear-gradient(to bottom, #050816 0%, #0a0f2e 50%, #060c24 100%)",
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

        {/* 3D Canvas background — code rain + particles */}
        <div className="absolute inset-0 z-[1]">
          <HeroScene mouse={mouse} scrollY={scrollY} isDark={theme === "dark"} />
        </div>

        {/* ── MOBILE layout: image anchored center, above text area ── */}
        {isMobile && (
          <div className="absolute top-14 bottom-[38%] left-0 right-0 z-[2] flex items-end justify-center pointer-events-none select-none">
            <HeroImage scrollY={scrollY} mobile />
          </div>
        )}

        {/* ── DESKTOP layout: image right side ── */}
        {!isMobile && (
          <div
            className="absolute bottom-0 z-[2] flex items-end pointer-events-none select-none"
            style={{ right: "6%" }}
          >
            <HeroImage scrollY={scrollY} mobile={false} />
          </div>
        )}

        {/* Bottom gradient for readability */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none"
          style={{
            height: isMobile ? "52%" : "45%",
            background: isMobile
              ? "linear-gradient(to top, rgba(5,8,22,0.97) 0%, rgba(5,8,22,0.85) 30%, rgba(5,8,22,0.5) 60%, transparent 100%)"
              : "linear-gradient(to top, rgba(5,8,22,0.88) 0%, rgba(5,8,22,0.5) 40%, transparent 100%)",
          }}
        />

        {/* Right fade — desktop only */}
        {!isMobile && (
          <div
            className="absolute top-0 bottom-0 right-0 z-[3] pointer-events-none"
            style={{
              width: "22%",
              background: "linear-gradient(to left, rgba(5,8,22,0.35) 0%, transparent 100%)",
            }}
          />
        )}

        {/* Text overlay */}
        <div className="absolute inset-0 z-[4]">
          <HeroOverlay isMobile={isMobile} />
        </div>

        {/* Scroll indicator — desktop only */}
        {!isMobile && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-1.5 animate-bounce pointer-events-none">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">scroll</span>
            <div className="w-px h-6 bg-gradient-to-b from-violet-400/50 to-transparent" />
          </div>
        )}
      </section>

      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
