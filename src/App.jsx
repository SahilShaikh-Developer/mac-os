import React, { useState } from "react";
import "./app.scss";
import Dock from "./components/Dock";
import Nav from "./components/Nav";
import Github from "./components/windows/Github";
import Note from "./components/windows/Note";
import Resume from "./components/windows/Resume";
import Spotify from "./components/windows/Spotify";
import Cli from "./components/windows/Cli";

const App = () => {
  const [windowsState, setWindowsState] = useState({
    github: false,
    note: false,
    resume: false,
    Spotify: false,
    cli: false,
  });

  return (
    <>
      <main>
        <Nav />
        <Dock windowsState={windowsState} setWindowsState={setWindowsState} />
        {windowsState.github && (<Github  windowName="github"  windowsState={windowsState}setWindowsState={setWindowsState}/>)}
        {windowsState.note && (<Note windowName="note" windowsState={windowsState} setWindowsState={setWindowsState} />)}
        {windowsState.resume && <Resume windowName="resume" windowsState={windowsState} setWindowsState={setWindowsState}/>}
        {windowsState.Spotify && <Spotify windowName="spotify" windowsState={windowsState} setWindowsState={setWindowsState}/>}
        {windowsState.cli && <Cli windowName="cli" windowsState={windowsState} setWindowsState={setWindowsState} />}
      </main>
    </>
  );
};

export default App;
