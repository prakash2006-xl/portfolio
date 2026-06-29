import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryProvider } from './app/providers/QueryProvider'
import { SEOProvider } from './app/providers/SEOProvider'
import { AppRouter } from './app/router'
import './app/config/i18n'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <SEOProvider>
        <AppRouter />
      </SEOProvider>
    </QueryProvider>
  </StrictMode>,
)
