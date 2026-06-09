'use client'

import { useEffect, useRef } from 'react'

interface MicButtonProps {
  isListening: boolean
  isDisabled: boolean
  onStart: () => void
  onStop: () => void
  label: string
  color: 'blue' | 'green'
}

export function MicButton({
  isListening,
  isDisabled,
  onStart,
  onStop,
  label,
  color,
}: MicButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const colors = {
    blue: {
      base: '#1a6fd4',
      hover: '#1558aa',
      pulse: 'rgba(26,111,212,0.3)',
      light: '#e8f1fc',
    },
    green: {
      base: '#1a9e5e',
      hover: '#147a48',
      pulse: 'rgba(26,158,94,0.3)',
      light: '#e8f7f0',
    },
  }

  const c = colors[color]

  // Attach touch events with { passive: false } to allow preventDefault
  useEffect(() => {
    const btn = buttonRef.current
    if (!btn) return

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()  // prevents long-press popup & text selection
      e.stopPropagation()
      if (!isDisabled) onStart()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onStop()
    }

    btn.addEventListener('touchstart', handleTouchStart, { passive: false })
    btn.addEventListener('touchend', handleTouchEnd, { passive: false })
    btn.addEventListener('touchcancel', handleTouchEnd, { passive: false })

    return () => {
      btn.removeEventListener('touchstart', handleTouchStart)
      btn.removeEventListener('touchend', handleTouchEnd)
      btn.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [isDisabled, onStart, onStop])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <p style={{
        margin: 0,
        fontSize: '14px',
        fontWeight: 500,
        color: '#666',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}>
        {label}
      </p>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isListening && (
          <>
            <div style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: c.pulse,
              animation: 'pulse1 1.5s ease-out infinite',
            }} />
            <div style={{
              position: 'absolute',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: c.pulse,
              opacity: 0.5,
              animation: 'pulse1 1.5s ease-out infinite 0.3s',
            }} />
          </>
        )}

        <button
          ref={buttonRef}
          onMouseDown={onStart}
          onMouseUp={onStop}
          disabled={isDisabled}
          style={{
            position: 'relative',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: 'none',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            background: isListening ? c.base : c.light,
            color: isListening ? 'white' : c.base,
            fontSize: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            boxShadow: isListening ? `0 4px 20px ${c.pulse}` : '0 2px 8px rgba(0,0,0,0.1)',
            opacity: isDisabled ? 0.5 : 1,
            userSelect: 'none',
            WebkitUserSelect: 'none',
            // Disable long press callout on iOS
            WebkitTouchCallout: 'none',
          } as React.CSSProperties}
        >
          🎤
        </button>
      </div>

      <p style={{
        margin: 0,
        fontSize: '12px',
        color: isListening ? c.base : '#999',
        fontWeight: isListening ? 600 : 400,
        transition: 'all 0.2s',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}>
        {isListening ? 'Listening...' : 'Tap to speak'}
      </p>
    </div>
  )
}
