import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Instagram, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(rightRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 74%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const socials = [
    { icon: Mail, label: "kumailr436@gmail.com", href: "mailto:kumailr436@gmail.com" },
    { icon: Github, label: "github.com/kumailraza5", href: "https://github.com/kumailraza5" },
    { icon: Instagram, label: "@kumail___r_a_z_a", href: "https://www.instagram.com/kumail___r_a_z_a?igsh=Z2JydmNxcTYzazFz&utm_source=qr" },
  ];

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 px-5 md:px-6 bg-white dark:bg-gray-950 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div ref={leftRef}>
          <span className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-3 block">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
            Let's build{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              something
            </span>{" "}
            great.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-8">
            Have a project in mind? Reach out — I'd love to hear about it.
          </p>

          <div className="flex flex-col gap-4">
            {socials.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all duration-200 flex-shrink-0">
                  <Icon size={17} />
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div ref={rightRef}>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-5 md:p-8 flex flex-col gap-4"
          >
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block">
                Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {sent && (
              <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 rounded-xl border border-emerald-200 dark:border-emerald-700/40">
                Message sent! I'll get back to you shortly.
              </div>
            )}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 hover:scale-[1.02] active:scale-95 text-sm"
            >
              <Send size={15} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
