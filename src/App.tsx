import { RootLayout } from './app/layouts/RootLayout'
import { Hero } from './modules/hero/Hero'
import { About } from './modules/about/About'
import { Skills } from './modules/skills/Skills'
import { Projects } from './modules/projects/Projects'
import { Experience } from './modules/experience/Experience'
import { useCMSStore } from './store/cms.store'

const sectionComponents: Record<string, React.FC> = {
  about: About,
  skills: Skills,
  projects: Projects,
  experience: Experience,
}

function App() {
  const sectionOrder = useCMSStore((state) => state.sectionOrder) || ['about', 'skills', 'projects', 'experience']

  return (
    <RootLayout>
      <Hero />
      {sectionOrder.map((sectionKey) => {
        const Component = sectionComponents[sectionKey]
        return Component ? <Component key={sectionKey} /> : null
      })}
    </RootLayout>
  )
}

export default App
