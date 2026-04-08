import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { label: "Flutter", level: 95 },
  { label: "Dart", level: 90 },
  { label: "Firebase", level: 85 },
  { label: "REST APIs", level: 88 },
  { label: "UI/UX Design", level: 78 },
  { label: "Git & CI/CD", level: 80 },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1, ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        skillsRef.current?.children ? Array.from(skillsRef.current.children) : [],
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "expo.out", stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      const bars = skillsRef.current?.querySelectorAll(".skill-bar-fill");
      bars?.forEach((bar) => {
        const target = bar.getAttribute("data-width") || "0%";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: target, duration: 1.2, ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 px-6 bg-white dark:bg-gray-950 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div ref={textRef}>
          <span className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-3 block">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            Building the{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              future
            </span>
            , one app at a time.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-5">
            I'm Kumail Raza, a passionate Flutter developer dedicated to creating elegant,
            high-performance mobile applications. I combine clean code with beautiful
            design to deliver exceptional user experiences.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            With deep expertise in Dart and the Flutter ecosystem, I build apps that feel
            native, look stunning, and perform flawlessly — on both iOS and Android.
          </p>

          <div className="mt-8 flex gap-4">
            <div className="text-center">
              <span className="block text-3xl font-black text-violet-600 dark:text-violet-400">3+</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Years Exp.</span>
            </div>
            <div className="w-px bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <span className="block text-3xl font-black text-violet-600 dark:text-violet-400">15+</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Projects</span>
            </div>
            <div className="w-px bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <span className="block text-3xl font-black text-violet-600 dark:text-violet-400">100%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dedication</span>
            </div>
          </div>
        </div>

        <div ref={skillsRef} className="flex flex-col gap-4">
          {skills.map((skill) => (
            <div key={skill.label} className="group">
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {skill.label}
                </span>
                <span className="text-sm text-violet-500 font-bold">{skill.level}%</span>
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
