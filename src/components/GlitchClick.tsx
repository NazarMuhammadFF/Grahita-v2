"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function GlitchClick() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const colors = ["#84A59D", "#D62828", "#FFFFFF", "#0B132B"]; // Sage, Warning, Chalk, Blueprint

      // Create 8-12 particles per click
      const particleCount = Math.floor(Math.random() * 5) + 8;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        const size = Math.random() * 6 + 2;

        // Randomly make some particles long like glitch bars
        const isGlitchBar = Math.random() < 0.3;

        particle.style.position = "fixed";
        particle.style.left = `${clientX}px`;
        particle.style.top = `${clientY}px`;
        particle.style.width = isGlitchBar ? `${size * 4}px` : `${size}px`;
        particle.style.height = isGlitchBar ? `${size / 2}px` : `${size}px`;
        particle.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "9999";

        // Add a slight CSS glitch effect to the particle itself
        particle.style.mixBlendMode =
          Math.random() > 0.5 ? "difference" : "normal";

        document.body.appendChild(particle);

        const dx = (Math.random() - 0.5) * 150;
        const dy = (Math.random() - 0.5) * 150;

        gsap.to(particle, {
          x: dx,
          y: dy,
          rotation: Math.random() * 180 * (Math.random() > 0.5 ? 1 : -1),
          opacity: 0,
          scale: 0,
          duration: 0.3 + Math.random() * 0.4,
          ease: "expo.out",
          onComplete: () => {
            particle.remove();
          },
        });
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return null;
}
