import { motion } from 'framer-motion'
import { GlassCard } from '../../shared/ui/GlassCard'
import { useCMSStore } from '../../store/cms.store'

export const Experience = () => {
  const { experience, education } = useCMSStore()

  return (
    <section id="experience" className="relative w-full min-h-screen flex flex-col items-center py-24 px-6 z-10">
      <div className="max-w-4xl w-full">
        
        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <div className="mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-display font-bold mb-12 text-primary text-center"
            >
              Experience
            </motion.h2>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
              {experience.map((exp, index) => (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black/50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <div className="w-3 h-3 bg-primary rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  </div>
                  <GlassCard intensity="medium" className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 hover:border-primary/50 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                      <h3 className="font-display font-bold text-xl text-white">{exp.role}</h3>
                      <span className="text-primary text-sm whitespace-nowrap mt-1 sm:mt-0">{exp.date}</span>
                    </div>
                    <p className="text-gray-300 font-medium mb-1">{exp.company}</p>
                    <p className="text-gray-500 text-sm mb-4">{exp.location}</p>
                    <ul className="space-y-2">
                      {exp.points.map((point, i) => (
                        <li key={i} className="text-gray-400 text-sm flex items-start">
                          <span className="text-primary mr-2 mt-1">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <div id="education">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-display font-bold mb-12 text-secondary text-center"
            >
              Education
            </motion.h2>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <GlassCard intensity="low" className="p-6 border-l-4 border-l-secondary hover:bg-secondary/5 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                      <h3 className="font-display font-bold text-lg text-white">{edu.degree}</h3>
                      <span className="text-secondary text-sm whitespace-nowrap mt-2 md:mt-0 bg-secondary/10 px-3 py-1 rounded-full">{edu.date}</span>
                    </div>
                    <p className="text-gray-300 mb-2">{edu.institution}</p>
                    <p className="text-gray-400 text-sm font-mono">{edu.details}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
