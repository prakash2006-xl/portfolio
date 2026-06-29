import { create } from 'zustand'

interface UIState {
  isLoading: boolean
  setLoading: (state: boolean) => void
  activeSection: string
  setActiveSection: (section: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: true,
  setLoading: (state) => set({ isLoading: state }),
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
}))
