"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Scene3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const squaresRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Right Column: Contagion Effect Data Drain Simulation pinned during scroll
      gsap.fromTo(
        ".health-square",
        { opacity: 1, backgroundColor: "#84A59D" },
        {
          opacity: 0.2,
          backgroundColor: "#4B5563", // gray
          stagger: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%", // Scroll distance while pinned (1.5x screen height)
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center py-24 bg-[#0A1224] border-t border-chalk/10 z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-350 px-8 lg:px-24">
        {/* LEFT COLUMN: THE VISIBILITY PARADOX */}
        <div className="space-y-12">
          <h2 className="text-4xl md:text-6xl font-tactical text-sage drop-shadow-[0_0_8px_rgba(132,165,157,0.4)]">
            MODULE // 03: PARADOX
          </h2>
          <div className="space-y-6 border-l w-full max-w-2xl border-chalk/20 pl-8 relative">
            <div className="absolute -left-1.25 top-0 w-2.25 h-2.25 bg-sage"></div>
            <p className="rules-text text-2xl leading-relaxed text-chalk font-medium">
              &quot;Visibility Paradox: Semakin berat kondisi psikologis NPC,
              semakin &apos;normal&apos; terlihat Altered Map-nya (berbeda
              dengan masalah ringan yang distorsinya jelas).&quot;{" "}
              <span className="text-sage text-base">[cite: 28]</span>
            </p>
            <p className="rules-text text-xl leading-relaxed text-chalk/60 italic">
              &quot;Ini merepresentasikan realita bahwa depresi berat sering tak
              kasat mata.&quot;{" "}
              <span className="text-sage text-base">[cite: 29]</span>
            </p>
          </div>

          {/* Interactive SVG Group Container */}
          <div className="mt-16 group w-72 h-72 relative border border-white/20 bg-blueprint/40 hover:border-warning/30 transition-colors duration-500 hover:shadow-[0_0_20px_rgba(214,40,40,0.2)]">
            <div className="absolute -top-3 -right-3 bg-blueprint text-xs font-mono text-chalk px-2 border border-white/20">
              INTERACTIVE_COMPONENT
            </div>

            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-widest text-chalk/40 group-hover:opacity-0 transition-opacity">
              [ HOVER ]
            </div>

            <svg
              viewBox="0 0 100 100"
              className="w-full h-full p-4 overflow-visible"
              fill="none"
              strokeWidth="2"
            >
              {/* Perfect Smooth Outer Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-sage transition-all duration-700 ease-in-out group-hover:stroke-warning group-hover:opacity-30 group-hover:scale-[1.05] origin-center"
              />
              {/* Chaotic Inner Splinter */}
              <path
                d="M 50 15 L 60 35 L 85 40 L 65 55 L 75 80 L 50 65 L 25 80 L 35 55 L 15 40 L 40 35 Z M 50 30 L 45 45 L 30 50 L 45 55 L 50 70 L 55 55 L 70 50 L 55 45 Z"
                className="stroke-warning opacity-0 scale-50 origin-center transition-all duration-800 ease-out group-hover:opacity-100 group-hover:scale-100 drop-shadow-[0_0_8px_rgba(214,40,40,0.8)]"
              />
            </svg>
          </div>
        </div>

        {/* RIGHT COLUMN: THE CONTAGION EFFECT */}
        <div className="flex flex-col justify-center space-y-8 lg:pl-16">
          <div className="space-y-4">
            <h4 className="font-mono text-sm text-[#D62828] tracking-widest">
              [ WARNING: HAZARD PROTOCOL ]
            </h4>
            <h3 className="font-syne text-4xl md:text-5xl uppercase tracking-wide text-white drop-shadow-md pb-4 border-b border-white/20">
              The Contagion Effect
            </h3>
            <p className="font-mono text-chalk/80 text-lg leading-relaxed">
              Empati memiliki konsekuensi. Gagal menolong NPC menularkan efek
              psikologis yang merusak mental/fisik MC serta memberi debuff
              eksplorasi.
            </p>
          </div>

          <div
            ref={squaresRef}
            className="mt-8 flex gap-4 p-6 border border-white/20 bg-[#0B132B]/50 w-fit"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="health-square w-12 h-12 bg-[#84A59D] shadow-[0_0_10px_rgba(132,165,157,0.5)] border border-white/10"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
