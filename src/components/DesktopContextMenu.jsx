import { useEffect, useRef, useState } from "react";
import "./desktop-context-menu.scss";

const DesktopContextMenu = ({ desktopRef, onChangeWallpaper, onRefresh }) => {
  const [position, setPosition] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const menuRef = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    const desktop = desktopRef.current;
    if (!desktop) return undefined;

    const handleContextMenu = (event) => {
      if (event.target !== event.currentTarget) return;

      event.preventDefault();
      setPosition({ x: event.clientX, y: event.clientY });
    };

    desktop.addEventListener("contextmenu", handleContextMenu);

    return () => desktop.removeEventListener("contextmenu", handleContextMenu);
  }, [desktopRef]);

  useEffect(() => {
    if (!position) return undefined;

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setPosition(null);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setPosition(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [position]);

  useEffect(() => () => {
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
  }, []);

  const handleNewFolder = () => {
    setPosition(null);
    setShowToast(true);
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
    toastTimer.current = window.setTimeout(() => setShowToast(false), 2200);
  };

  return (
    <>
      {position && (
        <div
          ref={menuRef}
          className="desktop-context-menu"
          style={{ left: position.x, top: position.y }}
          onContextMenu={(event) => event.preventDefault()}
        >
          <button type="button" onClick={() => { onChangeWallpaper(); setPosition(null); }}>
            Change Wallpaper
          </button>
          <button type="button" onClick={onRefresh}>
            Refresh
          </button>
          <button type="button" onClick={handleNewFolder}>
            New Folder
          </button>
        </div>
      )}
      {showToast && (
        <div className="desktop-context-menu__toast" role="status">
          Nice try — no file system here 😄
        </div>
      )}
    </>
  );
};

export default DesktopContextMenu;
