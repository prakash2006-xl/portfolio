import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore } from '../../store/theme.store'

export const ThemeSelectorModal = () => {
  const { hasSelectedTheme, setHasSelectedTheme, setBackgroundTheme } = useThemeStore()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Only show on first load if they haven't selected a theme yet
    if (!hasSelectedTheme) {
      setIsOpen(true)
    }
  }, [hasSelectedTheme])

  const handleSelect = (themeId: string) => {
    setBackgroundTheme(themeId)
    setHasSelectedTheme(true)
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="fixed bottom-6 right-6 z-[9999] w-[350px] bg-white/10 backdrop-blur-3xl border border-white/20 p-6 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50"></div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-display font-bold text-white mb-2">
              Select Theme
            </h2>
            <p className="text-gray-400 text-xs mb-4">
              Click to select and apply.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { 
                  id: 'minimal-light', 
                  name: 'Minimal Light', 
                  colors: ['bg-slate-50', 'bg-slate-200']
                },
                { 
                  id: 'professional', 
                  name: 'Professional Dark', 
                  colors: ['bg-zinc-900', 'bg-zinc-800']
                },
                { 
                  id: 'aurora', 
                  name: 'Aurora Motion', 
                  colors: ['bg-indigo-950', 'bg-purple-900']
                },
                {
                  id: 'holographic',
                  name: 'Holographic',
                  colors: ['bg-pink-300', 'bg-blue-300']
                }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelect(t.id)}
                  className="group flex items-center p-3 bg-black/40 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] text-left w-full"
                >
                  <div className="w-8 h-8 rounded-full mr-4 flex overflow-hidden border border-white/20 shadow-lg shrink-0">
                    <div className={`w-1/2 h-full ${t.colors[0]}`}></div>
                    <div className={`w-1/2 h-full ${t.colors[1]}`}></div>
                  </div>
                  <span className="font-bold text-sm text-white group-hover:text-primary transition-colors">{t.name}</span>
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full text-center text-xs text-gray-500 hover:text-white transition-colors"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
