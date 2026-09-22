import React from 'react'
import MacWindow from './MacWindow'
import './resume.scss'

const Resume = ({ windowName ,windowsState ,setWindowsState } ) => {
  return (
    <MacWindow windowName={windowName} windowsState={windowsState} setWindowsState={setWindowsState}>
        <div className="resume-window">
            <embed src="/resume.pdf" frameborder="0"></embed>
        </div>
    </MacWindow>
  )
}

export default Resume
