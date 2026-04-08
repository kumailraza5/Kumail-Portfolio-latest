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
      "Real-time messaging app with Firestore as the backend, presence indicators, read receipts, and end-to-end encrypted rooms.",
    tags: ["React", "Firestore", "Node.js", "TypeScript"],
    gradient: "from-indigo-600 to-blue-600",
    glow: "group-hover:shadow-blue-500/30",
    icon: "💬",
  },
  {
    title: "AuthKit",
    description:
      "Production-ready auth boilerplate — JWT, refresh tokens, email verification, OAuth, and rate limiting with Node.js + TypeScript.",
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
      "Analytics dashboard that ingests streaming data, aggregates it via Node.js workers, and visualizes insights in interactive React charts.",
    tags: ["React TS", "Node.js", "Firestore", "Recharts"],
    gradient: "from-orange-500 to-rose-600",
    glow: "group-hover:shadow-orange-500/30",
    icon: "📊",
  },
  {
    title: "NoteNest",
    description:
      "Collaborative note-taking app with rich text editing, live presence cursors, folder organization, and Supabase Realtime sync.",
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
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "expo.out", stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-28 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-3 block">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            A selection of full-stack apps built with React, TypeScript, Node.js, Supabase, and Firestore.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`group relative bg-white dark:bg-gray-800/60 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${project.glow} cursor-pointer`}
            >
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

              <div className="p-6">
                <div className="text-3xl mb-3">{project.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    <Github size={14} /> Code
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    <ExternalLink size={14} /> Live Demo
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
