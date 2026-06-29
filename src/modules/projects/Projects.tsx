import { motion } from 'framer-motion'
import { GlassCard } from '../../shared/ui/GlassCard'
import { useCMSStore } from '../../store/cms.store'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'
import { ExternalLink } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

type ProgressSlide = HTMLElement & {
  progress?: number
}

const updateCircularProjectSlides = (swiper: SwiperClass) => {
  swiper.slides.forEach((slideElement) => {
    const slide = slideElement as ProgressSlide
    const progress = Math.max(-3, Math.min(3, slide.progress ?? 0))
    const distance = Math.abs(progress)
    const isActive = distance < 0.45
    const scale = Math.max(0.78, 1 - distance * 0.09)
    const y = distance * 34
    const rotate = progress * -4.5
    const zIndex = `${100 - Math.round(distance * 10)}`
    const opacity = `${Math.max(0.35, 1 - distance * 0.22)}`
    const glow = `${Math.max(0.16, 0.62 - distance * 0.16)}`

    slide.style.zIndex = zIndex
    slide.style.opacity = opacity
    slide.style.setProperty('--project-card-glow', glow)
    slide.style.setProperty('--project-card-lift', isActive ? '-10px' : '0px')
    slide.style.transform = `translate3d(0, ${y}px, 0) rotateZ(${rotate}deg) scale(${scale})`
  })
}

export const Projects = () => {
  const projects = useCMSStore((state) => state.projects)
  const projectLoopItems = projects.length > 0
    ? Array.from({ length: Math.max(1, Math.ceil(9 / projects.length)) }, () => projects).flat()
    : []

  return (
    <section id="projects" className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 z-10 overflow-hidden">
      <div className="w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-display font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          Featured Work
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full"
        >
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            speed={6000}
            spaceBetween={-18}
            watchSlidesProgress={true}
            roundLengths={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onBeforeInit={updateCircularProjectSlides}
            onProgress={updateCircularProjectSlides}
            onSetTransition={(swiper, duration) => {
              swiper.slides.forEach((slide) => {
                slide.style.transitionDuration = `${duration}ms`
              })
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Pagination, Autoplay]}
            className="project-swiper w-full max-w-7xl !pb-20 !pt-12 px-4"
          >
            {projectLoopItems.map((project, idx) => (
              <SwiperSlide key={`${project.id}-${idx}`} className="!w-[280px] md:!w-[400px] lg:!w-[450px] will-change-transform flex">
                <div className="project-card-shell group h-full w-full relative flex">
                  <div className="project-ambient-glow absolute -inset-2 rounded-3xl blur-2xl opacity-[var(--project-card-glow)] transition-opacity duration-700"></div>
                  
                  <GlassCard intensity="high" className="project-card flex-1 min-h-[550px] p-5 md:p-8 flex flex-col justify-between overflow-hidden relative rounded-2xl border border-white/10 bg-black/45 hover:bg-black/25">
                    
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,229,255,0.16),transparent_34%),radial-gradient(circle_at_90%_20%,rgba(16,185,129,0.13),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.07),transparent_45%)] opacity-80 transition-opacity duration-700 pointer-events-none group-hover:opacity-100" />
                    <div className="project-card-shine absolute inset-0 pointer-events-none" />
                    
                    <div className="relative z-10 h-full flex flex-col">
                      {project.image ? (
                        <div className="w-full h-36 md:h-48 mb-6 rounded-xl overflow-hidden relative border border-white/10 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all duration-500 shrink-0 bg-white/5">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        </div>
                      ) : (
                        <div className="w-full h-36 md:h-48 mb-6 rounded-xl overflow-hidden relative border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                          <span className="text-white/20 font-mono text-sm">No Image Provided</span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-teal-300 transition-all duration-500">
                          {project.title}
                        </h3>
                        <span className="self-start text-[10px] sm:text-xs font-mono tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full whitespace-nowrap border border-primary/30 shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                          {project.date}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed font-light line-clamp-3">
                        {project.description}
                      </p>
                      
                      <ul className="space-y-3 mb-8 overflow-y-auto pr-2 custom-scrollbar flex-1">
                        {project.points.map((point, i) => (
                          <li key={i} className="text-gray-400 text-sm flex items-start group-hover:text-gray-200 transition-colors duration-300">
                            <span className="text-primary mr-3 mt-1 text-lg leading-none group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.9)] transition-transform duration-300">•</span>
                            <span className="leading-snug">{point}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-white/10">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-xs font-medium text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          {project.link ? (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="flex-1 flex justify-center items-center gap-2 text-xs md:text-sm font-bold px-3 py-2 md:px-5 md:py-2.5 rounded-lg transition-all text-black bg-gradient-to-r from-primary to-teal-400 hover:opacity-90 shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:scale-105 hover:shadow-[0_0_30px_rgba(45,212,191,0.6)]"
                              title="Live Demo"
                            >
                              <ExternalLink size={16} /> Demo
                            </a>
                          ) : (
                            <span className="flex-1 flex justify-center items-center gap-2 text-xs md:text-sm font-bold px-3 py-2 md:px-5 md:py-2.5 rounded-lg transition-all text-gray-400 bg-white/5 border border-white/10 cursor-not-allowed opacity-50" title="Add link in settings">
                              <ExternalLink size={16} /> Demo
                            </span>
                          )}
                          
                          {project.github ? (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="flex-1 flex justify-center items-center gap-2 text-xs md:text-sm font-medium px-3 py-2 md:px-5 md:py-2.5 rounded-lg transition-all border backdrop-blur-md text-white bg-white/5 border-white/10 hover:bg-white/20 hover:scale-105"
                              title="GitHub Repository"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> Source
                            </a>
                          ) : (
                            <span className="flex-1 flex justify-center items-center gap-2 text-xs md:text-sm font-medium px-3 py-2 md:px-5 md:py-2.5 rounded-lg transition-all border backdrop-blur-md text-gray-400 bg-transparent border-white/5 cursor-not-allowed opacity-50" title="Add GitHub in settings">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> Source
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
      
      <style>{`
        .swiper-pagination-bullet {
          background-color: white !important;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          background-color: #2dd4bf !important;
          opacity: 1;
          box-shadow: 0 0 10px rgba(45,212,191,0.5);
        }
        .project-swiper {
          overflow: visible;
          perspective: 1100px;
        }
        .project-swiper .swiper-wrapper {
          align-items: stretch;
          transition-timing-function: linear !important;
        }
        .project-swiper .swiper-slide {
          height: auto;
          transform-origin: center bottom;
          transition-property: transform, opacity;
          transition-timing-function: linear;
        }
        .project-card-shell {
          transform: translateY(var(--project-card-lift, 0px));
          transition: transform 650ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .project-card {
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 18px 54px rgba(0,0,0,0.28);
          transform: translateZ(0);
          transition: border-color 450ms ease, background-color 450ms ease, box-shadow 450ms ease;
        }
        .project-card:hover {
          border-color: rgba(45, 212, 191, 0.36);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), 0 22px 72px rgba(0,229,255,0.16);
        }
        .project-ambient-glow {
          background: linear-gradient(110deg, rgba(0,229,255,0.55), rgba(45,212,191,0.35), rgba(16,185,129,0.5));
          animation: projectGlowPulse 4.5s ease-in-out infinite;
        }
        .project-card-shine {
          background: linear-gradient(115deg, transparent 16%, rgba(255,255,255,0.11) 34%, transparent 52%);
          transform: translateX(-120%);
          transition: transform 900ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .project-card-shell:hover .project-card-shine {
          transform: translateX(120%);
        }
        @keyframes projectGlowPulse {
          0%, 100% {
            filter: saturate(0.95);
            transform: scale(0.98);
          }
          50% {
            filter: saturate(1.25);
            transform: scale(1.03);
          }
        }
        @media (max-width: 767px) {
          .project-swiper {
            perspective: 800px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .project-swiper .swiper-slide,
          .project-swiper .swiper-wrapper,
          .project-card-shell,
          .project-card-shine,
          .project-ambient-glow {
            animation: none !important;
            transition-duration: 0ms !important;
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(45, 212, 191, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(45, 212, 191, 0.5);
        }
      `}</style>
    </section>
  )
}
