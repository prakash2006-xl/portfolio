import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import Lenis from 'lenis'

export const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })
    
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const handleCustomScroll = (e: Event) => {
      const customEvent = e as CustomEvent;
      lenis.scrollTo(customEvent.detail.target, {
        duration: 2.5, // much slower
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // exponential easing
        offset: customEvent.detail.offset || -80
      })
    }
    
    window.addEventListener('custom-scroll-to', handleCustomScroll)

    return () => {
      window.removeEventListener('custom-scroll-to', handleCustomScroll)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
