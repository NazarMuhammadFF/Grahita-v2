"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function GlitchClick() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const colors = ["#84A59D", "#D62828", "#FFFFFF", "#0B132B"]; // Sage, Warning, Chalk, Blueprint

      // Increased particle count for a wider effect
      const particleCount = Math.floor(Math.random() * 10) + 20;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        const size = Math.random() * 10 + 2;

        // Randomly make some particles long like glitch bars
        const isGlitchBar = Math.random() < 0.4;

        particle.style.position = "fixed";
        particle.style.left = `${clientX}px`;
        particle.style.top = `${clientY}px`;
        particle.style.width = isGlitchBar ? `${size * 6}px` : `${size}px`;
        particle.style.height = isGlitchBar ? `${size / 3}px` : `${size}px`;
        particle.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "9999";

        // Add a slight CSS glitch effect to the particle itself
        particle.style.mixBlendMode =
          Math.random() > 0.5 ? "difference" : "normal";

        document.body.appendChild(particle);

        // Increased radius of travel (dx/dy)
        const dx = (Math.random() - 0.5) * 400;
        const dy = (Math.random() - 0.5) * 400;

        gsap.to(particle, {
          x: dx,
          y: dy,
          rotation: Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1),
          opacity: 0,
          scale: 0,
          duration: 0.5 + Math.random() * 0.5,
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
