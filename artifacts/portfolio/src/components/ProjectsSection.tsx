import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "DevBoard",
    description:
      "Full-stack project management dashboard with real-time updates, team collaboration, and Supabase-powered backend with Row Level Security.",
    tags: ["React", "TypeScript", "Supabase", "Tailwind"],
    gradient: "from-violet-600 to-indigo-600",
    glow: "group-hover:shadow-violet-500/30",
    icon: "🖥️",
  },
  {
    title: "ChatSync",
    description:
      "Real-time messaging app with Firestore as the backend, presence indicators, read receipts, and encrypted rooms.",
    tags: ["React", "Firestore", "Node.js", "TypeScript"],
    gradient: "from-indigo-600 to-blue-600",
    glow: "group-hover:shadow-blue-500/30",
    icon: "💬",
  },
  {
    title: "AuthKit",
    description:
      "Production-ready auth boilerplate — JWT, refresh tokens, email verification, OAuth and rate limiting with Node.js + TypeScript.",
    tags: ["Node.js", "TypeScript", "Supabase", "JWT"],
    gradient: "from-purple-600 to-pink-600",
    glow: "group-hover:shadow-purple-500/30",
    icon: "🔐",
  },
  {
    title: "StoreFront",
    description:
      "E-commerce platform with a React storefront, Node.js API, Supabase database, and Stripe payments. Full admin dashboard included.",
    tags: ["React", "Node.js", "Supabase", "Stripe"],
    gradient: "from-teal-500 to-cyan-600",
    glow: "group-hover:shadow-teal-500/30",
    icon: "🛍️",
  },
  {
    title: "DataFlow",
    description:
      "Analytics dashboard that ingests streaming data, aggregates via Node.js workers, and visualizes insights in interactive React charts.",
    tags: ["React TS", "Node.js", "Firestore", "Recharts"],
    gradient: "from-orange-500 to-rose-600",
    glow: "group-hover:shadow-orange-500/30",
    icon: "📊",
  },
  {
    title: "NoteNest",
    description:
      "Collaborative note-taking with rich text editing, live presence cursors, folder organization, and Supabase Realtime sync.",
    tags: ["React", "TypeScript", "Supabase", "TipTap"],
    gradient: "from-emerald-500 to-green-600",
    glow: "group-hover:shadow-emerald-500/30",
    icon: "📝",
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        }
      );
      gsap.fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "expo.out", stagger: 0.08,
          scrollTrigger: { trigger: cardsRef.current, start: "top 78%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-28 px-5 md:px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-10 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-3 block">
            My Work
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
            Featured{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-sm md:max-w-md mx-auto">
            Full-stack apps built with React, TypeScript, Node.js, Supabase, and Firestore.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className={`group relative bg-white dark:bg-gray-800/60 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700/50 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl ${project.glow} cursor-pointer`}
            >
              <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />
              <div className="p-5 md:p-6">
                <div className="text-2xl md:text-3xl mb-2.5">{project.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1.5">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] md:text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pt-3.5 border-t border-gray-100 dark:border-gray-700">
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    <Github size={13} /> Code
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    <ExternalLink size={13} /> Demo
                  </button>
                </div>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
