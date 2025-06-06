import MusicPlayer from "@/sections/music-player";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col mt-12 bg-white dark:bg-zinc-900 px-5 rounded-md w-full lg:w-[80%] min-h-[95%] pt-3">
      <MusicPlayer />
    </div>
  );
}
