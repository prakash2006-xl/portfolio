import { motion } from 'framer-motion'
import { useCMSStore } from '../../../../store/cms.store'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { useMemo } from 'react'

const DEFAULT_SECTION_ORDER = ['about', 'skills', 'projects', 'liveProjects', 'certifications', 'experience']

export const LayoutTab = () => {
  const { sectionOrder: rawSectionOrder, setSectionOrder } = useCMSStore()

  const currentOrder = useMemo(() => {
    const base = rawSectionOrder?.length ? rawSectionOrder : DEFAULT_SECTION_ORDER
    const missing = DEFAULT_SECTION_ORDER.filter(s => !base.includes(s))
    return missing.length > 0 ? [...base, ...missing] : base
  }, [rawSectionOrder])

  const displayNames: Record<string, string> = {
    about: 'About Me',
    skills: 'Skills',
    projects: 'Projects',
    liveProjects: 'Live Projects',
    certifications: 'Certifications',
    experience: 'Experience'
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const newOrder = [...currentOrder]
    const temp = newOrder[index - 1]
    newOrder[index - 1] = newOrder[index]
    newOrder[index] = temp
    setSectionOrder(newOrder)
  }

  const moveDown = (index: number) => {
    if (index === currentOrder.length - 1) return
    const newOrder = [...currentOrder]
    const temp = newOrder[index + 1]
    newOrder[index + 1] = newOrder[index]
    newOrder[index] = temp
    setSectionOrder(newOrder)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white font-display">Section Layout</h3>
      </div>
      
      <p className="text-gray-400 text-sm">
        Reorder the sections as they appear on your portfolio page. The Hero section is always fixed at the top.
      </p>

      <div className="space-y-3 mt-4">
        {currentOrder.map((section, index) => (
          <motion.div 
            key={section}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl p-4 shadow-sm"
          >
            <span className="text-white font-medium text-lg">{displayNames[section] || section}</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowUp size={18} className="text-primary" />
              </button>
              <button 
                onClick={() => moveDown(index)}
                disabled={index === currentOrder.length - 1}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowDown size={18} className="text-primary" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
