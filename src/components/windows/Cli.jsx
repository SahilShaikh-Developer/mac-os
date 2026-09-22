import React from "react";
import MacWindow from "./MacWindow";
import "./cli-window.scss";

import * as TerminalModule from "react-console-emulator";

const Terminal = TerminalModule.default.default;

const commandList = [
  "about      - learn more about Sahil",
  "skills     - see the tools and technologies I use",
  "projects   - list featured projects",
  "contact    - show contact details",
  "resume     - show the resume window",
  "social     - show social links",
  "whoami     - display the current profile",
  "date       - show today's date",
  "echo       - print a message",
  "help       - list all available commands",
];

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
    description: "List featured projects.",
    usage: "projects",
    fn: () => "Scheds | FinTrack | SecureAuth | ChatStream | TerminalX",
  },
  contact: {
    description: "Show contact details.",
    usage: "contact",
    fn: () => "Email: sahilshaikh49163@gmail.com",
  },
  resume: {
    description: "Open the resume window.",
    usage: "resume",
    fn: () => "Resume window: use the Resume icon in the dock to open it.",
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

const Cli = ({windowName, windowsState, setWindowsState}) => {
  return (
    <MacWindow windowName={windowName} windowsState={windowsState} setWindowsState={setWindowsState}>
      <div className="cli-window">
        <Terminal
          commands={commands}
          welcomeMessage={`Welcome to Sahil's portfolio terminal!\nType help to explore the available commands.\n\n${commandList.join("\n")}`}
          promptLabel={"sahilshaikh:~$"}
          promptLabelStyle={{ color: "#00ff00" }}
        />
      </div>
    </MacWindow>
  );
};

export default Cli;
