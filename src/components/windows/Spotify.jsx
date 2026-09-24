import MacWindow from './MacWindow'
import './spotify.scss'

const Spotify = ({windowName, focusedWindow, setFocusedWindow, minimized, setMinimizedState, windowsState, setWindowsState, geometry, onGeometryChange, closing, onClose} ) => {
  return (
   <MacWindow title="Spotify" width='25vw' windowName={windowName} focusedWindow={focusedWindow} setFocusedWindow={setFocusedWindow} minimized={minimized} setMinimizedState={setMinimizedState} windowsState={windowsState} setWindowsState={setWindowsState} geometry={geometry} onGeometryChange={onGeometryChange} closing={closing} onClose={onClose}>
    <div className="spotify-window">

        <iframe data-testid="embed-iframe" style={{borderRadius:'12px'}} src="https://open.spotify.com/embed/playlist/3naNQmrSNWRMy4VbkxoZ14?utm_source=generator&si=aabd8a4bb9b946cb" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

    </div>
   </MacWindow>
  )
}

export default Spotify
