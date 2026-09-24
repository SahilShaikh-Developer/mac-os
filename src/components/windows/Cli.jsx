import { useMemo, useState } from "react";
import MacWindow from "./MacWindow";
import "./cli-window.scss";

import * as TerminalModule from "react-console-emulator";

const Terminal = TerminalModule.default.default;

const commandList = [
  "about      - learn more about Sahil",
  "skills     - see the tools and technologies I use",
  "projects   - open projects and list featured projects",
  "open       - open a window by name",
  "theme      - switch the terminal color theme",
  "neofetch   - show terminal system info",
  "contact    - show contact details",
  "resume     - open the resume window",
  "social     - show social links",
  "whoami     - display the current profile",
  "date       - show today's date",
  "echo       - print a message",
  "help       - list all available commands",
];

const themes = {
  green: {
    background: "#0a0a0a",
    text: "#5fbf5f",
    prompt: "#00ff00",
  },
  amber: {
    background: "#0a0a0a",
    text: "#c98a2b",
    prompt: "#ffb000",
  },
  mono: {
    background: "#0a0a0a",
    text: "rgb(140, 138, 138)",
    prompt: "rgb(167, 165, 165)",
  },
};

const themeNames = Object.keys(themes);

const formatUptime = (elapsedMs) => {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};

const createCommands = (setWindowsState, setFocusedWindow, setMinimizedState, activeTheme, setActiveTheme, mountedAt) => {
  const openWindow = (windowName, stateKey = windowName) => {
    setWindowsState((state) => ({ ...state, [stateKey]: true }));
    setMinimizedState((state) => ({ ...state, [stateKey]: false }));
    setFocusedWindow(windowName);
  };

  const commands = {
  about: {
    description: "Learn more about Sahil.",
    usage: "about",
    fn: () =>
      "Sahil Shaikh is a developer who enjoys building thoughtful web experiences and useful software.",
  },
  skills: {
    description: "Show Sahil's skills.",
    usage: "skills",
    fn: () =>
      "JavaScript, React, Node.js, ASP.NET Core, C#, Python, Django, SQL, MongoDB, Docker",
  },
  projects: {
    description: "Open the projects window and list featured projects.",
    usage: "projects",
    fn: () => {
      openWindow("github");
      return "Scheds | FinTrack | SecureAuth | ChatStream | TerminalX";
    },
  },
  open: {
    description: "Open a window by name.",
    usage: "open <window>",
    fn: (windowName) => {
      const windows = {
        github: { windowName: "github", stateKey: "github" },
        projects: { windowName: "github", stateKey: "github" },
        note: { windowName: "note", stateKey: "note" },
        resume: { windowName: "resume", stateKey: "resume" },
        spotify: { windowName: "spotify", stateKey: "Spotify" },
        cli: { windowName: "cli", stateKey: "cli" },
      };
      const target = windows[windowName?.toLowerCase()];

      if (!target) {
        return "Usage: open <github|projects|note|resume|spotify|cli>";
      }

      openWindow(target.windowName, target.stateKey);
      return `${windowName.toLowerCase()} window opened.`;
    },
  },
  theme: {
    description: "Switch the terminal color theme.",
    usage: "theme <name>",
    fn: (themeName) => {
      if (!themeName) {
        return `Available themes: ${themeNames.join(", ")}. Current theme: ${activeTheme}.`;
      }

      const nextTheme = themeName.toLowerCase();
      if (!themes[nextTheme]) {
        return `Usage: theme <${themeNames.join("|")}>. Current theme: ${activeTheme}.`;
      }

      setActiveTheme(nextTheme);
      return `Theme changed to ${nextTheme}.`;
    },
  },
  neofetch: {
    description: "Show terminal system information.",
    usage: "neofetch",
    fn: () => {
      const role = commands.whoami.fn();
      const stack = commands.skills.fn().split(", ");
      const [github, linkedin] = commands.social.fn().split(" | ");
      const ascii = [
        "   .---.",
        "  / .-. \\",
        " | |   | |",
        "  \\ `-' /",
        "   `---'",
      ];
      const stats = [
        "Name: sahilshaikh",
        `Role: ${role}`,
        `Stack: ${stack.slice(0, 4).join(", ")} +${stack.length - 4} more`,
        "Focus: Building toward full-stack and AI-integrated applications",
        github,
        linkedin,
        `Uptime: ${formatUptime(Date.now() - mountedAt)}`,
      ];
      const artWidth = Math.max(...ascii.map((line) => line.length));

      return stats
        .map((line, index) => `${(ascii[index] || "").padEnd(artWidth)}  ${line}`)
        .join("\n");
    },
  },
  contact: {
    description: "Show contact details.",
    usage: "contact",
    fn: () => "Email: sahilshaikh49163@gmail.com",
  },
  resume: {
    description: "Open the resume window.",
    usage: "resume",
    fn: () => {
      openWindow("resume");
      return "Resume window opened.";
    },
  },
  social: {
    description: "Show social links.",
    usage: "social",
    fn: () =>
      "GitHub: https://github.com/SahilShaikh-Developer | LinkedIn: https://www.linkedin.com/in/sahilshaikh-cs/",
  },
  whoami: {
    description: "Display the current profile.",
    usage: "whoami",
    fn: () => "sahilshaikh - frontend developer and problem solver",
  },
  date: {
    description: "Show today's date.",
    usage: "date",
    fn: () => new Date().toLocaleDateString(),
  },
  echo: {
    description: "Echo a passed string.",
    usage: "echo <string>",
    fn: (...args) => args.join(" "),
  },
  };

  return commands;
};

const Cli = ({windowName, focusedWindow, setFocusedWindow, minimized, setMinimizedState, windowsState, setWindowsState, geometry, onGeometryChange, closing, onClose}) => {
  const [activeTheme, setActiveTheme] = useState("green");
  const [mountedAt] = useState(() => Date.now());
  const theme = themes[activeTheme];
  const commands = useMemo(
    () => createCommands(setWindowsState, setFocusedWindow, setMinimizedState, activeTheme, setActiveTheme, mountedAt),
    [setWindowsState, setFocusedWindow, setMinimizedState, activeTheme, mountedAt]
  );

  return (
    <MacWindow title="sahilshaikh — zsh" windowName={windowName} focusedWindow={focusedWindow} setFocusedWindow={setFocusedWindow} minimized={minimized} setMinimizedState={setMinimizedState} windowsState={windowsState} setWindowsState={setWindowsState} geometry={geometry} onGeometryChange={onGeometryChange} closing={closing} onClose={onClose}>
      <div className="cli-window" style={{ backgroundColor: theme.background }}>
        <Terminal
          key={activeTheme}
          commands={commands}
          welcomeMessage={`Welcome to Sahil's portfolio terminal!\nType help to explore the available commands.\n\n${commandList.join("\n")}`}
          promptLabel={"sahilshaikh:~$"}
          contentStyle={{ color: theme.text }}
          messageStyle={{ color: theme.text }}
          inputTextStyle={{ color: theme.text }}
          promptLabelStyle={{ color: theme.prompt }}
        />
      </div>
    </MacWindow>
  );
};

export default Cli;
