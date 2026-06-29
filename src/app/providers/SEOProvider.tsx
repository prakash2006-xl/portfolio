import type { ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'

export const SEOProvider = ({ children }: { children: ReactNode }) => {
  return (
    <HelmetProvider>
      {children}
    </HelmetProvider>
  )
}
