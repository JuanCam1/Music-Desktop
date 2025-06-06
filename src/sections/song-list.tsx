import { cn } from "@/lib/utils";
import { Clock, Play } from "lucide-react";
import { type FC, useState } from "react";

interface Props {
  songs: SongModel[];
  onSongSelect: (song: SongModel) => void;
  currentSong: SongModel | null;
}

const SongList: FC<Props> = ({ songs, currentSong, onSongSelect }) => {
  const [hoveredSongId, setHoveredSongId] = useState<string | null>(null);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden">
      <div className="grid grid-cols-[16px_4fr_3fr_1fr] md:grid-cols-[16px_6fr_4fr_3fr_1fr] gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b">
        <div className="text-center dark:text-white">#</div>
        <div className="dark:text-white">Título</div>
        <div className="hidden md:block dark:text-white">Álbum</div>
        <div className="dark:text-white">Artista</div>
        <div className="flex justify-center">
          <Clock className="h-4 w-4" color="white" />
        </div>
      </div>

      <div className="divide-y divide-border">
        {songs.map((song, index) => {
          const isCurrentSong = currentSong?.id === song.id;
          const isHovered = hoveredSongId === song.id;

          return (
            <div
              key={song.id}
              className={cn(
                "grid grid-cols-[16px_4fr_3fr_1fr] md:grid-cols-[16px_6fr_4fr_3fr_1fr] gap-4 px-4 py-2 items-center hover:bg-accent/50 cursor-pointer",
                isCurrentSong && "bg-accent/30",
              )}
              onClick={() => onSongSelect(song)}
              onMouseEnter={() => setHoveredSongId(song.id)}
              onMouseLeave={() => setHoveredSongId(null)}
            >
              <div className="flex items-center justify-center w-4 h-4">
                {isHovered ? (
                  <Play
                    className="h-3 w-3 dark:text-purple-500"
                    fill="currentColor"
                  />
                ) : isCurrentSong ? (
                  <div className="h-3 w-3 rounded-sm dark:bg-purple-500"></div>
                ) : (
                  <span className="text-sm dark:text-zinc-400">
                    {index + 1}
                  </span>
                )}
              </div>

              <div className="flex items-center min-w-0">
                <p
                  className={cn(
                    "font-medium truncate dark:text-zinc-400",
                    isCurrentSong && "dark:text-purple-400",
                  )}
                >
                  {song.title}
                </p>
              </div>

              <div
                className={cn(
                  "font-medium truncate dark:text-zinc-400",
                  isCurrentSong && "dark:text-purple-400",
                )}
              >
                {song.album}
              </div>

              <div
                className={cn(
                  "font-medium truncate dark:text-zinc-400",
                  isCurrentSong && "dark:text-purple-400",
                )}
              >
                {song.artist}
              </div>

              <div
                className={cn(
                  "font-medium truncate text-center dark:text-zinc-400",
                  isCurrentSong && "dark:text-purple-400",
                )}
              >
                {formatDuration(song.duration)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SongList;
