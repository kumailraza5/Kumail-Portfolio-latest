import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroOverlay() {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }
    )
      .fromTo(
        nameRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" },
        "-=0.2"
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" },
        "-=0.5"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        "-=0.3"
      );
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

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
          Kumail<br />
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

        <p
          ref={subtitleRef}
          className="text-sm text-gray-400 mb-8 flex flex-wrap gap-2"
        >
          {["React", "TypeScript", "Node.js", "Supabase", "Firestore"].map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 text-xs font-mono">
              {t}
            </span>
          ))}
        </p>

        <div ref={ctaRef} className="flex gap-3 flex-wrap">
          <button
            onClick={scrollToProjects}
            className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/40"
          >
            View Work
          </button>
          <button
            onClick={scrollToContact}
            className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}
