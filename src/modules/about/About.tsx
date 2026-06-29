import { motion } from 'framer-motion'
import { GlassCard } from '../../shared/ui/GlassCard'
import { useCMSStore } from '../../store/cms.store'

export const About = () => {
  const { profile } = useCMSStore()

  return (
    <section id="about" className="relative w-full min-h-screen flex items-center justify-center py-24 px-6 z-10">
      <div className="max-w-6xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-display font-bold mb-12 text-primary"
        >
          About Me
        </motion.h2>
        
        <GlassCard intensity="medium" className="p-6 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {profile.profileImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-white/10 shadow-[0_0_30px_rgba(45,212,191,0.2)] bg-black/50"
            >
              <img 
                src={profile.profileImage} 
                alt={`${profile.firstName} Profile`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="flex-1"
          >
            <p className="text-lg md:text-2xl leading-relaxed text-gray-300">
              {profile.summary}
            </p>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  )
}
