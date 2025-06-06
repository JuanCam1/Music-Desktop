import ModeToggle from "@/components/shared/toggle";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col items-center ">
      <div className="absolute top-0 right-0">
        <ModeToggle />
      </div>
      <Outlet />
    </div>
  ),
});
