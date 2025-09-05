
"use client";

import { useState, useEffect } from 'react';
import { generatePhysicsEasterEggs } from '@/ai/flows/generate-physics-easter-eggs';
import PhysicsBackground from '@/components/PhysicsBackground';
import CelebrationClient from '@/components/CelebrationClient';
import MusicPlayer from '@/components/MusicPlayer';
import type { GeneratePhysicsEasterEggsOutput } from '@/ai/flows/generate-physics-easter-eggs';
import { Loader } from 'lucide-react';

export default function Home() {
  const [easterEggData, setEasterEggData] = useState<GeneratePhysicsEasterEggsOutput>({ easterEggs: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchEasterEggs = async () => {
      try {
        const data = await generatePhysicsEasterEggs({ numberOfEasterEggs: 6 });
        setEasterEggData(data);
      } catch (error) {
        console.error("Failed to fetch easter eggs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEasterEggs();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {isClient && <PhysicsBackground />}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Loader className="w-12 h-12 animate-spin text-primary" />
            <h1 className="text-2xl font-headline text-primary tracking-tight">
              Preparing Your Surprise...
            </h1>
          </div>
        ) : (
          <CelebrationClient easterEggs={easterEggData.easterEggs} />
        )}
      </main>
      {isClient && <MusicPlayer src="/background-music.mp3" />}
    </div>
  );
}
