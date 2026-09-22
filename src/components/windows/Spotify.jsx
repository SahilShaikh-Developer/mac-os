import React from 'react'
import MacWindow from './MacWindow'
import './spotify.scss'

const Spotify = ({windowName, windowsState, setWindowsState} ) => {
  return (
   <MacWindow width='25vw' windowName={windowName} windowsState={windowsState} setWindowsState={setWindowsState}>
    <div className="spotify-window">

        <iframe data-testid="embed-iframe" style={{borderRadius:'12px'}} src="https://open.spotify.com/embed/playlist/3naNQmrSNWRMy4VbkxoZ14?utm_source=generator&si=aabd8a4bb9b946cb" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

    </div>
   </MacWindow>
  )
}

export default Spotify
