import MacWindow from './MacWindow'
import './resume.scss'

const Resume = ({ windowName, focusedWindow, setFocusedWindow, minimized, setMinimizedState, windowsState ,setWindowsState, geometry, onGeometryChange, closing, onClose } ) => {
  return (
    <MacWindow title="Resume.pdf" windowName={windowName} focusedWindow={focusedWindow} setFocusedWindow={setFocusedWindow} minimized={minimized} setMinimizedState={setMinimizedState} windowsState={windowsState} setWindowsState={setWindowsState} geometry={geometry} onGeometryChange={onGeometryChange} closing={closing} onClose={onClose}>
        <div className="resume-window">
            <embed src="/resume.pdf" frameborder="0"></embed>
        </div>
    </MacWindow>
  )
}

export default Resume
