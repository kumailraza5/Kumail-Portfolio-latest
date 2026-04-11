import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useDeviceTilt } from "../hooks/useDeviceTilt";

interface HeroImageProps {
  scrollY: React.MutableRefObject<number>;
  mobile?: boolean;
}

export function HeroImage({ scrollY, mobile = false }: HeroImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const tilt = useDeviceTilt();

  /* Animate in */
  useEffect(() => {
    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, y: mobile ? 50 : 30, scale: 0.95, filter: "blur(10px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "expo.out", delay: 0.2 }
    );
  }, [mobile]);

  /* Scroll parallax (desktop only) */
  useEffect(() => {
    if (mobile) return;
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
  }, [scrollY, mobile]);

  /* 3D tilt effect — applied via JS for smooth spring */
  useEffect(() => {
    if (!innerRef.current) return;
    const maxRot = mobile ? 14 : 10;
    gsap.to(innerRef.current, {
      rotateY: tilt.x * maxRot,
      rotateX: -tilt.y * maxRot,
      duration: 0.8,
      ease: "power2.out",
      overwrite: true,
    });
  }, [tilt, mobile]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ perspective: "900px" }}
    >
      {/* Inner wrapper gets the 3D rotation */}
      <div
        ref={innerRef}
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Glow beneath feet */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: mobile ? "160px" : "240px",
            height: mobile ? "45px" : "80px",
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.45) 0%, transparent 70%)",
            filter: "blur(18px)",
            zIndex: -1,
            transform: "translateZ(-20px)",
          }}
        />

        {/* Left edge glow */}
        <div
          className="absolute left-0 top-1/4 pointer-events-none"
          style={{
            width: "60px",
            height: "60%",
            background:
              "linear-gradient(to right, rgba(124,58,237,0.25), transparent)",
            filter: "blur(12px)",
            zIndex: -1,
          }}
        />

        <img
          src="/kumail.png"
          alt="Kumail Raza"
          className="relative block object-contain object-bottom transition-all duration-700"
          style={{
            height: mobile ? "clamp(320px, 54vh, 450px)" : "clamp(500px, 95vh, 850px)",
            width: "auto",
            maxWidth: mobile ? "300px" : "480px",
            filter:
              "drop-shadow(-12px 0 40px rgba(124,58,237,0.38)) drop-shadow(0 -5px 25px rgba(99,102,241,0.22))",
          }}
          draggable={false}
        />

      </div>
    </div>
  );
}
