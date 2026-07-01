import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: 'dark' | 'light'
  toggleTheme: () => void
  hasSelectedTheme: boolean
  setHasSelectedTheme: (val: boolean) => void
  cursorVariant: 'default' | 'hover' | 'hidden'
  setCursorVariant: (variant: 'default' | 'hover' | 'hidden') => void
  
  // Animation settings
  enableParticles: boolean;
  enablePostProcessing: boolean;
  enableFloatingObjects: boolean;
  backgroundTheme: string;
  threeDTemplate: string;
  setAnimationSetting: (key: 'enableParticles' | 'enablePostProcessing' | 'enableFloatingObjects', value: boolean) => void;
  setBackgroundTheme: (theme: string) => void;
  setThreeDTemplate: (template: string) => void;
  activeFloatingObjects: string[];
  toggleFloatingObject: (objectId: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      hasSelectedTheme: false,
      setHasSelectedTheme: (val) => set({ hasSelectedTheme: val }),
      cursorVariant: 'default',
      setCursorVariant: (variant) => set({ cursorVariant: variant }),
      
      enableParticles: false,
      enablePostProcessing: false,
      enableFloatingObjects: false,
      backgroundTheme: 'professional', // 'professional' | 'particles' | 'aurora' | 'cybergrid'
      threeDTemplate: 'none', // 'none' | 'particles' | 'stars' | 'sparkles' | 'cloud'
      setAnimationSetting: (key, value) => set({ [key]: value }),
      setBackgroundTheme: (theme) => set({ backgroundTheme: theme }),
      setThreeDTemplate: (template) => set({ threeDTemplate: template }),
      activeFloatingObjects: ['torus', 'icosahedron'],
      toggleFloatingObject: (objectId) => set((state) => {
        const isActive = state.activeFloatingObjects.includes(objectId)
        if (isActive) {
          return { activeFloatingObjects: state.activeFloatingObjects.filter(id => id !== objectId) }
        } else {
          return { activeFloatingObjects: [...state.activeFloatingObjects, objectId] }
        }
      }),
    }),
    {
      name: 'portfolio-theme-storage',
    }
  )
)
