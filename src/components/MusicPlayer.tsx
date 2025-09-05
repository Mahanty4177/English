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
  Repeat1,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.error("Playback failed:", e));
    }
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
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-4 bg-card/80 backdrop-blur-sm border border-primary/20 shadow-lg rounded-full px-4 py-2 text-card-foreground">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={togglePlayPause}>
            {isPlaying ? <Pause className="w-5 h-5 text-primary" /> : <Play className="w-5 h-5 text-primary" />}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={stopPlayback}>
            <Square className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1 flex items-center gap-2">
            <span className="text-xs w-9 text-center font-mono">{formatTime(progress)}</span>
            <Slider
                value={[progress]}
                max={duration || 100}
                step={1}
                onValueChange={handleProgressChange}
                className="flex-1"
            />
            <span className="text-xs w-9 text-center font-mono">{formatTime(duration)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsLooping(!isLooping)}>
            {isLooping ? <Repeat1 className="w-5 h-5 text-primary" /> : <Repeat className="w-5 h-5" />}
          </Button>
          <div className="flex items-center gap-2 w-32 group">
             <VolumeIcon className="w-5 h-5" />
             <Slider
                value={[volume]}
                max={1}
                step={0.05}
                onValueChange={handleVolumeChange}
                className="w-24 opacity-0 group-hover:opacity-100 transition-opacity"
             />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MusicPlayer;
