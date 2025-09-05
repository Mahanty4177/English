"use client";

import { useState, useEffect } from 'react';
import { Atom, FlaskConical, Beaker, Orbit, Lightbulb, BrainCircuit, Gift } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CelebrationClientProps {
  easterEggs: string[];
}

const icons = [
  { Icon: Atom, color: 'text-accent' },
  { Icon: FlaskConical, color: 'text-primary' },
  { Icon: Gift, color: 'text-pink-500' },
  { Icon: Orbit, color: 'text-green-500' },
  { Icon: Lightbulb, color: 'text-orange-500' },
  { Icon: BrainCircuit, color: 'text-indigo-500' },
];

const positions = [
  { top: '20%', left: '15%' },
  { top: '30%', left: '80%' },
  { top: '65%', left: '10%' },
  { top: '75%', left: '90%' },
  { top: '45%', left: '5%' },
  { top: '55%', left: '95%' },
];

const CelebrationClient = ({ easterEggs }: CelebrationClientProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center space-y-6 animate-fade-in-up mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-headline bg-gradient-to-r from-primary via-accent to-pink-500 bg-clip-text text-transparent drop-shadow-md">
          Happy Teacher's Day, Pallab Sir! ✨
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-foreground/80">
          This small website is my way of saying thank you on this special day.
        </p>
      </div>
      
      <div className="relative bg-card/50 backdrop-blur-sm border rounded-xl p-8 md:p-12 shadow-lg animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="space-y-4 text-center">
            <h2 className="text-2xl md:text-3xl font-headline text-primary">
              A Personal Tribute
            </h2>
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
              Sir, you have made physics come alive for me. Your guidance and support inspire me every day. Thank you for igniting my curiosity and illuminating the universe to me. Click on the floating icons to find some hidden surprises!
            </p>
          </div>
      </div>


      {easterEggs.map((egg, index) => {
        const { Icon, color } = icons[index % icons.length];
        const pos = positions[index % positions.length];
        const animationDelay = `${Math.random() * 2 + 0.5}s`;
        const animationDuration = `${Math.random() * 3 + 5}s`;

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
            <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-md">
              <DialogHeader>
                <DialogTitle className="text-primary font-headline">A Little Physics Fun!</DialogTitle>
                <DialogDescription className="pt-4 text-base text-foreground/80">
                  {egg}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      })}
       <div className="text-center mt-16 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <p className="text-lg text-foreground/80">
            Wishing you a very Happy Teacher’s Day!
          </p>
        </div>
    </div>
  );
};

export default CelebrationClient;
