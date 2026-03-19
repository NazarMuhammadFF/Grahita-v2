/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import ReactLenis from 'lenis/react';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroPathRef = useRef<SVGPathElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInnerRef = useRef<HTMLDivElement>(null);
  const anomalyRef = useRef<HTMLAnchorElement>(null);
  
  const [hudLevel, setHudLevel] = useState(100);

  useEffect(() => {
    // 1. Initial Hero Draw Animation (Intricate Brain/Maze SVG)
    if (heroPathRef.current) {
      const length = heroPathRef.current.getTotalLength();
      gsap.set(heroPathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(heroPathRef.current, {
        strokeDashoffset: 0,
        duration: 4,
        ease: 'power3.inOut',
        delay: 0.2,
      });
    }

    // Typewriter effect for eyebrow
    if (eyebrowRef.current) {
      gsap.to(eyebrowRef.current, {
        text: "> ACCESSING ACTION RESEARCH JOURNAL...",
        duration: 2.5,
        ease: "none",
        delay: 0.5
      });
    }

    // 2. HUD Contagion Drain Linked to Scroll
    if (containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress;
          // Drain from 100 to 15
          const level = Math.max(15, Math.floor(100 - (progress * 85)));
          setHudLevel(level);
        }
      });
    }

    // 4. Horizontal Scroll Timeline (Pinned for Scene 4)
    if (timelineRef.current && timelineInnerRef.current) {
      // Calculate max scroll width.
      const getScrollAmount = () => -(timelineInnerRef.current!.scrollWidth - window.innerWidth + 200);

      const tween = gsap.to(timelineInnerRef.current, {
        x: getScrollAmount,
        ease: 'none'
      });

      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: 'top top',
        end: () => `+=${timelineInnerRef.current!.scrollWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleAnomalyEnter = () => {
    if (anomalyRef.current) {
      gsap.to(anomalyRef.current, {
        duration: 0.5,
        text: "[ EXECUTE FOLDER: THE_PITCH.sys ]",
        ease: "none",
      });
    }
  };

  const handleAnomalyLeave = () => {
    if (anomalyRef.current) {
      gsap.to(anomalyRef.current, {
        duration: 0.5,
        text: "[ SYSTEM FATAL ERROR: MISSING_BUSINESS_PITCH ]",
        ease: "none",
      });
    }
  };

  const hudColorClass = hudLevel < 40 ? 'text-[#D62828] animate-[pulse_1s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(214,40,40,0.8)]' : 'text-[#84A59D]';
  const hudBgColor = hudLevel < 40 ? '#D62828' : '#84A59D';

  return (
    <ReactLenis root>
      <div ref={containerRef} className="min-h-screen relative text-chalk bg-blueprint select-none">
        
        {/* GLOBAL INTERACTION: The Dual-Metrics HUD */}
        <div className={`fixed top-8 right-8 z-50 font-mono text-sm tracking-widest flex flex-col gap-3 transition-colors duration-500 ${hudColorClass}`}>
          <div className="flex items-center justify-end gap-3">
            <span className="font-bold drop-shadow-sm">[PHYSICAL: {hudLevel}%]</span>
            <div className="w-40 h-[4px] bg-chalk/10 relative overflow-hidden border border-[#84A59D]/20">
              <div 
                className="absolute top-0 left-0 h-full hud-contagion"
                style={{ width: `${hudLevel}%`, backgroundColor: hudBgColor }}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <span className="font-bold drop-shadow-sm">[MENTAL: {hudLevel}%]</span>
            <div className="w-40 h-[4px] bg-chalk/10 relative overflow-hidden border border-[#84A59D]/20">
              <div 
                className="absolute top-0 left-0 h-full hud-contagion"
                style={{ width: `${hudLevel}%`, backgroundColor: hudBgColor }}
              />
            </div>
          </div>
        </div>

        {/* SCENE 1: THE INITIALIZATION */}
        <section className="h-screen w-full flex flex-col items-center justify-center relative p-8 overflow-hidden">
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 select-none pointer-events-none">
            {/* Intricate Abstract Brain / Maze Blueprint SVG */}
            <svg viewBox="0 0 1000 800" fill="none" className="w-[90vw] max-w-[1000px] h-auto">
              <path 
                ref={heroPathRef}
                d="M 500 100 C 600 100 700 150 750 250 C 800 350 750 450 650 550 C 550 650 450 650 350 550 C 250 450 200 350 250 250 C 300 150 400 100 500 100 Z M 500 150 C 550 150 620 180 660 260 M 340 260 C 380 180 450 150 500 150 M 400 300 L 450 350 L 450 400 L 500 450 L 550 400 L 550 350 L 600 300 M 350 450 L 400 500 L 480 600 M 650 450 L 600 500 L 520 600 M 450 250 L 450 300 L 550 300 L 550 250 L 450 250 Z M 480 320 L 520 320" 
                stroke={hudBgColor}
                strokeWidth="1.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ strokeDasharray: "3000", strokeDashoffset: "3000" }}
                className="hud-contagion drop-shadow-[0_0_5px_rgba(132,165,157,0.5)]"
              />
            </svg>
          </div>
          
          <div className="z-10 text-center max-w-5xl mt-20">
            <p ref={eyebrowRef} className="font-mono text-sage mb-8 tracking-[0.2em] text-sm md:text-lg min-h-[1.5rem]">
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] mb-6 font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              THE BLUEPRINT
            </h1>
            <p className="font-mono text-xl md:text-3xl text-chalk/80 border-b border-chalk/30 pb-6 inline-block tracking-wide">
              Core Mechanics, Gameworld, & Entities
            </p>
          </div>
          
          <div className="absolute bottom-16 font-mono text-sage animate-[pulse_1s_ease-in-out_infinite] text-4xl">
            _
          </div>
        </section>

        {/* SCENE 2: CORE GAMEPLAY & RULES */}
        <section className="min-h-screen py-32 px-8 lg:px-24 border-t border-chalk/10 bg-blueprint/60 backdrop-blur-md relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl md:text-5xl mb-16 font-tactical text-sage pb-4 border-b border-sage/30 drop-shadow-[0_0_8px_rgba(132,165,157,0.4)]">
              MODULE // 02: CORE MECHANICS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[280px]">
              
              <div className="border border-white/20 bg-blueprint/80 p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:border-white/50 lg:col-span-2 relative overflow-hidden group">
                <div className="text-xs font-mono text-chalk/50 mb-4 tracking-widest">[OBJECTIVES]</div>
                <p className="rules-text text-2xl md:text-3xl font-medium text-chalk leading-snug">
                  "Objectives: Mengumpulkan data riset di Book Journal dan bertahan hidup hingga sidang skripsi (Hari ke-30) dengan menyeimbangkan intervensi NPC dan self-care." <span className="text-sage text-sm">[cite: 50]</span>
                </p>
                {/* Glowing aesthetic corner */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 border border-white/10 rounded-full group-hover:scale-110 group-hover:border-white/30 transition-transform duration-700"></div>
              </div>

              <div className="border border-white/20 bg-blueprint/80 p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:border-white/50 group">
                <div className="text-xs font-mono text-chalk/50 mb-4 tracking-widest">[GAMEPLAY LOOP]</div>
                <p className="rules-text text-lg md:text-xl text-chalk/90 leading-relaxed italic border-l-[3px] border-sage pl-4 group-hover:border-warning transition-colors">
                  "Gameplay Loop: Keluar dari Safe Zone -&gt; Eksplorasi kampus -&gt; Dialog Active Listening -&gt; Puzzle Alterworld -&gt; Self-care."
                </p>
              </div>

              <div className="border border-white/20 bg-blueprint/80 p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:border-white/50 lg:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-warning/50 to-transparent"></div>
                <div className="text-xs font-mono text-chalk/50 mb-4 tracking-widest">[APPROVAL RULE]</div>
                <p className="rules-text text-xl md:text-2xl text-chalk leading-relaxed">
                  "Active Listening: Respons salah mengunci Alterworld (Approval Rule)."<br/><br/>
                  "Jika gagal meraih kepercayaan NPC, cari target di fakultas lain (Cross-Faculty Rule)." <span className="text-sage text-sm">[cite: 52]</span>
                </p>
              </div>

              <div className="border border-white/20 bg-blueprint/80 p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:border-white/50 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blueprint/20 via-blueprint to-blueprint">
                <div className="text-xs font-mono text-chalk/50 mb-4 tracking-widest">[PROGRESSION]</div>
                <p className="rules-text text-lg md:text-xl text-chalk/80 leading-relaxed">
                  "Book Journal Progression: Tidak ada EXP." <span className="text-sage text-xs">[cite: 31]</span><br/><br/>
                  "Progres, data riset, dan ending cerita ditentukan oleh seberapa lengkap Book Journal terisi." <span className="text-sage text-xs">[cite: 31]</span>
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* SCENE 3: THE VISIBILITY PARADOX & CONTAGION */}
        <section className="min-h-screen py-32 px-8 lg:px-24 border-t border-chalk/10 relative z-10 overflow-hidden bg-[#0A1224]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center h-full">
            
            {/* The Paradox Left Col */}
            <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-tactical text-sage drop-shadow-[0_0_8px_rgba(132,165,157,0.4)]">
                MODULE // 03: PARADOX
              </h2>
              <div className="space-y-6 border-l w-full max-w-2xl border-chalk/20 pl-8 relative">
                <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-sage"></div>
                <p className="rules-text text-2xl leading-relaxed text-chalk font-medium">
                  "Visibility Paradox: Semakin berat kondisi psikologis NPC, semakin 'normal' terlihat Altered Map-nya (berbeda dengan masalah ringan yang distorsinya jelas)." <span className="text-sage text-base">[cite: 28]</span>
                </p>
                <p className="rules-text text-xl leading-relaxed text-chalk/60 italic">
                  "Ini merepresentasikan realita bahwa depresi berat sering tak kasat mata." <span className="text-sage text-base">[cite: 29]</span>
                </p>
              </div>
              
              {/* Interactive SVG Group Container */}
              <div className="mt-16 group w-72 h-72 relative border border-white/20 bg-blueprint/40 hover:border-warning/30 transition-colors duration-500 hover:shadow-[0_0_20px_rgba(214,40,40,0.2)]">
                <div className="absolute -top-3 -right-3 bg-blueprint text-xs font-mono text-chalk px-2 border border-white/20">INTERACTIVE_COMPONENT</div>
                
                <div className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-widest text-chalk/40 group-hover:opacity-0 transition-opacity">
                  [ HOVER ]
                </div>
                
                <svg viewBox="0 0 100 100" className="w-full h-full p-4 overflow-visible" fill="none" strokeWidth="2">
                  {/* Perfect Smooth Outer Circle */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    className="stroke-sage transition-all duration-700 ease-in-out group-hover:stroke-warning group-hover:opacity-30 group-hover:scale-[1.05] origin-center" 
                  />
                  {/* Chaotic Inner Splinter */}
                  <path 
                    d="M 50 15 L 60 35 L 85 40 L 65 55 L 75 80 L 50 65 L 25 80 L 35 55 L 15 40 L 40 35 Z M 50 30 L 45 45 L 30 50 L 45 55 L 50 70 L 55 55 L 70 50 L 55 45 Z" 
                    className="stroke-warning opacity-0 scale-50 origin-center transition-all duration-[800ms] ease-out group-hover:opacity-100 group-hover:scale-100 drop-shadow-[0_0_8px_rgba(214,40,40,0.8)]" 
                  />
                </svg>
              </div>
            </div>

            {/* The Contagion Right Col */}
            <div className="space-y-12 p-16 border border-white/10 bg-gradient-to-bl from-blueprint to-transparent relative overflow-hidden group">
              {/* Dynamic warning glow based on HUD */}
              <div className={`absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-warning/20 to-transparent ${hudColorClass} opacity-50`}></div>
              
              <h2 className={`text-4xl md:text-6xl font-tactical ${hudColorClass} relative z-10`}>
                MODULE // 04: CONTAGION
              </h2>
              <div className="space-y-6 relative z-10 border-l border-warning/50 pl-8">
                <p className="rules-text text-3xl leading-relaxed font-bold text-white drop-shadow-md">
                  "Contagion Effect: Empati memiliki konsekuensi."
                </p>
                <p className="rules-text text-xl leading-relaxed text-chalk/80">
                  "Gagal menolong NPC menularkan efek psikologis yang merusak mental/fisik MC serta memberi debuff eksplorasi."
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SCENE 4: GAMEWORLD & SEVERITY LEVELS */}
        <section ref={timelineRef} className="h-screen w-full overflow-hidden bg-blueprint relative border-t border-chalk/10 flex flex-col justify-center">
          
          <div className="absolute top-20 left-8 lg:left-24 max-w-4xl z-20 pointer-events-none">
            <h2 className="text-4xl md:text-6xl font-tactical text-sage mb-8 drop-shadow-[0_0_10px_rgba(132,165,157,0.3)] tracking-wide">
              GLOBAL // DUAL REALITY SYSTEM
            </h2>
            <div className="rules-text text-xl md:text-2xl bg-blueprint/90 backdrop-blur-sm p-8 border border-white/20 shadow-2xl leading-relaxed pointer-events-auto">
              "Dunia game menggunakan Dual Reality System: Overworld (kampus realistis) & Alterworld (dimensi pikiran NPC berbentuk ruang puzzle)." <span className="text-sage text-sm">[cite: 33]</span><br/><br/>
              "Terdapat 5 fakultas dengan ±15 Alterworld yang disesuaikan dengan masalah psikologisnya:" <span className="text-sage text-sm">[cite: 34]</span>
            </div>
          </div>

          <div ref={timelineInnerRef} className="flex h-full items-center px-12 lg:px-64 w-max gap-40 will-change-transform pt-40">
            {/* Horizontal Timeline Connector Line */}
            <div className="absolute top-1/2 left-0 w-[300vw] h-[2px] bg-white/10 -translate-y-1/2 pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>
            
            {/* Timeline Nodes */}
            {[
              { id: "NODE: 01", text: "Academic Stress: Puzzle berbasis waktu/manajemen prioritas.", ref: "[cite: 35]" },
              { id: "NODE: 02", text: "Burnout: Manajemen stamina/objek berat.", ref: "[cite: 36]" },
              { id: "NODE: 03", text: "Social Isolation: Labirin navigasi.", ref: "[cite: 37]" },
              { id: "NODE: 04", text: "Anxiety: Stealth dan mekanik grounding.", ref: "[cite: 38]" },
              { id: "NODE: 05", text: "Critical Depression: Investigasi dengan deteksi anomali.", ref: "[cite: 39]", isCritical: true },
            ].map((node, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center justify-center w-[400px] shrink-0 group">
                
                {/* Visual Node Dot */}
                <div className={`w-8 h-8 rounded-none border-[3px] bg-blueprint ${node.isCritical ? 'border-warning animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_15px_rgba(214,40,40,0.8)]' : 'border-sage shadow-[0_0_10px_rgba(132,165,157,0.5)]'} mb-12 group-hover:scale-150 transition-all duration-500 rotate-45`}></div>
                
                {/* Node Text Box */}
                <div className={`w-full border bg-blueprint/90 backdrop-blur-md p-8 transition-colors duration-300 ${node.isCritical ? 'border-warning/70 shadow-[0_0_20px_rgba(214,40,40,0.2)]' : 'border-white/20 hover:border-sage/80 shadow-[0_0_15px_rgba(0,0,0,0.5)]'}`}>
                  <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-3">
                    <span className={`text-sm font-mono tracking-widest font-bold ${node.isCritical ? 'text-warning' : 'text-sage'}`}>{node.id}</span>
                    <span className="text-chalk/30 font-mono text-xs">V.1.0.{i}</span>
                  </div>
                  <p className="rules-text text-xl text-chalk/90 leading-relaxed font-medium">
                    "{node.text}"
                  </p>
                  <p className="text-sage text-sm font-mono mt-4 text-right">{node.ref}</p>
                </div>

              </div>
            ))}
            {/* Blank space to end the horizontal scroll comfortably */}
            <div className="w-[10vw] shrink-0 pointer-events-none"></div>
          </div>
        </section>

        {/* SCENE 5: ENTITIES & THE MYSTERY OUTRO */}
        <section className="min-h-[80vh] flex flex-col justify-between py-32 px-8 lg:px-24 border-t border-white/20 relative bg-[#060A14] overflow-hidden">
          {/* Subtle background grain or grid overlay if needed */}
          <div className="max-w-5xl font-mono relative z-10 w-full mx-auto">
            <h2 className="text-4xl md:text-6xl font-tactical text-sage mb-16 border-b-2 border-sage/30 pb-6 inline-block tracking-widest drop-shadow-[0_0_8px_rgba(132,165,157,0.3)]">
              &gt; DATA_DIRECTORY // ENTITIES
            </h2>
            
            <div className="text-xl md:text-2xl space-y-6 text-chalk/80 leading-relaxed border-l-4 border-sage/50 pl-8 bg-blueprint/30 p-8">
              <p>
                <span className="text-chalk font-bold">"Entities:</span> Karakter Utama (MC), Key NPC (Dosen), Target NPC (15 mahasiswa krisis), Background NPC, dan Alterworld Hazards (rintangan pikiran)." <span className="text-sage text-base">[cite: 53]</span>
              </p>
            </div>
          </div>

          {/* THE ANOMALY (HIDDEN ARG LINK) */}
          <div className="mt-40 w-full flex justify-end max-w-[1400px] mx-auto z-20">
            <a 
              href="#"
              ref={anomalyRef}
              onMouseEnter={handleAnomalyEnter}
              onMouseLeave={handleAnomalyLeave}
              className="text-xs md:text-sm font-mono tracking-[0.3em] p-4 border border-transparent hover:border-warning/50 hover:bg-warning/10 transition-all duration-300 text-chalk/30 hover:text-warning hover:drop-shadow-[0_0_12px_rgba(214,40,40,1)] uppercase select-none inline-block min-w-[300px] text-right"
            >
              [ SYSTEM FATAL ERROR: MISSING_BUSINESS_PITCH ]
            </a>
          </div>
        </section>

      </div>
    </ReactLenis>
  );
}
