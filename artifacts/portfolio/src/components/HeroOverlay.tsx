import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroOverlay() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 40, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out" }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" },
        "-=0.6"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" },
        "-=0.4"
      );
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none z-10 pb-24 px-6">
      <div className="text-center pointer-events-auto">
        <h1
          ref={nameRef}
          className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl mb-3"
          style={{ textShadow: "0 0 40px rgba(139,92,246,0.5), 0 2px 10px rgba(0,0,0,0.8)" }}
        >
          Kumail Raza
        </h1>
        <p
          ref={titleRef}
          className="text-lg md:text-2xl font-semibold tracking-widest uppercase text-violet-300 drop-shadow-lg mb-2"
          style={{ textShadow: "0 0 20px rgba(167,139,250,0.8)" }}
        >
          Full Stack Developer
        </p>
        <p
          ref={subtitleRef}
          className="text-sm md:text-base text-gray-300/80 mb-8 max-w-xs mx-auto"
        >
          React · TypeScript · Node.js · Supabase
        </p>
        <div ref={ctaRef} className="flex gap-4 justify-center">
          <button
            onClick={scrollToProjects}
            className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/40"
          >
            View Work
          </button>
          <button
            onClick={scrollToContact}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}
