
"use client";

import { useState, useEffect } from 'react';
import { generateEnglishEasterEggs } from '@/ai/flows/generate-english-easter-eggs';
import PhysicsBackground from '@/components/PhysicsBackground';
import CelebrationClient from '@/components/CelebrationClient';
import MusicPlayer from '@/components/MusicPlayer';
import type { GenerateEnglishEasterEggsOutput } from '@/ai/flows/generate-english-easter-eggs';
import { Loader } from 'lucide-react';
import ScriptHelpers from '@/components/ScriptHelpers';
import WordCircleGame from '@/components/WordCircleGame';

export default function Home() {
  const [easterEggData, setEasterEggData] = useState<GenerateEnglishEasterEggsOutput>({ easterEggs: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchEasterEggs = async () => {
      try {
        const data = await generateEnglishEasterEggs({ numberOfEasterEggs: 6 });
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
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {isClient && <PhysicsBackground />}
      <main className="relative z-10 flex flex-col items-center min-h-screen p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4 text-center h-screen">
            <Loader className="w-12 h-12 animate-spin text-primary" />
            <h1 className="text-2xl font-headline text-primary tracking-tight">
              Preparing Your Surprise...
            </h1>
          </div>
        ) : (
          <>
            <CelebrationClient easterEggs={easterEggData.easterEggs} />
            <WordCircleGame />
          </>
        )}
      </main>
      {isClient && <MusicPlayer src="/Physics Ki Duniya.mp3" />}
      {isClient && <ScriptHelpers />}
    </div>
  );
}
