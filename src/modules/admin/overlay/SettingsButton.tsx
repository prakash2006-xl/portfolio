import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Settings } from 'lucide-react'
import { EditorOverlay } from './EditorOverlay'

export const SettingsButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <button
        onPointerDown={(e) => { e.preventDefault(); setIsOpen(true); }}
        onClick={(e) => { e.preventDefault(); setIsOpen(true); }}
        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all cursor-pointer pointer-events-auto flex items-center justify-center group"
        aria-label="Open Settings"
      >
        <Settings size={20} className="text-gray-300 group-hover:text-white group-hover:rotate-90 transition-all duration-500" />
      </button>

      {mounted && isOpen && createPortal(
        <EditorOverlay onClose={() => setIsOpen(false)} />,
        document.body
      )}
    </>
  )
}
