"use client";

import { useState, useEffect } from 'react';
import { Atom, FlaskConical, Beaker, Orbit, Lightbulb, BrainCircuit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

interface CelebrationClientProps {
  easterEggs: string[];
}

const icons = [
  { Icon: Atom, color: 'text-accent' },
  { Icon: FlaskConical, color: 'text-primary' },
  { Icon: Beaker, color: 'text-yellow-500' },
  { Icon: Orbit, color: 'text-green-500' },
  { Icon: Lightbulb, color: 'text-orange-500' },
  { Icon: BrainCircuit, color: 'text-indigo-500' },
];

const positions = [
  { top: '15%', left: '10%' },
  { top: '25%', left: '85%' },
  { top: '70%', left: '20%' },
  { top: '80%', left: '90%' },
  { top: '40%', left: '5%' },
  { top: '50%', left: '95%' },
];

const CelebrationClient = ({ easterEggs }: CelebrationClientProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
          Loading Celebration...
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-md">
          Happy Teacher's Day!
        </h1>
        <h2 className="text-2xl md:text-4xl font-headline text-foreground/80">
          To Our Esteemed Physics Teacher, Pallab Mukherjee
        </h2>
        <p className="max-w-2xl mx-auto text-foreground/70">
          Thank you for igniting our curiosity and illuminating the universe for us.
          Click on the floating icons to find some hidden surprises!
        </p>
      </div>

      {easterEggs.map((egg, index) => {
        const { Icon, color } = icons[index % icons.length];
        const pos = positions[index % positions.length];
        const animationDelay = `${Math.random() * 2}s`;
        const animationDuration = `${Math.random() * 3 + 4}s`;

        return (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <button
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 focus:outline-none"
                style={{
                  top: pos.top,
                  left: pos.left,
                  animation: `float ${animationDuration} ease-in-out infinite, glow 3s ease-in-out infinite`,
                  animationDelay,
                }}
                aria-label="Discover a secret"
              >
                <Icon className={cn("w-8 h-8 md:w-10 md:h-10", color)} />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>A Little Physics Fun!</DialogTitle>
                <DialogDescription className="pt-4 text-base">
                  {egg}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      })}
    </>
  );
};

export default CelebrationClient;
