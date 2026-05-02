import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Send, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { EXPERIENCES } from '../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.experience-item');
    
    items.forEach((item: any) => {
      // Ensure visibility first in case something goes wrong
      gsap.set(item, { opacity: 0, y: 30 });
      
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="experience" className="py-24 px-6 bg-[#080808] grid-structure">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-primary mb-4 block">04. History</span>
          <h2 className="text-4xl md:text-5xl font-bold">Experience.</h2>
        </div>

        <div className="space-y-6">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.id}
              className="experience-item group relative glass p-10 md:p-14 rounded-[2.5rem] border-transparent hover:border-white/10 transition-all duration-500 overflow-hidden cursor-default"
            >
              {/* Interactive Line Indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
              
              {/* Background Glow Effect */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] -translate-y-20 translate-x-20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative z-10 grid md:grid-cols-[1fr,2fr] gap-12">
                <div className="flex flex-col gap-4">
                  <span className="text-sm font-mono text-brand-primary tracking-widest">{exp.period}</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-gradient">{exp.company}</h3>
                  <div className="h-[1px] w-12 bg-brand-primary/40" />
                </div>
                
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-display font-medium text-white/80">{exp.role}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                         {["Architecture", "Performance", "Team Lead"].map(tag => (
                             <span key={tag} className="text-[10px] uppercase tracking-tighter text-white/20 border border-white/5 px-2 py-0.5 rounded">
                                 {tag}
                             </span>
                         ))}
                    </div>
                  </div>
                  
                  <ul className="space-y-4">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-white/60 flex gap-4 text-base leading-relaxed">
                        <span className="text-brand-primary font-mono mt-1 text-sm">0{idx + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 glass rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 border-brand-primary/10 group">
            <div className="space-y-2 text-center md:text-left transition-transform group-hover:translate-x-2 duration-500">
                <h4 className="text-2xl font-bold">Academic Background</h4>
                <p className="text-white/40">B.Sc. in CSE, Bangladesh University (7th Sem Running)</p>
                <p className="text-white/20 text-sm">Diploma in Engineering, Thakurgaon Polytechnic (2022)</p>
            </div>
            <div className="h-12 w-[1px] bg-white/5 hidden md:block" />
            <div className="space-y-2 text-center md:text-right transition-transform group-hover:-translate-x-2 duration-500">
                <h4 className="text-2xl font-bold">Location & Contact</h4>
                <p className="text-white/40">Dhaka, Bangladesh</p>
                <p className="text-white/20 text-sm">+8801717362597</p>
            </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(leftContentRef.current?.children || [], {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
    });

    gsap.from(formRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });
  }, { scope: sectionRef });

  const onSubmit = (data: any) => {
    console.log(data);
    alert('Message sent! (Mock implementation)');
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 grid-structure">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div ref={leftContentRef}>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-primary mb-4 block">05. Connect</span>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Let's build <br />something <span className="text-white/20">great.</span></h2>
          
          <div className="space-y-8 mt-12">
            <div>
              <p className="text-white/40 mb-2 font-mono text-xs uppercase tracking-widest">Email</p>
              <a href="mailto:mdridoy9902@gmail.com" className="text-2xl md:text-3xl font-medium hover:text-brand-primary transition-colors">mdridoy9902@gmail.com</a>
            </div>
            
            <div className="flex gap-6 pt-4">
              {[
                { icon: <Github size={24} />, href: 'https://github.com/mdridoy-khan' },
                { icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/in/md-majedul-islam-13161a257/' },
                { icon: <Mail size={24} />, href: 'mailto:mdridoy9902@gmail.com' },
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all text-white/60 hover:text-white">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={formRef}
          className="glass p-10 rounded-[2.5rem]"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-1">Name</label>
              <input
                {...register('name', { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-sans text-white"
                placeholder="Your Name"
              />
              {errors.name && <span className="text-xs text-red-500">Name is required</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-1">Email</label>
              <input
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-sans text-white"
                placeholder="your@email.com"
              />
              {errors.email && <span className="text-xs text-red-500">Valid email is required</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-1">Message</label>
              <textarea
                {...register('message', { required: true })}
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all resize-none font-sans text-white"
                placeholder="What's on your mind?"
              />
              {errors.message && <span className="text-xs text-red-500">Message is required</span>}
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-white text-black rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-primary transition-all group"
            >
              Send Message
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
    return (
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-display font-bold tracking-tighter">
            MAJEDUL<span className="text-brand-primary">.</span>DEV
          </div>
          
          <div className="flex gap-8 text-sm text-white/40">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>

          <p className="text-white/20 text-xs font-mono">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED. HANDCRAFTED WITH PRECISION.
          </p>
        </div>
      </footer>
    );
}
