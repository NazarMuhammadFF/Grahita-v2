/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import ReactLenis from "lenis/react";
import Scene3 from "@/components/Scene3";
import Scene4 from "@/components/Scene4";
import Scene5 from "@/components/Scene5";
import GlitchClick from "@/components/GlitchClick";
gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroPathRef = useRef<SVGPathElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  const [hudLevel, setHudLevel] = useState(100);

  useEffect(() => {
    // 1. Initial Hero Draw Animation (Intricate Brain/Maze SVG)
    if (heroPathRef.current) {
      const length = heroPathRef.current.getTotalLength();
      gsap.set(heroPathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.to(heroPathRef.current, {
        strokeDashoffset: 0,
        duration: 4,
        ease: "power3.inOut",
        delay: 0.2,
      });
    }

    // Typewriter effect for eyebrow
    if (eyebrowRef.current) {
      gsap.to(eyebrowRef.current, {
        text: "> ACCESSING ACTION RESEARCH JOURNAL...",
        duration: 2.5,
        ease: "none",
        delay: 0.5,
      });
    }

    // 2. HUD Contagion Drain Linked to Scroll
    if (containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          // Drain from 100 to 15
          const level = Math.max(15, Math.floor(100 - progress * 85));
          setHudLevel(level);
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const hudColorClass =
    hudLevel < 40
      ? "text-[#D62828] animate-[pulse_1s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(214,40,40,0.8)]"
      : "text-[#84A59D]";
  const hudBgColor = hudLevel < 40 ? "#D62828" : "#84A59D";

  return (
    <ReactLenis root>
      <GlitchClick />
      <div
        ref={containerRef}
        className="min-h-screen relative text-chalk bg-blueprint select-none"
      >
        {/* GLOBAL INTERACTION: The Dual-Metrics HUD */}
        <div
          className={`fixed top-8 left-8 z-50 font-mono text-sm tracking-widest flex flex-col gap-3 transition-colors duration-500 ${hudColorClass}`}
        >
          <div className="flex items-center justify-start gap-3">
            <span className="font-bold drop-shadow-sm">
              [PHYSICAL: {hudLevel}%]
            </span>
            <div className="w-40 h-[4px] bg-chalk/10 relative overflow-hidden border border-[#84A59D]/20">
              <div
                className="absolute top-0 left-0 h-full hud-contagion"
                style={{ width: `${hudLevel}%`, backgroundColor: hudBgColor }}
              />
            </div>
          </div>
          <div className="flex items-center justify-start gap-3">
            <span className="font-bold drop-shadow-sm">
              [MENTAL: {hudLevel}%]
            </span>
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
            <svg
              viewBox="0 0 1000 800"
              fill="none"
              className="w-[90vw] max-w-[1000px] h-auto"
            >
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
            <p
              ref={eyebrowRef}
              className="font-mono text-sage mb-8 tracking-[0.2em] text-sm md:text-lg min-h-[1.5rem]"
            ></p>
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
                <div className="text-xs font-mono text-chalk/50 mb-4 tracking-widest">
                  [OBJECTIVES]
                </div>
                <p className="rules-text text-2xl md:text-3xl font-medium text-chalk leading-snug">
                  "Objectives: Mengumpulkan data riset di Book Journal dan
                  bertahan hidup hingga sidang skripsi (Hari ke-30) dengan
                  menyeimbangkan intervensi NPC dan self-care."{" "}
                  <span className="text-sage text-sm">[cite: 50]</span>
                </p>
                {/* Glowing aesthetic corner */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 border border-white/10 rounded-full group-hover:scale-110 group-hover:border-white/30 transition-transform duration-700"></div>
              </div>

              <div className="border border-white/20 bg-blueprint/80 p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:border-white/50 group">
                <div className="text-xs font-mono text-chalk/50 mb-4 tracking-widest">
                  [GAMEPLAY LOOP]
                </div>
                <p className="rules-text text-lg md:text-xl text-chalk/90 leading-relaxed italic border-l-[3px] border-sage pl-4 group-hover:border-warning transition-colors">
                  "Gameplay Loop: Keluar dari Safe Zone -&gt; Eksplorasi kampus
                  -&gt; Dialog Active Listening -&gt; Puzzle Alterworld -&gt;
                  Self-care."
                </p>
              </div>

              <div className="border border-white/20 bg-blueprint/80 p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:border-white/50 lg:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-warning/50 to-transparent"></div>
                <div className="text-xs font-mono text-chalk/50 mb-4 tracking-widest">
                  [APPROVAL RULE]
                </div>
                <p className="rules-text text-xl md:text-2xl text-chalk leading-relaxed">
                  "Active Listening: Respons salah mengunci Alterworld (Approval
                  Rule)."
                  <br />
                  <br />
                  "Jika gagal meraih kepercayaan NPC, cari target di fakultas
                  lain (Cross-Faculty Rule)."{" "}
                  <span className="text-sage text-sm">[cite: 52]</span>
                </p>
              </div>

              <div className="border border-white/20 bg-blueprint/80 p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:border-white/50 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blueprint/20 via-blueprint to-blueprint">
                <div className="text-xs font-mono text-chalk/50 mb-4 tracking-widest">
                  [PROGRESSION]
                </div>
                <p className="rules-text text-lg md:text-xl text-chalk/80 leading-relaxed">
                  "Book Journal Progression: Tidak ada EXP."{" "}
                  <span className="text-sage text-xs">[cite: 31]</span>
                  <br />
                  <br />
                  "Progres, data riset, dan ending cerita ditentukan oleh
                  seberapa lengkap Book Journal terisi."{" "}
                  <span className="text-sage text-xs">[cite: 31]</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <Scene3 />

        {/* SCENE 4: GAMEWORLD & SEVERITY LEVELS */}
        <Scene4 />

        {/* SCENE 5: ENTITIES & THE MYSTERY OUTRO */}
        <Scene5 />
      </div>
    </ReactLenis>
  );
}
