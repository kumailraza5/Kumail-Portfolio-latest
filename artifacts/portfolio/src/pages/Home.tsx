import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroScene } from "../components/HeroScene";
import { HeroOverlay } from "../components/HeroOverlay";
import { Navbar } from "../components/Navbar";
import { AboutSection } from "../components/AboutSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { useTheme } from "../hooks/useTheme";
import { HeroImage } from "../components/HeroImage";

gsap.registerPlugin(ScrollTrigger);

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
    const handleScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // GSAP Scroll Parallax
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(".hero-bg", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 3D Scene and Content parallax
      gsap.to(".hero-content", {
        y: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-500">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* ═══ HERO ═══ */}
      <section className="hero-section relative w-full h-screen overflow-hidden">

        {/* Dark space backdrop */}
        <div
          className="hero-bg absolute inset-0 z-0"
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

        {/* Code rain + particles canvas */}
        <div className="hero-content absolute inset-0 z-[1]">
          <HeroScene mouse={mouse} scrollY={scrollY} isDark={theme === "dark"} isMobile={isMobile} />
        </div>

        {/* ════════════════════════════════════════
            MOBILE — single centered flex column
            Image sits directly above text, ~12px gap
        ════════════════════════════════════════ */}
        {isMobile && (
          <div className="hero-content absolute inset-0 z-[4] flex flex-col items-center justify-center pt-4 px-5">
            {/* Image block */}
            <div className="flex-shrink-0 select-none">
              <HeroImage scrollY={scrollY} mobile />
            </div>

            {/* 12px gap between image and text */}
            <div style={{ height: 12 }} />

            {/* Text block — inline, no absolute positioning */}
            <HeroOverlay isMobile inline />
          </div>
        )}

        {/* ════════════════════════════════════════
            DESKTOP — centered: portrait above text,
        {/* ════════════════════════════════════════
            DESKTOP — image right, text left
            badges orbit in the center
        ════════════════════════════════════════ */}
        {!isMobile && (
          <>
            {/* Image on Right */}
            <div
              className="absolute bottom-0 z-[2] flex items-end pointer-events-none select-none"
              style={{ right: "8%" }}
            >
              <HeroImage scrollY={scrollY} mobile={false} />
            </div>

            {/* Bottom gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none"
              style={{
                height: "35%",
                background:
                  "linear-gradient(to top, rgba(5,8,22,0.88) 0%, rgba(5,8,22,0.4) 40%, transparent 100%)",
              }}
            />

            {/* Right fade */}
            <div
              className="absolute top-0 bottom-0 right-0 z-[3] pointer-events-none"
              style={{
                width: "25%",
                background: "linear-gradient(to left, rgba(5,8,22,0.25) 0%, transparent 100%)",
              }}
            />

            {/* Left aligned text overlay */}
            <div className="hero-content absolute inset-0 z-[4] pointer-events-none">
              <div className="pointer-events-auto w-full h-full">
                <HeroOverlay isMobile={false} />
              </div>
            </div>
            {/* Scroll indicator */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-1.5 animate-bounce pointer-events-none">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">scroll</span>
              <div className="w-px h-6 bg-gradient-to-b from-violet-400/50 to-transparent" />
            </div>
          </>
        )}

        {/* Mobile — very subtle bottom vignette only */}
        {isMobile && (
          <div
            className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none"
            style={{
              height: "18%",
              background:
                "linear-gradient(to top, rgba(5,8,22,0.6) 0%, transparent 100%)",
            }}
          />
        )}
      </section>

      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
