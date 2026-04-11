import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import { Project3D } from "./Project3D";
import { useTheme } from "../hooks/useTheme";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   Mini UI mockups (SVG / CSS)
───────────────────────────────────────── */

function DevBoardPreview() {
  return (
    <div className="flex gap-2 px-3 pt-3 pb-2 h-full items-start">
      {[
        { label: "To Do", color: "#6d28d9", items: ["Auth flow", "DB schema"] },
        { label: "In Progress", color: "#7c3aed", items: ["API routes"] },
        { label: "Done", color: "#4c1d95", items: ["Setup", "CI/CD"] },
      ].map((col) => (
        <div key={col.label} className="flex-1 flex flex-col gap-1">
          <div className="text-[7px] font-bold uppercase tracking-wider mb-0.5" style={{ color: col.color }}>
            {col.label}
          </div>
          {col.items.map((item) => (
            <div key={item} className="bg-white/10 rounded px-1.5 py-1 text-[7px] text-white/80 leading-tight">
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ChatSyncPreview() {
  const msgs = [
    { text: "Hey, you online?", mine: false },
    { text: "Yes! Just pushed the fix 🚀", mine: true },
    { text: "Awesome, merging now", mine: false },
    { text: "Ship it! 🎉", mine: true },
  ];
  return (
    <div className="flex flex-col gap-1.5 px-3 pt-3 pb-2 h-full justify-end">
      {msgs.map((m, i) => (
        <div key={i} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
          <div
            className="text-[7px] px-2 py-1 rounded-xl max-w-[70%] leading-snug"
            style={{
              background: m.mine ? "rgba(124,58,237,0.7)" : "rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.9)",
              borderRadius: m.mine ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
            }}
          >
            {m.text}
          </div>
        </div>
      ))}
      <div className="mt-1 flex gap-1 items-center bg-white/10 rounded-full px-2 py-0.5">
        <div className="flex-1 text-[6px] text-white/30">Type a message…</div>
        <div className="w-2.5 h-2.5 rounded-full bg-violet-500 flex items-center justify-center">
          <svg width="5" height="5" viewBox="0 0 6 6"><path d="M1 5 L5 3 L1 1 Z" fill="white"/></svg>
        </div>
      </div>
    </div>
  );
}

function AuthKitPreview() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-1.5 px-4 pt-3 pb-2">
      <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center mb-0.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <div className="text-[7px] font-bold text-white/80">Sign In</div>
      {["Email", "Password"].map((f) => (
        <div key={f} className="w-full bg-white/10 rounded px-2 py-1 text-[6px] text-white/30">{f}</div>
      ))}
      <div className="w-full bg-purple-600/80 rounded py-1 text-[7px] font-bold text-white text-center">
        Continue →
      </div>
      <div className="text-[6px] text-white/30">or sign in with OAuth</div>
      <div className="flex gap-1">
        {["G", "GH", "TW"].map((p) => (
          <div key={p} className="bg-white/10 rounded px-1.5 py-0.5 text-[6px] text-white/50">{p}</div>
        ))}
      </div>
    </div>
  );
}

function StoreFrontPreview() {
  const items = [
    { name: "Sneakers", price: "$89", color: "#7c3aed" },
    { name: "Watch", price: "$199", color: "#6d28d9" },
    { name: "Bag", price: "$59", color: "#5b21b6" },
    { name: "Cap", price: "$29", color: "#4c1d95" },
  ];
  return (
    <div className="px-3 pt-3 pb-2 h-full flex flex-col gap-1.5">
      <div className="flex items-center justify-between mb-0.5">
        <div className="text-[7px] font-bold text-white/80">Featured Products</div>
        <div className="text-[6px] text-violet-400">View all →</div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {items.map((item) => (
          <div key={item.name} className="rounded-lg overflow-hidden bg-white/10">
            <div className="h-6 w-full" style={{ background: `linear-gradient(135deg, ${item.color}55, ${item.color}22)` }} />
            <div className="px-1.5 py-1">
              <div className="text-[6px] text-white/70 font-medium">{item.name}</div>
              <div className="text-[7px] text-violet-300 font-bold">{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataFlowPreview() {
  const bars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];
  return (
    <div className="px-3 pt-3 pb-2 h-full flex flex-col gap-1">
      <div className="flex justify-between items-center mb-1">
        <div className="text-[7px] font-bold text-white/80">Analytics Overview</div>
        <div className="text-[6px] text-emerald-400">▲ 24.5%</div>
      </div>
      <div className="flex gap-2 mb-1.5">
        {[{ l: "Users", v: "12.4K" }, { l: "Revenue", v: "$8.2K" }].map((s) => (
          <div key={s.l} className="flex-1 bg-white/10 rounded px-1.5 py-1">
            <div className="text-[6px] text-white/40">{s.l}</div>
            <div className="text-[8px] font-bold text-white">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex items-end gap-0.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background: `linear-gradient(to top, rgba(124,58,237,0.9), rgba(99,102,241,0.4))`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function NoteNestPreview() {
  const notes = [
    { title: "API Design", tag: "Backend", lines: 2 },
    { title: "UI Revamp", tag: "Design", lines: 3 },
    { title: "Sprint Goals", tag: "Planning", lines: 2 },
  ];
  return (
    <div className="px-3 pt-3 pb-2 h-full flex flex-col gap-1.5">
      <div className="flex items-center justify-between mb-0.5">
        <div className="text-[7px] font-bold text-white/80">My Notes</div>
        <div className="w-3 h-3 rounded bg-violet-600/60 flex items-center justify-center text-[8px] text-white">+</div>
      </div>
      {notes.map((n) => (
        <div key={n.title} className="bg-white/10 rounded-lg px-2 py-1.5 flex gap-1.5 items-start">
          <div className="w-0.5 self-stretch rounded-full bg-violet-500/60 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="text-[7px] font-semibold text-white/90 truncate">{n.title}</div>
            <div className="flex gap-0.5 mt-0.5">
              {Array.from({ length: n.lines }).map((_, i) => (
                <div key={i} className="h-0.5 rounded-full bg-white/20" style={{ width: `${30 + i * 15}%` }} />
              ))}
            </div>
          </div>
          <div className="text-[5px] bg-violet-500/20 text-violet-300 px-1 py-0.5 rounded-full flex-shrink-0">{n.tag}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Project data
───────────────────────────────────────── */
const projects = [
  {
    title: "USP OBE System",
    description: "OBE (Outcome-Based Education) System is a full-stack web application built using React (TypeScript), Node.js, Tailwind CSS, and Supabase. It helps manage students, courses, CLOs/PLOs, and assessments while tracking learning outcomes efficiently. The system provides a clean dashboard to monitor student performance and ensures better academic evaluation through data-driven insights.",
    tags: ["React", "Node.js", "Supabase", "OBE System"],
    image: "/obe.png",
    githubUrl: "https://github.com/kumailraza5/OBE-System",
    viewUrl: "https://obe-system-w2wd.onrender.com/",
    glow: "hover:shadow-emerald-500/25",
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    title: "Aurevo Store",
    description: "A modern full-stack eCommerce store built with React and integrated with Supabase. It offers a smooth shopping experience for premium watches and luxury perfumes with responsive design, secure authentication, cart features, and a clean user-friendly interface.",
    tags: ["React", "Supabase", "eCommerce"],
    image: "/aurevo.png",
    githubUrl: "https://github.com/kumailraza5/Aurevo.store",
    viewUrl: "https://aurevostore.pk/",
    glow: "hover:shadow-indigo-500/25",
    gradient: "from-indigo-600 to-violet-500",
  },
  {
    title: "Elite Motors – Luxury Car Showroom",
    description: "A modern and responsive Car Showroom Website built with React and Tailwind CSS, featuring smooth animations, interactive car listings, and a clean, elegant UI to showcase luxury vehicles.",
    tags: ["React", "Tailwind CSS"],
    image: "/carshowroom.png",
    githubUrl: "https://your-flutterflow.com/beauty-mart",
    viewUrl: "https://carshowroom-ws42.onrender.com/",
    glow: "hover:shadow-blue-500/25",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    title: "Salon Web App",
    description: "A modern salon website built with React featuring client reviews, service packages, online booking, and secure payment integration for a smooth and user-friendly experience.",
    tags: ["React", "Payment Integration"],
    image: "/salonn.jpg",
    githubUrl: "https://your-flutterflow.com/beauty-mart",
    viewUrl: "https://saloon-app-kiic.onrender.com/",
    glow: "hover:shadow-purple-500/25",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    title: "Bakery UI Pink Theme",
    description: "A charming, responsive Bakery App interface built with a pink-themed palette, designed to bring bakery menus to life with appetizing visuals, intuitive navigation, and delightful animations.",
    tags: ["React", "Tailwind CSS"],
    image: "/pink.png",
    githubUrl: "https://your-flutterflow.com/beauty-mart",
    viewUrl: "https://bakery-app-ui-pinktheme-1.onrender.com/",
    glow: "hover:shadow-pink-500/25",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    title: "Bakery UI Purple",
    description: "A charming, responsive Bakery App interface built with a purple-themed palette, designed to bring bakery menus to life with appetizing visuals, intuitive navigation, and delightful animations.",
    tags: ["React", "Tailwind CSS"],
    image: "/purple.jpeg",
    githubUrl: "https://your-flutterflow.com/beauty-mart",
    viewUrl: "https://bakery-app-ui-purpletheme.onrender.com/",
    glow: "hover:shadow-violet-500/25",
    gradient: "from-violet-600 to-fuchsia-600",
  }
];

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export function ProjectsSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, title: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position relative to card center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: headingRef.current, start: "top 82%" } }
      );
      gsap.fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: cardsRef.current, start: "top 78%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-5 md:px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 overflow-hidden"
    >
      <Project3D isDark={isDark} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-10 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-3 block">My Work</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
            Featured{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-sm md:max-w-md mx-auto">
            Full-stack apps built with React, TypeScript, Node.js, Supabase, and Firestore.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {projects.map(({ title, description, tags, gradient, glow, image, githubUrl, viewUrl }) => (
            <div
              key={title}
              onMouseMove={(e) => handleMouseMove(e, title)}
              onMouseLeave={handleMouseLeave}
              className={`group relative bg-white dark:bg-gray-800/60 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700/50 transition-shadow duration-300 hover:shadow-2xl ${glow} flex flex-col will-change-transform`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* ── Project preview image area ── */}
              <div
                className="relative overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-900"
                style={{ height: "180px" }}
              >
                {/* Gradient top bar */}
                <div className={`absolute z-20 top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />

                {/* Actual Project Image */}
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => (e.currentTarget.style.display = "none")} // fallback if image is missing
                />

                {/* Light overlay for hover effect */}
                <div className={`absolute z-10 inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-400 pointer-events-none`} />

                {/* Links — revealed on hover (desktop) or always visible (mobile) */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 z-30">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-violet-600 hover:scale-110 transition-all cursor-pointer shadow-lg"
                    title="View Source on GitHub"
                  >
                    <Github size={14} />
                  </a>
                  <a
                    href={viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-violet-600 hover:scale-110 transition-all cursor-pointer shadow-lg"
                    title="View Live Site"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* ── Card body ── */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mb-4 flex-1">{description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
