import { useCallback, useEffect, useRef, useState } from "react";
import "./app.scss";
import Dock from "./components/Dock";
import DesktopContextMenu from "./components/DesktopContextMenu";
import Nav from "./components/Nav";
import Github from "./components/windows/Github";
import Note from "./components/windows/Note";
import Resume from "./components/windows/Resume";
import Spotify from "./components/windows/Spotify";
import Cli from "./components/windows/Cli";

const desktopBackgrounds = [
  { backgroundImage: "url('/mac-wallpaper.jpg')" },
  { backgroundImage: "linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #7e57c2 60%, #ab47bc 100%)" },
  { backgroundImage: "linear-gradient(160deg, #ff8a65 0%, #f4511e 20%, #ab47bc 55%, #4a148c 100%)" },
  {
    backgroundColor: "#0a0a0a",
    backgroundImage: "radial-gradient(ellipse at 18% 24%, rgba(46, 194, 126, 0.5) 0%, rgba(46, 194, 126, 0.2) 18%, transparent 48%), radial-gradient(ellipse at 78% 24%, rgba(47, 111, 231, 0.52) 0%, rgba(47, 111, 231, 0.2) 20%, transparent 50%), radial-gradient(ellipse at 58% 82%, rgba(192, 48, 161, 0.48) 0%, rgba(192, 48, 161, 0.18) 22%, transparent 52%)",
    backgroundBlendMode: "screen",
  },
];

const DESKTOP_STATE_KEY = "mac-os-main:desktop-state";
const windowStateKeys = {
  github: "github",
  note: "note",
  resume: "resume",
  spotify: "Spotify",
  cli: "cli",
};
const defaultWindowsState = {
  github: false,
  note: false,
  resume: false,
  Spotify: false,
  cli: false,
};
const defaultMinimizedState = {
  github: false,
  note: false,
  resume: false,
  Spotify: false,
  cli: false,
};
const defaultClosingState = {
  github: false,
  note: false,
  resume: false,
  Spotify: false,
  cli: false,
};
const focusableWindows = ["github", "note", "resume", "spotify", "cli"];
const WINDOW_TRANSITION_MS = 180;

const getWindowStateKey = (windowName) => windowStateKeys[windowName] || windowName;

const getSavedValue = (savedState, key) => {
  if (typeof savedState[key] === "boolean") return savedState[key];

  // Older versions persisted the Spotify entry under the lowercase component name.
  if (key === "Spotify" && typeof savedState.spotify === "boolean") {
    return savedState.spotify;
  }

  return undefined;
};

const readDesktopState = () => {
  try {
    const storedState = window.localStorage.getItem(DESKTOP_STATE_KEY);
    if (!storedState) return {};

    const parsedState = JSON.parse(storedState);
    return parsedState && typeof parsedState === "object" && !Array.isArray(parsedState)
      ? parsedState
      : {};
  } catch {
    return {};
  }
};

const restoreBooleanState = (savedState, defaults) => {
  if (!savedState || typeof savedState !== "object" || Array.isArray(savedState)) {
    return defaults;
  }

  return Object.keys(defaults).reduce((restoredState, key) => ({
    ...restoredState,
    [key]: getSavedValue(savedState, key) ?? defaults[key],
  }), {});
};

const isValidDimension = (value) => (
  (typeof value === "number" && Number.isFinite(value) && value > 0)
  || (typeof value === "string" && value.trim().length > 0)
);

const restoreWindowGeometry = (savedGeometry) => {
  if (!savedGeometry || typeof savedGeometry !== "object" || Array.isArray(savedGeometry)) {
    return {};
  }

  return Object.keys(defaultWindowsState).reduce((restoredGeometry, key) => {
    const saved = savedGeometry[key] || (key === "Spotify" ? savedGeometry.spotify : null);
    const position = saved?.position;
    const size = saved?.size;

    if (
      position
      && Number.isFinite(position.x)
      && Number.isFinite(position.y)
      && size
      && isValidDimension(size.width)
      && isValidDimension(size.height)
    ) {
      restoredGeometry[key] = {
        position: { x: position.x, y: position.y },
        size: { width: size.width, height: size.height },
      };
    }

    return restoredGeometry;
  }, {});
};

const App = () => {
  const desktopRef = useRef(null);
  const [persistedDesktopState] = useState(() => readDesktopState());
  const [backgroundIndex, setBackgroundIndex] = useState(() => {
    const savedIndex = persistedDesktopState.backgroundIndex;
    return Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < desktopBackgrounds.length
      ? savedIndex
      : 0;
  });
  const [windowsState, setWindowsState] = useState(() => (
    restoreBooleanState(persistedDesktopState.windowsState, defaultWindowsState)
  ));
  const [focusedWindow, setFocusedWindow] = useState(() => {
    const savedFocus = persistedDesktopState.focusedWindow;
    if (!focusableWindows.includes(savedFocus)) return null;

    const stateKey = savedFocus === "spotify" ? "Spotify" : savedFocus;
    return windowsState[stateKey] ? savedFocus : null;
  });
  const [minimizedState, setMinimizedState] = useState(() => (
    restoreBooleanState(persistedDesktopState.minimizedState, defaultMinimizedState)
  ));
  const [windowGeometry, setWindowGeometry] = useState(() => (
    restoreWindowGeometry(persistedDesktopState.windowGeometry)
  ));
  const [closingWindows, setClosingWindows] = useState(defaultClosingState);
  const closeTimers = useRef({});

  const closeWindow = useCallback((windowName) => {
    const stateKey = getWindowStateKey(windowName);

    setClosingWindows((state) => ({ ...state, [stateKey]: true }));
    if (closeTimers.current[windowName]) {
      window.clearTimeout(closeTimers.current[windowName]);
    }

    closeTimers.current[windowName] = window.setTimeout(() => {
      setWindowsState((state) => ({ ...state, [stateKey]: false }));
      setMinimizedState((state) => ({ ...state, [stateKey]: false }));
      setClosingWindows((state) => ({ ...state, [stateKey]: false }));
      setFocusedWindow((state) => (state === windowName ? null : state));
      delete closeTimers.current[windowName];
    }, WINDOW_TRANSITION_MS);
  }, []);

  const updateWindowGeometry = useCallback((windowName, geometry) => {
    const stateKey = getWindowStateKey(windowName);
    setWindowGeometry((state) => ({ ...state, [stateKey]: geometry }));
  }, []);

  useEffect(() => () => {
    Object.values(closeTimers.current).forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isEscape = event.key === "Escape";
      const isCtrlW = event.ctrlKey && event.key.toLowerCase() === "w";
      const isTypingTarget = event.target instanceof HTMLElement
        && (event.target.matches("input, textarea, select") || event.target.isContentEditable);

      if (!isEscape && !isCtrlW) return;
      if (isCtrlW && isTypingTarget) return;
      if (isCtrlW) event.preventDefault();
      if (!focusedWindow) return;

      closeWindow(focusedWindow);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeWindow, focusedWindow]);

  useEffect(() => {
    try {
      window.localStorage.setItem(DESKTOP_STATE_KEY, JSON.stringify({
        backgroundIndex,
        windowsState,
        minimizedState,
        focusedWindow,
        windowGeometry,
      }));
    } catch {
      // Ignore storage failures, such as private browsing or a full quota.
    }
  }, [backgroundIndex, windowsState, minimizedState, focusedWindow, windowGeometry]);

  const changeWallpaper = () => {
    setBackgroundIndex((currentIndex) => (currentIndex + 1) % desktopBackgrounds.length);
  };

  return (
    <>
      <main ref={desktopRef} style={desktopBackgrounds[backgroundIndex]}>
        <Nav />
        <Dock windowsState={windowsState} setWindowsState={setWindowsState} setFocusedWindow={setFocusedWindow} setMinimizedState={setMinimizedState} />
        {(windowsState.github || closingWindows.github) && (<Github windowName="github" focusedWindow={focusedWindow} setFocusedWindow={setFocusedWindow} minimized={minimizedState.github} setMinimizedState={setMinimizedState} windowsState={windowsState} setWindowsState={setWindowsState} geometry={windowGeometry.github} onGeometryChange={updateWindowGeometry} closing={closingWindows.github} onClose={closeWindow}/>)}
        {(windowsState.note || closingWindows.note) && (<Note windowName="note" focusedWindow={focusedWindow} setFocusedWindow={setFocusedWindow} minimized={minimizedState.note} setMinimizedState={setMinimizedState} windowsState={windowsState} setWindowsState={setWindowsState} geometry={windowGeometry.note} onGeometryChange={updateWindowGeometry} closing={closingWindows.note} onClose={closeWindow} />)}
        {(windowsState.resume || closingWindows.resume) && (
          <Resume windowName="resume" focusedWindow={focusedWindow} setFocusedWindow={setFocusedWindow} minimized={minimizedState.resume} setMinimizedState={setMinimizedState} windowsState={windowsState} setWindowsState={setWindowsState} geometry={windowGeometry.resume} onGeometryChange={updateWindowGeometry} closing={closingWindows.resume} onClose={closeWindow}/>
        )}
        {(windowsState.Spotify || closingWindows.Spotify) && (
          <Spotify windowName="spotify" focusedWindow={focusedWindow} setFocusedWindow={setFocusedWindow} minimized={minimizedState.Spotify} setMinimizedState={setMinimizedState} windowsState={windowsState} setWindowsState={setWindowsState} geometry={windowGeometry.Spotify} onGeometryChange={updateWindowGeometry} closing={closingWindows.Spotify} onClose={closeWindow}/>
        )}
        {(windowsState.cli || closingWindows.cli) && <Cli windowName="cli" focusedWindow={focusedWindow} setFocusedWindow={setFocusedWindow} minimized={minimizedState.cli} setMinimizedState={setMinimizedState} windowsState={windowsState} setWindowsState={setWindowsState} geometry={windowGeometry.cli} onGeometryChange={updateWindowGeometry} closing={closingWindows.cli} onClose={closeWindow} />}
      </main>
      <DesktopContextMenu
        desktopRef={desktopRef}
        onChangeWallpaper={changeWallpaper}
        onRefresh={() => window.location.reload()}
      />
    </>
  );
};

export default App;
