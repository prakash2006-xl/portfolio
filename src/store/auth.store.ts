import { create } from 'zustand'

interface AuthState {
  user: any | null
  setUser: (user: any | null) => void
  isAdmin: boolean
  setIsAdmin: (isAdmin: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAdmin: false,
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}))
