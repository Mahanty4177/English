"use client";

import { useState, useEffect } from "react";

const EQUATIONS = ["E = mc²", "F = ma", "λ = h/p", "PV = nRT", "∇⋅E = ρ/ε₀", "c = 299,792,458"];
const PARTICLE_COUNT = 50; // Increased particle count
const EQUATION_COUNT = 10; // Decreased equation count for subtlety

interface Element {
  id: number;
  type: "particle" | "equation";
  content?: string;
  style: React.CSSProperties;
}

const PhysicsBackground = () => {
  const [elements, setElements] = useState<Element[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: Element[] = [];

      // Generate particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        newElements.push({
          id: i,
          type: "particle",
          style: {
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animation: `float ${Math.random() * 12 + 8}s ease-in-out infinite, glow ${Math.random() * 5 + 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
          },
        });
      }

      // Generate equations
      for (let i = 0; i < EQUATION_COUNT; i++) {
        newElements.push({
          id: PARTICLE_COUNT + i,
          type: "equation",
          content: EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)],
          style: {
            left: `${Math.random() * 100}vw`,
            fontSize: `${Math.random() * 0.4 + 0.65}rem`, // Made smaller
            animation: `fall ${Math.random() * 15 + 15}s linear infinite`,
            animationDelay: `${Math.random() * 20}s`,
            opacity: 0.5, // Made more subtle
          },
        });
      }

      setElements(newElements);
    };

    generateElements();
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {elements.map((el) => {
        if (el.type === "particle") {
          return (
            <div
              key={el.id}
              className="absolute rounded-full bg-accent/70" // More subtle
              style={el.style}
            />
          );
        }
        return (
          <div
            key={el.id}
            className="absolute text-primary/30" // More subtle
            style={el.style}
          >
            {el.content}
          </div>
        );
      })}
    </div>
  );
};

export default PhysicsBackground;
