import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroOverlayProps {
  isMobile?: boolean;
}

const TECH = ["React", "TypeScript", "Node.js", "Supabase", "Firestore"];

export function HeroOverlay({ isMobile = false }: HeroOverlayProps) {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [
      badgeRef.current,
      nameRef.current,
      titleRef.current,
      tagsRef.current,
      ctaRef.current,
    ];
    gsap.fromTo(
      els,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.07, delay: 0.05 }
    );
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  if (isMobile) {
    return (
      <div className="absolute inset-x-0 bottom-0 z-10 pb-12 px-6 flex flex-col items-center text-center pointer-events-none">
        <span
          ref={badgeRef}
          className="inline-block text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-3 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm pointer-events-auto"
        >
          Available for work
        </span>

        <h1
          ref={nameRef}
          className="text-4xl font-black tracking-tight text-white leading-none mb-2"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
        >
          Kumail{" "}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Raza
          </span>
        </h1>

        <p
          ref={titleRef}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-300 mb-3"
        >
          Full Stack Developer
        </p>

        <div ref={tagsRef} className="flex flex-wrap gap-1.5 justify-center mb-5">
          {TECH.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-gray-300 text-[10px] font-mono backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>

        <div ref={ctaRef} className="flex gap-3 pointer-events-auto">
          <button
            onClick={() => scrollTo("projects")}
            className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/40 active:scale-95"
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Contact Me
          </button>
        </div>
      </div>
    );
  }

  /* ── Desktop ── */
  return (
    <div className="absolute inset-0 flex items-end pb-20 px-8 md:px-16 lg:px-24 z-10 pointer-events-none">
      <div className="pointer-events-auto max-w-xl">
        <span
          ref={badgeRef}
          className="inline-block text-xs font-bold uppercase tracking-widest text-violet-400 mb-4 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm"
        >
          Available for work
        </span>

        <h1
          ref={nameRef}
          className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-3 leading-none"
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}
        >
          Kumail
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Raza
          </span>
        </h1>

        <p
          ref={titleRef}
          className="text-base md:text-lg font-semibold tracking-widest uppercase text-violet-300 mb-3"
        >
          Full Stack Developer
        </p>

        <div ref={tagsRef} className="flex flex-wrap gap-2 mb-8">
          {TECH.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 text-xs font-mono"
            >
              {t}
            </span>
          ))}
        </div>

        <div ref={ctaRef} className="flex gap-3 flex-wrap">
          <button
            onClick={() => scrollTo("projects")}
            className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/40"
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}
