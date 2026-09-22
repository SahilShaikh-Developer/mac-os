import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import MacWindow from './MacWindow'
import './note-window.scss'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Note = ({windowName,windowsState,setWindowsState }) => {


    const [markdown, setmarkdown] = useState(null)


    useEffect(()=>{

        fetch('/note.txt')
        .then(res => res.text())
        .then(text => setmarkdown(text))


    },[])
  return (
    <div>
      <MacWindow windowName={windowName} windowsState={windowsState} setWindowsState={setWindowsState}>

        <div className="note-window">
            {markdown ? <SyntaxHighlighter language="typescript" style={atelierDuneDark}>{markdown}</SyntaxHighlighter> : <p> Loading...</p>}
        </div>

      </MacWindow>
    </div>
  )
}

export default Note
