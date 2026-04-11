import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroOverlayProps {
  isMobile?: boolean;
  inline?: boolean; // when true: renders as block (no absolute), used inside flex column
}

const TECH = ["React", "TypeScript", "Node.js", "Supabase", "Firestore"];

export function HeroOverlay({ isMobile = false, inline = false }: HeroOverlayProps) {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Masked reveal for name and title
      gsap.fromTo(
        ".mask-inner",
        { y: "100%" },
        { y: "0%", duration: 1.2, ease: "expo.out", stagger: 0.1, delay: 0.2 }
      );

      // Staggered entry for other elements
      gsap.fromTo(
        [badgeRef.current, tagsRef.current, ctaRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.5 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleMagnetic = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const resetMagnetic = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  /* ── Mobile inline (inside flex column) ── */
  if (isMobile && inline) {
    return (
      <div className="flex flex-col items-center text-center w-full">
        <span
          ref={badgeRef}
          className="inline-block text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-2.5 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm"
        >
          Available for work
        </span>

        <h1
          ref={nameRef}
          className="text-[2.6rem] font-black tracking-tight text-white leading-tight mb-2"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.9)" }}
        >
          <div className="overflow-hidden">
            <div className="mask-inner">Kumail</div>
          </div>
          <div className="overflow-hidden">
            <div className="mask-inner bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Raza
            </div>
          </div>
        </h1>

        <div className="overflow-hidden mb-3">
          <p
            ref={titleRef}
            className="mask-inner text-[11px] font-semibold tracking-[0.22em] uppercase text-violet-300"
          >
            Full Stack Developer
          </p>
        </div>

        <div ref={tagsRef} className="flex flex-wrap gap-1.5 justify-center mb-4">
          {TECH.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-gray-300 text-[10px] font-mono backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>

        <div ref={ctaRef} className="flex gap-3">
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

  /* ── Mobile absolute (legacy fallback) ── */
  if (isMobile) {
    return (
      <div className="absolute inset-x-0 bottom-0 z-10 pb-12 px-6 flex flex-col items-center text-center pointer-events-none">
        <span ref={badgeRef} className="inline-block text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-3 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm pointer-events-auto">
          Available for work
        </span>
        <h1 ref={nameRef} className="text-4xl font-black tracking-tight text-white leading-none mb-2" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
          Kumail <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Raza</span>
        </h1>
        <p ref={titleRef} className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-300 mb-3">Full Stack Developer</p>
        <div ref={tagsRef} className="flex flex-wrap gap-1.5 justify-center mb-5">
          {TECH.map((t) => (<span key={t} className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-gray-300 text-[10px] font-mono backdrop-blur-sm">{t}</span>))}
        </div>
        <div ref={ctaRef} className="flex gap-3 pointer-events-auto">
          <button onClick={() => scrollTo("projects")} className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/40 active:scale-95">View Work</button>
          <button onClick={() => scrollTo("contact")} className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95">Contact Me</button>
        </div>
      </div>
    );
  }

  /* ── Desktop inline (centered under portrait) ── */
  if (!isMobile && inline) {
    return (
      <div className="flex flex-col items-center text-center">
        <span
          ref={badgeRef}
          className="inline-block text-xs font-bold uppercase tracking-widest text-violet-400 mb-4 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm"
        >
          Available for work
        </span>
        <h1
          ref={nameRef}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3 leading-[0.9]"
          style={{ textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}
        >
          <div className="overflow-hidden">
            <div className="mask-inner">Kumail</div>
          </div>
          <div className="overflow-hidden">
            <div className="mask-inner bg-gradient-to-r from-violet-500 to-fuchsia-400 bg-clip-text text-transparent pb-2">
              Raza
            </div>
          </div>
        </h1>
        <div className="overflow-hidden mb-5">
          <p ref={titleRef} className="mask-inner text-xs font-bold tracking-[0.2em] uppercase text-violet-400/90">
            Full Stack Developer
          </p>
        </div>
        <div ref={tagsRef} className="flex flex-wrap gap-2 justify-center mb-6">
          {TECH.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 text-xs font-mono">
              {t}
            </span>
          ))}
        </div>
        <div ref={ctaRef} className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={() => scrollTo("projects")}
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-full transition-shadow duration-300 hover:shadow-lg hover:shadow-violet-500/40"
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-full border border-white/20 backdrop-blur-sm transition-shadow duration-300"
          >
            Get in Touch
          </button>
        </div>
      </div>
    );
  }

  /* ── Desktop absolute (legacy) ── */
  return (
    <div className="absolute inset-0 flex items-end pb-[12vh] px-8 md:px-16 lg:px-24 z-10 pointer-events-none">
      <div className="pointer-events-auto max-w-xl">
        <span ref={badgeRef} className="inline-block text-xs font-bold uppercase tracking-widest text-violet-400 mb-4 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm">
          Available for work
        </span>
        <h1 ref={nameRef} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-4 leading-[0.9]" style={{ textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}>
          <div className="overflow-hidden">
            <div className="mask-inner">Kumail</div>
          </div>
          <div className="overflow-hidden">
            <div className="mask-inner bg-gradient-to-r from-violet-500 to-fuchsia-400 bg-clip-text text-transparent pb-2">
              Raza
            </div>
          </div>
        </h1>
        <div className="overflow-hidden mb-6">
          <p ref={titleRef} className="mask-inner text-sm md:text-base font-bold tracking-[0.3em] uppercase text-violet-400/90">
            Full Stack Developer
          </p>
        </div>
        <div ref={tagsRef} className="flex flex-wrap gap-2 mb-8">
          {TECH.map((t) => (<span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 text-xs font-mono">{t}</span>))}
        </div>
        <div ref={ctaRef} className="flex gap-3 flex-wrap">
          <button
            onClick={() => scrollTo("projects")}
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-full transition-shadow duration-300 hover:shadow-lg hover:shadow-violet-500/40"
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-full border border-white/20 backdrop-blur-sm transition-shadow duration-300"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}
