import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useThemeStore } from '../../store/theme.store'

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { cursorVariant } = useThemeStore()

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener('mousemove', mouseMove)
    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(0, 229, 255, 0.2)', // Primary color with low opacity
      border: '1px solid rgba(0, 229, 255, 0.5)',
      mixBlendMode: 'difference' as const,
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: 'rgba(0, 229, 255, 0.1)',
      border: '1px solid rgba(0, 229, 255, 0.8)',
      mixBlendMode: 'difference' as const,
    },
    hidden: {
      opacity: 0,
      height: 0,
      width: 0,
    }
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none flex items-center justify-center"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </motion.div>
  )
}
