import { motion } from 'framer-motion'
import { GlassCard } from '../../shared/ui/GlassCard'
import { useCMSStore } from '../../store/cms.store'

export const Skills = () => {
  const skills = useCMSStore((state) => state.skills)
  
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof skills>)

  const categories = Object.keys(groupedSkills)

  return (
    <section id="skills" className="relative w-full min-h-[80vh] flex flex-col items-center justify-center py-24 px-6 z-10">
      <div className="max-w-6xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-display font-bold mb-16 text-accent text-right"
        >
          Technical Arsenal
        </motion.h2>

        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1, duration: 0.6 }}
            >
              <h3 className="text-2xl font-sans font-semibold text-white/80 mb-6 border-b border-white/10 pb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-4">
                {groupedSkills[category].map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (catIndex * 0.1) + (index * 0.05), duration: 0.5 }}
                  >
                    <GlassCard intensity="low" className="px-6 py-3 hover:border-accent hover:bg-accent/10 transition-colors duration-300">
                      <span className="text-lg font-sans text-white tracking-wide">{skill.name}</span>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
