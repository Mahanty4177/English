import { generatePhysicsEasterEggs } from '@/ai/flows/generate-physics-easter-eggs';
import PhysicsBackground from '@/components/PhysicsBackground';
import CelebrationClient from '@/components/CelebrationClient';
import MusicPlayer from '@/components/MusicPlayer';

export default async function Home() {
  const easterEggData = await generatePhysicsEasterEggs({ numberOfEasterEggs: 6 });

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <PhysicsBackground />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <CelebrationClient easterEggs={easterEggData.easterEggs} />
      </main>
      <MusicPlayer src="/background-music.mp3" />
    </div>
  );
}
