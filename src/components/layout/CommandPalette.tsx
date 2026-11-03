import { SiGithub as GithubIcon } from "@icons-pack/react-simple-icons";
import { CommandPalette as CommandPaletteShell } from "@omnidotdev/thornberry/command-palette";
import {
  GLOBAL_HOTKEYS,
  hotkeyLabel,
  useHotkeys,
} from "@omnidotdev/thornberry/use-hotkeys";
import { BookOpen, Boxes, Gauge, MoonStar, Workflow } from "lucide-react";

import app from "@/lib/config/app.config";
import { useTheme } from "@/providers/ThemeProvider";

import type { CommandAction } from "@omnidotdev/thornberry/command-palette";

/** Smooth-scroll to an on-page section by anchor id. */
const scrollToSection = (id: string) => {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/**
 * Global command palette (⌘/Ctrl+K). Mounted once at the app root. Built on the
 * shared Thornberry palette so Taproot shares the same behavior as every other Omni
 * product; this wrapper only supplies Taproot's own actions: jumping to a landing
 * section, opening the docs or repo, and toggling the theme. The shell owns the
 * open state and the mod+k hotkey, so no local open state is needed here.
 */
const CommandPalette = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // App-wide theme shortcut. react-hotkeys-hook ignores form fields by default,
  // so this never fires while typing in the palette input
  useHotkeys(GLOBAL_HOTKEYS.toggleTheme, toggleTheme);

  const commands: CommandAction[] = [
    {
      id: "how-it-works",
      label: "How it works",
      group: "Navigation",
      icon: Workflow,
      keywords: ["showcase", "schema", "sql", "graphql", "demo"],
      onSelect: () => scrollToSection("showcase"),
    },
    {
      id: "performance",
      label: "Performance",
      group: "Navigation",
      icon: Gauge,
      keywords: ["benchmark", "speed", "fast", "latency", "throughput"],
      onSelect: () => scrollToSection("performance"),
    },
    {
      id: "features",
      label: "Features",
      group: "Navigation",
      icon: Boxes,
      onSelect: () => scrollToSection("features"),
    },
    {
      id: "docs",
      label: "Read the docs",
      group: "Navigation",
      icon: BookOpen,
      onSelect: () => {
        window.location.href = app.docsUrl;
      },
    },
    {
      id: "github",
      label: "GitHub repository",
      group: "Navigation",
      icon: GithubIcon,
      keywords: ["source", "code", "repo"],
      onSelect: () => window.open(app.repoUrl, "_blank", "noopener,noreferrer"),
    },
    {
      id: "toggle-theme",
      label:
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
      group: "Preferences",
      icon: MoonStar,
      keywords: ["theme", "dark", "light", "appearance"],
      shortcut: hotkeyLabel(GLOBAL_HOTKEYS.toggleTheme),
      onSelect: toggleTheme,
    },
  ];

  return (
    <CommandPaletteShell commands={commands} placeholder="Search actions..." />
  );
};

export default CommandPalette;
