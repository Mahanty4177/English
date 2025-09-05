
"use client";

import { useState, useRef, useEffect } from "react";
import type { ElementRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Repeat,
  Square,
  Music2,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  src: string;
}

const MusicPlayer = ({ src }: MusicPlayerProps) => {
  const audioRef = useRef<ElementRef<"audio">>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isLooping, setIsLooping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      if (!isLooping) {
        setIsPlaying(false);
      }
    };
    
    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isLooping]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  useEffect(() => {
    if (audioRef.current) {
      if(isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const stopPlayback = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };
  
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  if (!isMounted) return null;

  return (
    <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-full p-2 shadow-lg">
          <div className="flex items-center gap-4 px-4 text-white">
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </button>
             <button onClick={stopPlayback} className="p-2 rounded-full hover:bg-white/10 transition" title="Stop">
                <Square className="w-5 h-5 fill-current" />
            </button>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-amber-400 to-pink-400 flex items-center justify-center text-black">
                        <Music2 className="w-6 h-6"/>
                    </div>
                    <div className="truncate">
                        <div className="text-sm font-semibold">Tribute Music</div>
                        <div className="text-xs text-gray-300">A special track for Sir</div>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex flex-1 items-center gap-3">
                <span className="text-xs w-9 text-center font-mono text-gray-400">{formatTime(progress)}</span>
                <Slider
                    value={[progress]}
                    max={duration || 100}
                    step={1}
                    onValueChange={handleProgressChange}
                    className="flex-1 [&>span>span]:bg-primary [&>span]:bg-white/20"
                />
                <span className="text-xs w-9 text-center font-mono text-gray-400">{formatTime(duration)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={() => setVolume((v) => (v > 0 ? 0 : 0.75))} className="p-2 rounded-full hover:bg-white/10 transition">
                <VolumeIcon className="w-5 h-5" />
              </button>
              <Slider
                value={[volume]}
                max={1}
                step={0.05}
                onValueChange={handleVolumeChange}
                className="w-24 hidden md:block"
              />
              <button
                onClick={() => setIsLooping(!isLooping)}
                className={cn(
                  "p-2 rounded-full hover:bg-white/10 transition",
                  isLooping && "bg-amber-400/20 text-amber-300"
                )}
                title="Loop"
              >
                <Repeat className="w-5 h-5" />
              </button>
            </div>
          </div>
      </div>
    </footer>
  );
};

export default MusicPlayer;
