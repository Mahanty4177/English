"use client";

import { useState, useEffect } from "react";

const EQUATIONS = ["E = mc²", "F = ma", "λ = h/p", "PV = nRT", "∇⋅E = ρ/ε₀", "c = 299,792,458"];
const PARTICLE_COUNT = 30;
const EQUATION_COUNT = 15;

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
            animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite, glow ${Math.random() * 4 + 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
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
            fontSize: `${Math.random() * 0.5 + 0.75}rem`,
            animation: `fall ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 15}s`,
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
              className="absolute rounded-full bg-accent"
              style={el.style}
            />
          );
        }
        return (
          <div
            key={el.id}
            className="absolute text-primary/50"
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
