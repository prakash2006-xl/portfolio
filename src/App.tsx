import { RootLayout } from './app/layouts/RootLayout'
import { Hero } from './modules/hero/Hero'
import { About } from './modules/about/About'
import { Skills } from './modules/skills/Skills'
import { Projects } from './modules/projects/Projects'
import { LiveProjects } from './modules/projects/LiveProjects'
import { Experience } from './modules/experience/Experience'
import { Certifications } from './modules/certifications/Certifications'
import { useCMSStore } from './store/cms.store'

const sectionComponents: Record<string, React.FC> = {
  about: About,
  skills: Skills,
  projects: Projects,
  liveProjects: LiveProjects,
  certifications: Certifications,
  experience: Experience,
}

import { useMemo } from 'react'

const DEFAULT_SECTION_ORDER = ['about', 'skills', 'projects', 'liveProjects', 'certifications', 'experience']
const DEFAULT_SECTION_FONTS: Record<string, string> = {}

function App() {
  const rawSectionOrder = useCMSStore((state) => state.sectionOrder?.length ? state.sectionOrder : DEFAULT_SECTION_ORDER)
  const sectionFonts = useCMSStore((state) => state.sectionFonts || DEFAULT_SECTION_FONTS)

  const sectionOrder = useMemo(() => {
    const missing = DEFAULT_SECTION_ORDER.filter(s => !rawSectionOrder.includes(s))
    return missing.length > 0 ? [...rawSectionOrder, ...missing] : rawSectionOrder
  }, [rawSectionOrder])

  return (
    <RootLayout>
      <Hero />
      {sectionOrder.map((sectionKey) => {
        const Component = sectionComponents[sectionKey]
        if (!Component) return null
        
        return (
          <div key={sectionKey} style={{ fontFamily: sectionFonts[sectionKey] || 'inherit' }}>
            <Component />
          </div>
        )
      })}
    </RootLayout>
  )
}

export default App
