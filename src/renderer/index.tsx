import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/context/theme-provider";
import App from "./main";
import "./index.css";

const idRoot = document.getElementById("root") as HTMLElement;

const root = createRoot(idRoot);

root.render(
  <ThemeProvider defaultTheme="system" storageKey="music-theme">
    <App />,
  </ThemeProvider>,
);
