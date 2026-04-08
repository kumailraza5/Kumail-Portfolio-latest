import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { label: "React / React Native", level: 93 },
  { label: "TypeScript", level: 90 },
  { label: "Node.js", level: 88 },
  { label: "Supabase", level: 85 },
  { label: "Firestore / Firebase", level: 87 },
  { label: "REST APIs & GraphQL", level: 82 },
];

const stats = [
  { value: "3+", label: "Years Exp." },
  { value: "20+", label: "Projects" },
  { value: "100%", label: "Dedication" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(
        skillsRef.current?.children ? Array.from(skillsRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        }
      );
      const bars = skillsRef.current?.querySelectorAll(".skill-bar-fill");
      bars?.forEach((bar) => {
        const target = bar.getAttribute("data-width") || "0%";
        gsap.fromTo(bar, { width: "0%" }, {
          width: target, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 px-5 md:px-6 bg-white dark:bg-gray-950 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div ref={textRef}>
          <span className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-3 block">
            About Me
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
            Building the{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              future
            </span>
            , one app at a time.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-4">
            I'm Kumail Raza, a full-stack developer specializing in React, TypeScript, and
            Node.js. I build fast, scalable web apps backed by Supabase and Firestore.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            From pixel-perfect UIs to robust backend APIs, I craft end-to-end experiences
            that feel both powerful and effortless to use.
          </p>

          <div className="mt-8 flex gap-5 md:gap-6">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-4 md:gap-6">
                {i > 0 && <div className="w-px h-10 bg-gray-200 dark:bg-gray-700" />}
                <div className="text-center">
                  <span className="block text-2xl md:text-3xl font-black text-violet-600 dark:text-violet-400">
                    {s.value}
                  </span>
                  <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={skillsRef} className="flex flex-col gap-4 mt-2 md:mt-0">
          {skills.map((skill) => (
            <div key={skill.label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {skill.label}
                </span>
                <span className="text-xs md:text-sm text-violet-500 font-bold">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500"
                  data-width={`${skill.level}%`}
                  style={{ width: 0 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
