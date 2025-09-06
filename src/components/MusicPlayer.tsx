
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
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      if (audio.duration !== Infinity && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const setAudioTime = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      if (!isLooping) {
        setIsPlaying(false);
        setProgress(0);
      } else {
        audio.currentTime = 0;
        audio.play();
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
  }, [isLooping, isMounted]);

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
    const audio = audioRef.current;
    if (audio) {
      if(isPlaying) {
        audio.play().catch(e => {
          console.error("Playback failed:", e)
          setIsPlaying(false);
        });
      } else {
        audio.pause();
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

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
  };

  const handleProgressChange = (newProgress: number[]) => {
    if (audioRef.current) {
      const newTime = newProgress[0];
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };
  
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  if (!isMounted) return null;

  return (
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg sm:bottom-6 sm:w-[92%] sm:max-w-3xl">
      <audio ref={audioRef} src={src} preload="metadata"/>
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-full p-2 shadow-lg">
          <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 text-white">
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </button>
             <button onClick={stopPlayback} className="hidden sm:block p-2 rounded-full hover:bg-white/10 transition" title="Stop">
                <Square className="w-5 h-5 fill-current" />
            </button>
            <div className="flex-1 flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-amber-400 to-pink-400 flex items-center justify-center text-black shrink-0">
                        <Music2 className="w-5 h-5 sm:w-6 sm:h-6"/>
                    </div>
                    <div className="truncate hidden sm:block">
                        <div className="text-sm font-semibold">Tribute Music</div>
                        <div className="text-xs text-gray-300">A special track for Sir</div>
                    </div>
                </div>

                <div className="flex-1 items-center gap-2 sm:gap-3 hidden sm:flex">
                    <span className="text-xs w-9 text-center font-mono text-gray-400">{formatTime(progress)}</span>
                    {isMounted && (
                     <Slider
                        min={0}
                        max={duration || 100}
                        value={[progress]}
                        onValueChange={handleProgressChange}
                        className="w-full"
                    />
                    )}
                    <span className="text-xs w-9 text-center font-mono text-gray-400">{formatTime(duration)}</span>
                </div>
            </div>
            
            <div className="hidden items-center gap-1 sm:gap-2 md:flex">
              <button onClick={() => setVolume((v) => (v > 0 ? 0 : 0.75))} className="p-2 rounded-full hover:bg-white/10 transition">
                <VolumeIcon className="w-5 h-5" />
              </button>
              {isMounted && (
              <Slider
                  min={0}
                  max={1}
                  step={0.05}
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  className="w-20 sm:w-24"
              />
              )}
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
    

    

