"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const entities = [
  "[01] Karakter Utama (MC) - Researcher",
  "[02] Key NPC (Dosen) - The Evaluator",
  "[03] Target NPC - 15 Mahasiswa Krisis",
  "[04] Background NPC - Campus Crowd",
  "[05] Alterworld Hazards - Rintangan Pikiran",
];

export default function Scene5() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Top Section: Terminal printing effect
      if (terminalRef.current) {
        const lines = gsap.utils.toArray(".terminal-line");
        gsap.fromTo(
          lines,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.3,
            duration: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: terminalRef.current,
              start: "top 75%", // triggers when terminal is 25% from bottom of viewport
            },
          },
        );
      }
    },
    { scope: containerRef },
  );

  const { contextSafe } = useGSAP({ scope: containerRef });

  const onArgHoverEnter = contextSafe(() => {
    // Violent glitch & decode
    const tl = gsap.timeline();

    tl.to(".arg-link", {
      duration: 0.1,
      opacity: "random(0.5, 1)", // Let GSAP handle the randomization safely entirely
      skewX: 10,
      x: "random(-5, 5)",
      repeat: 3,
      yoyo: true,
      ease: "none",
    }).to(".arg-link", {
      skewX: 0,
      x: 0,
      opacity: 1,
      color: "#84A59D",
      text: "[ EXECUTE FOLDER: THE_PITCH.sys ]", // standard TextPlugin, fallback to clean type reveal
      className:
        "arg-link absolute bottom-10 right-10 md:right-24 font-mono text-xs md:text-sm tracking-widest uppercase cursor-pointer z-50 transition-all drop-shadow-[0_0_12px_rgba(132,165,157,1)]",
      duration: 0.4,
    });
  });

  const onArgHoverLeave = contextSafe(() => {
    gsap.killTweensOf(".arg-link");
    gsap.to(".arg-link", {
      duration: 0.4,
      color: "#D62828",
      opacity: 0.3,
      text: "[ SYSTEM FATAL ERROR: MISSING_BUSINESS_PITCH ]",
      className:
        "arg-link absolute bottom-10 right-10 md:right-24 font-mono text-xs md:text-sm tracking-[0.3em] text-[#D62828] opacity-30 uppercase cursor-pointer z-50",
    });
  });

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full relative flex flex-col justify-between p-10 md:p-24 border-t border-white/10"
      style={{
        background: "linear-gradient(to bottom, #0B132B 0%, #000000 100%)",
      }}
    >
      {/* Top Section: Terminal Readout */}
      <div
        ref={terminalRef}
        className="font-mono max-w-4xl border border-white/10 bg-[#0B132B]/50 p-8 shadow-2xl relative z-10 backdrop-blur-sm"
      >
        <h2 className="text-[#84A59D] text-lg md:text-2xl mb-8 flex border-b border-[#84A59D]/30 pb-4">
          &gt;_ QUERY DATABASE: ACTIVE_ENTITIES
          <span className="w-4 h-6 bg-[#84A59D] ml-2 animate-[pulse_1s_step-end_infinite]"></span>
        </h2>

        <div className="space-y-4 text-chalk/90 text-sm md:text-base tracking-wider">
          {entities.map((entity, idx) => (
            <div
              key={idx}
              className="terminal-line opacity-0 relative pl-4 border-l-2 border-transparent hover:border-[#84A59D] transition-colors"
            >
              {entity}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: The Anomaly / ARG Link */}
      <Link
        href="#"
        onMouseEnter={onArgHoverEnter}
        onMouseLeave={onArgHoverLeave}
        className="arg-link absolute bottom-10 right-10 md:right-24 font-mono text-xs md:text-sm tracking-[0.3em] text-[#D62828] opacity-30 uppercase cursor-pointer z-50"
      >
        [ SYSTEM FATAL ERROR: MISSING_BUSINESS_PITCH ]
      </Link>
    </section>
  );
}
