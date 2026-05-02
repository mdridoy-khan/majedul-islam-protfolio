import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1 },
      });

      // Entrance Animation
      tl.from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }).from(
        actionsRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6",
      );

      // Enhanced Tech Labels Animation
      gsap.utils.toArray(".tech-label").forEach((label: any, i: number) => {
        gsap.to(label, {
          y: "random(-20, 20)",
          x: "random(-10, 10)",
          duration: 4 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Periodic light flash/glow
        gsap.to(label, {
          filter:
            "brightness(1.5) drop-shadow(0 0 10px rgba(242, 125, 38, 0.5))",
          opacity: 0.8,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          delay: i * 0.8,
          ease: "power2.inOut",
        });
      });

      // Mouse Tracking Parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(".hero-parallax", {
          x: xPos,
          y: yPos,
          duration: 2,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Floating animation for orbs
      gsap.to([orb1Ref.current, orb2Ref.current], {
        x: "random(-60, 60)",
        y: "random(-60, 60)",
        duration: "random(6, 10)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden grid-structure"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none" />

      {/* Decorative Orbs */}
      <div
        ref={orb1Ref}
        className="hero-parallax absolute top-1/4 -left-20 w-[30rem] h-[30rem] bg-brand-primary/10 rounded-full blur-[150px] pointer-events-none"
      />
      <div
        ref={orb2Ref}
        className="hero-parallax absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"
      />

      {/* Floating Sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand-primary/40 rounded-full blur-[1px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            ref={(el) => {
              if (el) {
                gsap.to(el, {
                  y: "random(-200, 200)",
                  x: "random(-200, 200)",
                  opacity: "random(0.1, 0.5)",
                  duration: "random(10, 20)",
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                });
              }
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-10 border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">
              Available for projects
            </span>
          </motion.div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-[clamp(3rem,5vw,4rem)] font-semibold mb-6 text-gradient relative group"
          >
            MAJEDUL <br />
            <span className="text-white/30">ISLAM.</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-md md:text-lg text-white/60 font-light leading-relaxed mb-6 max-w-2xl mx-auto"
          >
            A <span className="text-white font-medium">Frontend Developer</span>{" "}
            passionate about building scalable web apps with React.js and
            Next.js, solving complex UI problems with precision.
          </p>

          <div
            ref={actionsRef}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <a
              href="#projects"
              className="group px-8 py-3 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:bg-brand-primary transition-all duration-300"
            >
              View Projects
              {/* <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              /> */}
            </a>
            <a
              href="#contact"
              className="px-8 py-3 glass rounded-full font-bold flex items-center gap-3 hover:bg-white/10 transition-all border-white/10"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Dynamic Tech Orbit - Background Layer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10 overflow-hidden opacity-30 md:opacity-100">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[900px] max-h-[900px] border border-white/[0.03] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] max-w-[700px] max-h-[700px] border border-white/[0.05] rounded-full" />

          {[
            { label: "React", top: "15%", left: "15%" },
            { label: "Next.js", top: "25%", left: "85%" },
            { label: "TypeScript", top: "75%", left: "20%" },
            { label: "Tailwind", top: "80%", left: "80%" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.9, 0.1],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute hidden lg:block tech-label"
              style={{ top: item.top, left: item.left }}
            >
              <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-brand-primary/40 rotate-12">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
