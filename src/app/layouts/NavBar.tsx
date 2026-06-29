import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Palette } from 'lucide-react'
import { SettingsButton } from '../../modules/admin/overlay/SettingsButton'
import { useThemeStore } from '../../store/theme.store'

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      window.dispatchEvent(new CustomEvent('custom-scroll-to', { 
        detail: { target: element, offset: -80 } 
      }))
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3 bg-background/60 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SettingsButton />
            <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="text-2xl font-display font-bold text-white group">
              Port<span className="text-primary group-hover:text-accent transition-colors">folio.</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="px-5 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => useThemeStore.getState().setHasSelectedTheme(false)}
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-primary hover:bg-white/10 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all duration-300 flex items-center gap-2"
              title="Change Theme"
            >
              <Palette size={16} /> Theme
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-2xl font-display font-bold text-gray-300 hover:text-primary transition-colors border-b border-white/10 pb-4"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  useThemeStore.getState().setHasSelectedTheme(false);
                }}
                className="text-2xl font-display font-bold text-gray-300 hover:text-primary transition-colors border-b border-white/10 pb-4 flex items-center gap-3 text-left"
              >
                <Palette size={24} /> Change Theme
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
