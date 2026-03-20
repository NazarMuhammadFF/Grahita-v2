"use client";

import React, { useRef, useState, useEffect } from "react";
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
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [linkPos, setLinkPos] = useState({ x: 0, y: 0 });
  const [isHoveringScene, setIsHoveringScene] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const updatePositions = (e?: MouseEvent) => {
      if (!isHoveringScene || !linkRef.current) return;
      const rect = linkRef.current.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;

      setLinkPos({ x: targetX, y: targetY });

      if (e) {
        const mx = e.clientX;
        const my = e.clientY;
        setMousePos({ x: mx, y: my });

        // Calculate angle from mouse to target
        const dx = targetX - mx;
        const dy = targetY - my;
        const rad = Math.atan2(dy, dx);
        setAngle((rad * 180) / Math.PI);
      }
    };

    const handleMouseMove = (e: MouseEvent) => updatePositions(e);
    const handleScroll = () => updatePositions();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHoveringScene]);

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
      onMouseEnter={() => setIsHoveringScene(true)}
      onMouseLeave={() => setIsHoveringScene(false)}
      className="min-h-screen w-full relative flex flex-col justify-between p-10 md:p-24 border-t border-white/10"
      style={{
        background: "linear-gradient(to bottom, #0B132B 0%, #000000 100%)",
      }}
    >
      {isHoveringScene && (
        <div
          className="fixed pointer-events-none z-[40]"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: `rotate(${angle}deg)`,
            transformOrigin: "0 0",
          }}
        >
          {/* Arrow pointing towards target, slightly offset from cursor center */}
          <div className="animate-bounceX">
            <svg
              width="40"
              height="20"
              viewBox="0 0 40 20"
              fill="none"
              style={{ marginLeft: "30px" }}
              className="drop-shadow-[0_0_5px_rgba(214,40,40,0.5)]"
            >
              <path
                d="M2 10H38M38 10L28 2M38 10L28 18"
                stroke="#D62828"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}

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
      <a
        ref={linkRef}
        href="https://granita-v3.vercel.app"
        rel="noopener noreferrer"
        onMouseEnter={onArgHoverEnter}
        onMouseLeave={onArgHoverLeave}
        className="arg-link absolute bottom-10 right-10 md:right-24 font-mono text-xs md:text-sm tracking-[0.3em] text-[#D62828] opacity-30 uppercase cursor-pointer z-50"
      >
        [ SYSTEM FATAL ERROR: MISSING_BUSINESS_PITCH ]
      </a>
    </section>
  );
}
