import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Plus } from 'lucide-react';
import { PROJECTS } from '../constants';
import { ProjectDetails } from './ProjectDetails';
import { Project } from '../types';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.project-card');
    
    cards.forEach((card: any, i: number) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: i % 2 * 0.2, // Stagger pairs
        ease: 'power4.out',
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-6 overflow-hidden grid-structure">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-primary mb-4 block">03. Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold">Featured Works.</h2>
          </div>
          <p className="text-white/40 max-w-sm">
            A selection of projects that showcase my skills in problem-solving, UI design, and technical engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className="project-card group cursor-pointer perspective-1000"
              onClick={() => setSelectedProject(project)}
              data-cursor-text="view"
            >
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 bg-[#111] transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(242,125,38,0.15)] group-hover:-translate-y-2">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                        <Plus size={32} />
                    </div>
                </div>

                {/* Info Overlay (Static Bottom) */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex gap-3">
                         {project.techStack.slice(0, 2).map(tech => (
                            <span key={tech} className="px-3 py-1 rounded-full glass text-[10px] uppercase tracking-widest text-white/80">
                                {tech}
                            </span>
                         ))}
                    </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 px-2">
                <h3 className="text-3xl font-bold group-hover:text-brand-primary transition-colors duration-300 flex items-center justify-between">
                  {project.title}
                  <span className="text-white/10 group-hover:text-brand-primary/20 transition-colors">0{i+1}</span>
                </h3>
                <p className="text-white/40 font-light line-clamp-2 md:text-lg">{project.description}</p>
                
                <div className="flex gap-6 mt-2">
                    <button className="text-xs font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors flex items-center gap-2">
                        View Detail Study <Plus size={14} />
                    </button>
                    <div className="h-[1px] flex-grow bg-white/5 self-center" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/5 text-sm font-mono uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all outline-none"
            >
              Discover more artifacts on GitHub <Github size={18} />
            </a>
        </div>
      </div>

      <ProjectDetails 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}

