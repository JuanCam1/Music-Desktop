import { useState } from "react";
import SongList from "./song-list";
import PlayerBar from "./player-bar";

const sampleSongs: SongModel[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200, // in seconds
    coverUrl: "/placeholder.svg?height=300&width=300&text=Blinding+Lights",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Dance Monkey",
    artist: "Tones and I",
    album: "The Kids Are Coming",
    duration: 210,
    coverUrl: "/placeholder.svg?height=300&width=300&text=Dance+Monkey",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "Don't Start Now",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 183,
    coverUrl: "/placeholder.svg?height=300&width=300&text=Don't+Start+Now",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "4",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: 174,
    coverUrl: "/placeholder.svg?height=300&width=300&text=Watermelon+Sugar",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "5",
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    duration: 194,
    coverUrl: "/placeholder.svg?height=300&width=300&text=Bad+Guy",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: "6",
    title: "Circles",
    artist: "Post Malone",
    album: "Hollywood's Bleeding",
    duration: 215,
    coverUrl: "/placeholder.svg?height=300&width=300&text=Circles",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    id: "7",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    album: "Divinely Uninspired to a Hellish Extent",
    duration: 182,
    coverUrl: "/placeholder.svg?height=300&width=300&text=Someone+You+Loved",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    id: "8",
    title: "Memories",
    artist: "Maroon 5",
    album: "Memories",
    duration: 189,
    coverUrl: "/placeholder.svg?height=300&width=300&text=Memories",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
];
const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState<SongModel | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const playSong = (song: SongModel) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    if (!currentSong) return;

    const currentIndex = sampleSongs.findIndex(
      (song) => song.id === currentSong.id,
    );
    const nextIndex = (currentIndex + 1) % sampleSongs.length;
    setCurrentSong(sampleSongs[nextIndex]);
    setIsPlaying(true);
  };

  const playPreviousSong = () => {
    if (!currentSong) return;

    const currentIndex = sampleSongs.findIndex(
      (song) => song.id === currentSong.id,
    );
    const previousIndex =
      (currentIndex - 1 + sampleSongs.length) % sampleSongs.length;
    setCurrentSong(sampleSongs[previousIndex]);
    setIsPlaying(true);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  return (
    <div className="flex flex-col min-h-[95%]">
      <div className="overflow-auto p-6">
        <h1 className="text-5xl font-extrabold mb-6 dark:text-indigo-500">
          Mi Biblioteca de Música
        </h1>
        <SongList
          songs={sampleSongs}
          onSongSelect={playSong}
          currentSong={currentSong}
        />
      </div>

      <PlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        volume={volume}
        onTogglePlayPause={togglePlayPause}
        onNext={playNextSong}
        onPrevious={playPreviousSong}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
};
export default MusicPlayer;
