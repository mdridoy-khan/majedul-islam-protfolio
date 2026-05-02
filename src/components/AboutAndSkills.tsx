import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import MyImage from "../assets/image.jpeg";
import { SKILLS } from "../constants";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(textRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      // Parallax on the image inside
      gsap.to(imageRef.current?.querySelector("img") as any, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: 50,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 px-6 relative overflow-hidden grid-structure"
    >
      <div className="max-w-7xl mx-auto grid md:grid-auto-cols gap-12 md:grid-cols-2 items-center">
        <div ref={textRef}>
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-primary mb-4 block">
              01. About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Crafting Digital <br />
              Craftmanship.
            </h2>
          </div>

          <div className="space-y-6 text-white/60 text-lg leading-relaxed">
            <p>
              I am a passionate Frontend Developer with hands-on experience in
              building scalable web applications using React.js, Next.js, and
              modern CSS frameworks. Driven by the ability to solve complex UI
              problems and contribute across the full development lifecycle.
            </p>
            <p>
              My journey has led me through various development challenges in
              live client projects, where I've gained valuable experience in
              optimizing performance, accessibility, and cross-browser
              compatibility. I thrive in Agile teams and pride myself on my
              strong communication and teamwork skills.
            </p>
            <p>
              Beyond coding, I focus on OOP, RESTful APIs, and maintaining a
              clean, scalable architecture. I'm dedicated to delivering
              high-quality, user-friendly experiences that make an impact.
            </p>
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative aspect-square rounded-2xl overflow-hidden glass p-2"
        >
          <div className="absolute inset-0 bg-brand-primary/5 p-8 flex items-center justify-center">
            <div className="w-full h-full rounded-xl bg-[#111] overflow-hidden flex items-center justify-center p-8 grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src={MyImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-lg opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const skillCards = gsap.utils.toArray(".skill-card");

      gsap.from(skillCards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      // Animate progress bars
      skillCards.forEach((card: any) => {
        const bar = card.querySelector(".progress-bar");
        const targetWidth = bar.getAttribute("data-level");

        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${targetWidth}%`,
            duration: 1.5,
            ease: "power4.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 px-6 bg-[#080808] grid-structure"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-primary mb-4 block">
              02. Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">My Toolkit.</h2>
          </div>
          <p className="text-white/40 max-w-md">
            I use a modern, industry-standard stack to build applications that
            are fast, scalable, and delightful to use.
          </p>
        </div>

        <div ref={skillsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              className="skill-card p-8 rounded-2xl glass group cursor-default"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-sm font-mono text-white/40">
                  0{i + 1}
                </span>
                <span className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                  {skill.level}%
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  data-level={skill.level}
                  className="progress-bar h-full bg-brand-primary w-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
