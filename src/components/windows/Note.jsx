import { useEffect, useState } from 'react'
import MacWindow from './MacWindow'
import './note-window.scss'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Note = ({windowName, focusedWindow, setFocusedWindow, minimized, setMinimizedState, windowsState, setWindowsState, geometry, onGeometryChange, closing, onClose }) => {


    const [markdown, setmarkdown] = useState(null)


    useEffect(()=>{

        fetch('/note.txt')
        .then(res => res.text())
        .then(text => setmarkdown(text))


    },[])
  return (
    <div>
      <MacWindow title="Notes" windowName={windowName} focusedWindow={focusedWindow} setFocusedWindow={setFocusedWindow} minimized={minimized} setMinimizedState={setMinimizedState} windowsState={windowsState} setWindowsState={setWindowsState} geometry={geometry} onGeometryChange={onGeometryChange} closing={closing} onClose={onClose}>

        <div className="note-window">
            {markdown ? <SyntaxHighlighter language="typescript" style={atelierDuneDark}>{markdown}</SyntaxHighlighter> : <p> Loading...</p>}
        </div>

      </MacWindow>
    </div>
  )
}

export default Note
