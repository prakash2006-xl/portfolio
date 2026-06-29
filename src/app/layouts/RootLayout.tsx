import type { ReactNode } from 'react'
import { CustomCursor } from '../../shared/ui/CustomCursor'
import { SmoothScrollProvider } from '../providers/SmoothScrollProvider'
import { NavBar } from './NavBar'
import { ThemeSelectorModal } from '../../shared/ui/ThemeSelectorModal'

import { useThemeStore } from '../../store/theme.store'

export const RootLayout = ({ children }: { children: ReactNode }) => {
  const { backgroundTheme } = useThemeStore()

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <NavBar />
      <div className={`w-full min-h-screen bg-background relative theme-${backgroundTheme}`}>
        {children}
      </div>
      <ThemeSelectorModal />
      {/* Footer will go here */}
    </SmoothScrollProvider>
  )
}

