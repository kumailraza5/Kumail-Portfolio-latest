import { useRef, useEffect } from "react";
import gsap from "gsap";

interface HeroImageProps {
  scrollY: React.MutableRefObject<number>;
}

export function HeroImage({ scrollY }: HeroImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, ease: "expo.out", delay: 0.15 }
    );
  }, []);

  useEffect(() => {
    let raf: number;
    const update = () => {
      if (wrapRef.current) {
        const offset = scrollY.current * 0.1;
        wrapRef.current.style.transform = `translateY(-${offset}px)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [scrollY]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{
        filter:
          "drop-shadow(-15px 0 50px rgba(124,58,237,0.4)) drop-shadow(0 -5px 30px rgba(99,102,241,0.25))",
      }}
    >
      {/* Glow beneath feet */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "240px",
          height: "80px",
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.4) 0%, transparent 70%)",
          filter: "blur(18px)",
          zIndex: -1,
        }}
      />

      <img
        src="/kumail.png"
        alt="Kumail Raza"
        className="block object-contain object-bottom"
        style={{
          height: "clamp(420px, 82vh, 680px)",
          width: "auto",
          maxWidth: "380px",
        }}
        draggable={false}
      />
    </div>
  );
}
