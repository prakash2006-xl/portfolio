import { motion } from 'framer-motion'
import { GlassCard } from '../../shared/ui/GlassCard'
import { useCMSStore } from '../../store/cms.store'

export const Certifications = () => {
  const { certifications } = useCMSStore()

  if (!certifications || certifications.length === 0) return null

  return (
    <section id="certifications" className="relative w-full min-h-screen flex items-center justify-center py-24 px-6 z-10">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-12 text-primary">
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <GlassCard intensity="low" className="p-6 h-full flex flex-col hover:border-primary/50 transition-colors group relative overflow-hidden">
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noreferrer" className="absolute inset-0 z-20" aria-label={`View ${cert.name}`}></a>
                  )}
                  
                  {cert.image && (
                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden shrink-0 border border-white/5 bg-white/5">
                      <img 
                        src={cert.image} 
                        alt={cert.name} 
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 flex flex-col">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{cert.name}</h4>
                    <p className="text-primary text-sm font-medium">{cert.issuer}</p>
                    
                    <p className="text-sm text-gray-400 mt-4">{cert.date}</p>
                    
                    {cert.tags && cert.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                        {cert.tags.map(tag => (
                          <span key={tag} className="text-xs px-2.5 py-1 bg-white/5 text-gray-300 rounded-full border border-white/10 relative z-30">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
