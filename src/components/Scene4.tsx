"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  {
    level: "LEVEL A: ACADEMIC STRESS",
    desc: "Puzzle berbasis waktu/manajemen prioritas.",
    color: "#84A59D",
  },
  {
    level: "LEVEL B: BURNOUT",
    desc: "Manajemen stamina/objek berat.",
    color: "#98A389",
  },
  {
    level: "LEVEL C:SOCIAL ISOLATION",
    desc: "Labirin navigasi.",
    color: "#B88E6D",
  },
  {
    level: "LEVEL D: ANXIETY",
    desc: "Stealth dan mekanik grounding.",
    color: "#C65C47",
  },
  {
    level: "LEVEL E: CRITICAL DEPRESSION",
    desc: "Investigasi dengan deteksi anomali.",
    color: "#D62828",
    isGlitch: true,
  },
];

export default function Scene4() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Horizontal scroll logic: pin the outer wrapper, translate inner container
      gsap.to(innerRef.current, {
        xPercent: -83.3333, // 5 panels out of 6 will be scrolled
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () =>
            "+=" + (containerRef.current?.offsetWidth || window.innerWidth) * 5,
          anticipatePin: 1,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="h-screen w-full overflow-hidden relative bg-[#0B132B] border-t border-chalk/10"
    >
      <style>{`
        @keyframes scene4-severe-glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
        .animate-severe-glitch {
          animation: scene4-severe-glitch 0.15s infinite;
        }
      `}</style>

      {/* Inner Container holding 6 panels (100vw each = 600vw total) */}
      <div ref={innerRef} className="flex h-full w-[600vw] relative">
        {/* Continuous Horizontal SVG/Glowing Line across all panels */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/20 -translate-y-1/2 z-0 pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>

        {/* Panel 0: Intro */}
        <div className="w-screen h-screen flex flex-col justify-center items-center px-10 md:px-24 relative z-10 shrink-0">
          <div className="border border-white/20 bg-[#0B132B]/80 backdrop-blur-md p-10 max-w-3xl text-center shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <h2 className="font-syne text-4xl md:text-6xl text-white mb-6 tracking-wide drop-shadow-md">
              DUAL REALITY SYSTEM
            </h2>
            <p className="font-mono text-lg md:text-xl text-chalk/80 leading-relaxed max-w-2xl mx-auto">
              Dunia game menggunakan Dual Reality System: Overworld (kampus
              realistis) & Alterworld (dimensi pikiran NPC berbentuk ruang
              puzzle). Terdapat 5 fakultas dengan ±15 Alterworld yang
              disesuaikan dengan masalah psikologisnya:
            </p>
          </div>
        </div>

        {/* Panel 1 to 5: The Nodes */}
        {nodes.map((node, i) => (
          <div
            key={i}
            className="w-screen h-screen flex flex-col justify-center items-center px-10 md:px-24 relative z-10 shrink-0"
          >
            {/* Glowing Dot on the horizontal line */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-[3px] bg-[#0B132B] ${node.isGlitch ? "animate-[pulse_1s_ease-in-out_infinite]" : ""}`}
              style={{
                borderColor: node.color,
                boxShadow: `0 0 20px ${node.color}`,
              }}
            />

            {/* Layout for the Blueprint Card */}
            <div
              className={`mt-32 border bg-[#0B132B]/90 backdrop-blur p-8 w-80 md:w-96 text-center ${node.isGlitch ? "animate-severe-glitch" : ""}`}
              style={{
                borderColor: node.color,
                boxShadow: `0 0 30px ${node.color}40`, // 40 represents 25% opacity in hex
              }}
            >
              <div
                className="font-mono text-sm md:text-base tracking-widest mb-4 font-bold"
                style={{ color: node.color }}
              >
                [ {node.level} ]
              </div>
              <p className="text-chalk font-mono text-sm md:text-base leading-relaxed">
                {node.desc}
              </p>
            </div>

            {/* Faint connecting vertical line */}
            <div
              className="absolute top-1/2 left-1/2 border-l border-dashed w-px h-16 -translate-x-1/2 z-0 opacity-50"
              style={{ borderColor: node.color }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
