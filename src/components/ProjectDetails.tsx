import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronRight, ExternalLink, Github, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";
import { Project } from "../types";

interface ProjectDetailsProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [project]);

  useGSAP(
    () => {
      if (project && containerRef.current) {
        const q = gsap.utils.selector(containerRef);

        const tl = gsap.timeline({
          defaults: { ease: "power4.out", duration: 1 },
        });

        tl.from(containerRef.current, {
          opacity: 0,
          backgroundColor: "transparent",
        })
          .from(
            q(".modal-card"),
            {
              y: 100,
              opacity: 0,
              scale: 0.95,
            },
            "-=0.5",
          )
          .from(
            q(".stagger-item"),
            {
              y: 30,
              opacity: 0,
              stagger: 0.1,
            },
            "-=0.7",
          );
      }
    },
    { dependencies: [project] },
  );

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        ref={containerRef}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-[#050505]/95 backdrop-blur-3xl animate-in fade-in duration-500"
          onClick={onClose}
        />

        {/* Dynamic Background Orb based on thumbnail */}
        <div className="absolute inset-0 pointer-events-none opacity-30 blur-[150px]">
          <img
            src={project.thumbnail}
            alt=""
            className="w-full h-full object-cover scale-150 rotate-12"
          />
        </div>

        <div className="modal-card relative w-full max-w-7xl h-full max-h-[90vh] bg-[#0A0A0A] border border-white/5 rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
          {/* Close Button - Floating */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-50 w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all text-white/60 hover:text-white border-white/10 hover:border-white/20 group"
          >
            <X
              size={24}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>

          {/* Left: Image / Showcase */}
          <div className="w-full md:w-[45%] h-64 md:h-auto relative overflow-hidden flex-shrink-0">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent" />

            {/* Project Stats Over Image */}
            <div className="absolute bottom-10 left-10 hidden md:block stagger-item">
              <div className="glass px-6 py-4 rounded-2xl flex gap-10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                    Status
                  </p>
                  <p className="text-sm font-mono text-brand-primary">
                    Completed
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                    Year
                  </p>
                  <p className="text-sm font-mono text-white/80">2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Information */}
          <div className="w-full md:w-[55%] flex-1 min-h-0 relative bg-gradient-to-b from-[#0D0D0D] to-[#0A0A0A]">
            <div
              className="absolute inset-0 overflow-y-auto custom-scrollbar p-8 md:p-20 pt-16 md:pt-24 pb-40 md:pb-40"
              ref={contentRef}
            >
              <div className="stagger-item mb-12">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-primary mb-4 block">
                  Case Study
                </span>
                <h2 className="text-2xl md:text-4xl font-bold mb-8 leading-tight text-gradient">
                  {project.title}
                </h2>
                <p className="text-white/60 text-xl font-light leading-relaxed max-w-xl">
                  {project.detailedDescription || project.description}
                </p>
              </div>

              <div className="stagger-item mb-16">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6 font-mono">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:bg-white/10 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-12 mb-16">
                {project.features && (
                  <div className="stagger-item space-y-6">
                    <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                      Highlights
                    </h3>
                    <ul className="space-y-4">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary group-hover:scale-150 transition-transform" />
                          <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.challenges && (
                  <div className="stagger-item space-y-6">
                    <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white/40">
                      Architecture
                    </h3>
                    <ul className="space-y-4">
                      {project.challenges.map((challenge, i) => (
                        <li
                          key={i}
                          className="text-sm text-white/60 flex items-start gap-3"
                        >
                          <ChevronRight
                            size={14}
                            className="text-brand-primary mt-0.5 shrink-0"
                          />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions - Fixed */}
            <div className="absolute bottom-0 left-0 w-full stagger-item p-6 md:p-10 border-t border-white/5 flex flex-wrap items-center justify-between gap-6 bg-[#0A0A0A]/90 backdrop-blur-md z-10">
              <div className="flex gap-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3 bg-white text-black rounded-full font-bold flex items-center gap-3 hover:bg-brand-primary transition-all duration-300"
                >
                  Live Preview <ExternalLink size={18} />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all group"
                >
                  <Github
                    size={24}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
              </div>

              <button
                onClick={onClose}
                className="text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              >
                Close Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
