"use client";

import { useEffect } from 'react';

// Attaches event listeners for animations like confetti and fireworks.
export default function ScriptHelpers() {
  useEffect(() => {
    function confettiBurst() {
      const el = document.createElement("div");
      el.className = "pointer-events-none fixed inset-0 z-50";
      document.body.appendChild(el);
      
      for (let i = 0; i < 40; i++) {
        const dot = document.createElement("div");
        dot.style.position = "absolute";
        dot.style.left = `${window.innerWidth / 2}px`;
        dot.style.top = "120px";
        dot.style.width = `${Math.random() * 8 + 6}px`;
        dot.style.height = dot.style.width;
        dot.style.borderRadius = "50%";
        dot.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
        el.appendChild(dot);
        
        const dx = Math.cos((i / 40) * Math.PI * 2) * (40 + Math.random() * 80);
        const dy = Math.sin((i / 40) * Math.PI * 2) * (40 + Math.random() * 80) - 20;

        dot.animate(
          [{ transform: `translate(0,0)`, opacity: 1 }, { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }],
          { duration: 800 + Math.random() * 500, easing: 'cubic-bezier(.2,.8,.2,1)' }
        );
        setTimeout(() => dot.remove(), 1200);
      }
      setTimeout(() => el.remove(), 1600);
    }

    function fireworks() {
      confettiBurst();
      setTimeout(confettiBurst, 250);
      setTimeout(confettiBurst, 520);
    }

    window.addEventListener("confetti-burst", confettiBurst);
    window.addEventListener("fireworks", fireworks);

    return () => {
      window.removeEventListener("confetti-burst", confettiBurst);
      window.removeEventListener("fireworks", fireworks);
    };
  }, []);

  return null;
}
