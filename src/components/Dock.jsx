import "./dock.scss";

const Dock = ({ windowsState, setWindowsState, setFocusedWindow, setMinimizedState }) => {
  const openWindow = (windowName, stateKey = windowName) => {
    setWindowsState((state) => ({ ...state, [stateKey]: true }));
    setMinimizedState((state) => ({ ...state, [stateKey]: false }));
    setFocusedWindow(windowName);
  };

  return (
    <footer className="dock">
      <div className="dock-item">
        <div
          onClick={() => {
            openWindow("github");
          }}
          className="icon github"
        >
          <img src="/doc-icons/github.svg" alt="" />
        </div>
        {windowsState.github && <span className="window-indicator" aria-hidden="true" />}
      </div>
      <div className="dock-item">
        <div
          onClick={() => {
            openWindow("note");
          }}
          className="icon note"
        >
          <img src="/doc-icons/note.svg" alt="" />
        </div>
        {windowsState.note && <span className="window-indicator" aria-hidden="true" />}
      </div>
      <div className="dock-item">
        <div
          onClick={() => {
            openWindow("resume");
          }}
          className="icon pdf"
        >
          <img src="/doc-icons/pdf.svg" alt="" />
        </div>
        {windowsState.resume && <span className="window-indicator" aria-hidden="true" />}
      </div>
      <div className="dock-item">
        <div
          onClick={() => {
            window.open("https://calendar.google.com/", "_blank");
          }}
          className="icon calender"
        >
          <img src="/doc-icons/calender.svg" alt="" />
        </div>
      </div>
      <div className="dock-item">
        <div
          onClick={() => {
            openWindow("spotify", "Spotify");
          }}
          className="icon spotify"
        >
          <img src="/doc-icons/spotify.svg" alt="" />
        </div>
        {windowsState.Spotify && <span className="window-indicator" aria-hidden="true" />}
      </div>
      <div className="dock-item">
        <div
          onClick={() => {
            window.open("mailto:sahilshaikh49163@gmail.com", "_blank");
          }}
          className="icon mail"
        >
          <img src="/doc-icons/mail.svg" alt="" />
        </div>
      </div>
      <div className="dock-item">
        <div
          onClick={() => {
            window.open("https://www.linkedin.com/in/sahilshaikh-cs/", "_blank");
          }}
          className="icon link"
        >
          <img src="/doc-icons/link.svg" alt="" />
        </div>
      </div>
      <div className="dock-item">
        <div
          onClick={() => {
            openWindow("cli");
          }}
          className="icon cli"
        >
          <img src="/doc-icons/cli.svg" alt="" />
        </div>
        {windowsState.cli && <span className="window-indicator" aria-hidden="true" />}
      </div>
    </footer>
  );
};

export default Dock;
