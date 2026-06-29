import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore } from '../../store/theme.store'

export const ThemeSelectorModal = () => {
  const { hasSelectedTheme, setHasSelectedTheme, setBackgroundTheme, backgroundTheme } = useThemeStore()
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="w-full max-w-3xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-30"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 text-center">
                Choose Your Experience
              </h2>
              <p className="text-gray-400 text-center mb-10 text-lg">
                Select a visual style for your visit. You can change this later.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    id: 'minimal-light', 
                    name: 'Minimal Light', 
                    desc: 'Clean, bright, and highly legible.',
                    colors: ['bg-slate-50', 'bg-slate-200']
                  },
                  { 
                    id: 'professional', 
                    name: 'Professional Dark', 
                    desc: 'Sleek, deep contrast with subtle depth.',
                    colors: ['bg-zinc-900', 'bg-zinc-800']
                  },
                  { 
                    id: 'aurora', 
                    name: 'Aurora Motion', 
                    desc: 'Elegant, slow-moving colorful gradients.',
                    colors: ['bg-indigo-950', 'bg-purple-900']
                  }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect(t.id)}
                    className="group flex flex-col items-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(45,212,191,0.2)] text-left"
                  >
                    <div className="w-16 h-16 rounded-full mb-6 flex overflow-hidden border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                      <div className={`w-1/2 h-full ${t.colors[0]}`}></div>
                      <div className={`w-1/2 h-full ${t.colors[1]}`}></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{t.name}</h3>
                    <p className="text-sm text-gray-400 text-center leading-relaxed">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
