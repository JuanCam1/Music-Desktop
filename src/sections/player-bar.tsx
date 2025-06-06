import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  Heart,
  Music2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { type FC, useEffect, useRef, useState } from "react";

interface Props {
  currentSong: SongModel | null;
  isPlaying: boolean;
  volume: number;
  onTogglePlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onVolumeChange: (volume: number) => void;
}
const PlayerBar: FC<Props> = ({
  currentSong,
  isPlaying,
  onNext,
  onPrevious,
  onTogglePlayPause,
  onVolumeChange,
  volume,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (currentSong) {
      setCurrentTime(0);
      setDuration(currentSong.duration);
    }
  }, [currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || currentSong?.duration || 0);
    }
  };

  const handleSeek = (values: number[]) => {
    if (audioRef.current && values.length) {
      const newTime = (values[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!currentSong) {
    return (
      <div className="h-20 bg-card border-t flex items-center justify-center text-muted-foreground">
        <Music2 className="mr-2 h-5 w-5" />
        <span>Selecciona una canción para comenzar a escuchar</span>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-card border-t px-4 flex items-center z-50">
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Song info */}
      <div className="flex items-center w-1/4 min-w-[180px]">
        <div className="relative h-14 w-14 mr-3 flex-shrink-0">
          <img
            src={currentSong.coverUrl || "/placeholder.svg"}
            alt={currentSong.title}
            className="object-cover rounded"
          />
        </div>
        <div className="truncate">
          <p className="font-medium text-sm truncate">{currentSong.title}</p>
          <p className="text-xs text-muted-foreground truncate">
            {currentSong.artist}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 text-muted-foreground hover:text-primary"
          onClick={() => setLiked(!liked)}
        >
          <Heart
            className={cn("h-5 w-5", liked && "fill-primary text-primary")}
          />
        </Button>
      </div>

      {/* Player controls */}
      <div className="flex flex-col items-center justify-center flex-1 max-w-2xl mx-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onPrevious}>
            <SkipBack className="h-5 w-5" fill="currentColor" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={onTogglePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" fill="currentColor" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext}>
            <SkipForward className="h-5 w-5" fill="currentColor" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Repeat className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center w-full gap-2">
          <span className="text-xs text-muted-foreground w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <span className="text-xs text-muted-foreground w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume control */}
      <div className="flex items-center justify-end w-1/4 min-w-[120px]">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={toggleMute}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume * 100]}
          onValueChange={(values) => onVolumeChange(values[0] / 100)}
          className="w-24 cursor-pointer"
        />
      </div>
    </div>
  );
};
export default PlayerBar;
