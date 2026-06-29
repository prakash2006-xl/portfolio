import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}

export const GlassCard = ({ 
  children, 
  className, 
  intensity = 'medium',
  ...props 
}: GlassCardProps) => {
  const intensityMap = {
    low: 'bg-white/5 backdrop-blur-sm border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border-white/20',
    high: 'bg-white/20 backdrop-blur-xl border-white/30',
  }

  return (
    <motion.div
      className={cn(
        'rounded-2xl border shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]',
        intensityMap[intensity],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
