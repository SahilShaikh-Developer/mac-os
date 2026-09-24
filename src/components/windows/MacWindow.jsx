import { useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import './window.scss'

const defaultPositions = {
  github: { x: 40, y: 40 },
  note: { x: 100, y: 80 },
  resume: { x: 160, y: 120 },
  spotify: { x: 220, y: 160 },
  cli: { x: 280, y: 200 },
}

const windowStateKeys = {
  github: 'github',
  note: 'note',
  resume: 'resume',
  spotify: 'Spotify',
  cli: 'cli',
}

const MacWindow = ({children , width='40vw',height='50vh', title='sahilshaikh -zsh', windowName , focusedWindow, setFocusedWindow, minimized, setMinimizedState, setWindowsState, geometry, onGeometryChange, closing, onClose }) => {
  const stateKey = windowStateKeys[windowName] || windowName
  const initialPosition = defaultPositions[windowName] || { x: 100, y: 100 }
  const [position, setPosition] = useState(() => geometry?.position || initialPosition)
  const [size, setSize] = useState(() => geometry?.size || { width, height })
  const [isMaximized, setIsMaximized] = useState(false)
  const previousGeometry = useRef(null)

  const updateGeometry = (nextPosition, nextSize, persist = true) => {
    setPosition(nextPosition)
    setSize(nextSize)

    if (persist && onGeometryChange) {
      onGeometryChange(windowName, {
        position: { x: nextPosition.x, y: nextPosition.y },
        size: { width: nextSize.width, height: nextSize.height },
      })
    }
  }

  const handleMaximize = (event) => {
    event.stopPropagation()

    if (isMaximized) {
      if (!previousGeometry.current) return

      updateGeometry(previousGeometry.current.position, previousGeometry.current.size)
      previousGeometry.current = null
      setIsMaximized(false)
      return
    }

    previousGeometry.current = { position, size }
    updateGeometry({ x: 16, y: 48 }, {
      width: Math.max(window.innerWidth - 32, 0),
      height: Math.max(window.innerHeight - 160, 0),
    }, false)
    setIsMaximized(true)
  }

  const handleClose = (event) => {
    event.stopPropagation()
    if (onClose) {
      onClose(windowName)
      return
    }

    setWindowsState(state => ({ ...state, [stateKey]: false }))
    if (focusedWindow === windowName) setFocusedWindow(null)
  }

  return (
    
      <Rnd 
      size={size}
      position={position}
      onDragStop={(_, data) => {
        const nextPosition = { x: data.x, y: data.y }
        updateGeometry(nextPosition, size, !isMaximized)
      }}
      onResizeStop={(_, __, ref, ___, nextPosition) => {
        const normalizedPosition = { x: nextPosition.x, y: nextPosition.y }
        const nextSize = { width: ref.offsetWidth, height: ref.offsetHeight }
        updateGeometry(normalizedPosition, nextSize, !isMaximized)
      }}
      style={{
        zIndex: focusedWindow === windowName ? 1 : 0,
        display: minimized ? 'none' : undefined,
      }}
      >
       <div className={`window${closing ? ' window--closing' : ''}`} onMouseDown={() => setFocusedWindow(windowName)}>
        <div className="nav">
            <div className="dots" onMouseDown={(event) => event.stopPropagation()}>
                <div 
                onClick={handleClose}
                className="dot red"></div>
                <div
                  onClick={(event) => {
                    event.stopPropagation()
                    setMinimizedState(state => ({ ...state, [stateKey]: true }))
                  }}
                  className="dot yellow"
                ></div>
                <div onClick={handleMaximize} className="dot green"></div>
            </div>
            <div className="title">
                <p>{title}</p>
            </div>
        </div>
        <div className="main-content">

            {children}

        </div>  
       </div>
      </Rnd>

  )
}

export default MacWindow
