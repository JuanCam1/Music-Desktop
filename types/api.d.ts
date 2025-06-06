export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
}

declare global {
  type SongModel = Song;
  interface Window {
    api: {
    };
  }
}

export { };
