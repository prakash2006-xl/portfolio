import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, Settings } from 'lucide-react'
import { supabase } from '../../../services/supabase/client'
import { ProfileTab } from './tabs/ProfileTab'
import { ExperienceTab } from './tabs/ExperienceTab'
import { ProjectsTab } from './tabs/ProjectsTab'
import { SkillsTab } from './tabs/SkillsTab'
import { EducationTab } from './tabs/EducationTab'
import { AnimationsTab } from './tabs/AnimationsTab'
import { LayoutTab } from './tabs/LayoutTab'
import { CertificationsTab } from './tabs/CertificationsTab'
import { LiveProjectsTab } from './tabs/LiveProjectsTab'
import { TypographyTab } from './tabs/TypographyTab'

interface EditorOverlayProps {
  onClose: () => void
}

export const EditorOverlay = ({ onClose }: EditorOverlayProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('12345678')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (authError) {
      setError(authError.message)
    } else if (data.user) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, damping: 25, stiffness: 300 } }
  }

  return (
    <motion.div 
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-8"
    >
      <motion.div 
        variants={modalVariants}
        className="bg-[#0b0c10]/90 border border-white/10 rounded-2xl w-full max-w-5xl h-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden relative backdrop-blur-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:px-8 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-display text-white tracking-wide">Settings Dashboard</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            /* Password Screen */
            <motion.div 
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto hide-scrollbar"
            >
              <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-2xl max-w-md w-full text-center shadow-xl backdrop-blur-lg my-auto">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Admin Access</h3>
                <p className="text-gray-400 mb-8 text-sm">Please enter the passcode to access settings.</p>
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter admin email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-center tracking-widest text-lg"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Enter password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-center tracking-widest text-lg"
                      required
                    />
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-teal-400 text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-50">
                    {loading ? 'Authenticating...' : 'Unlock Settings'}
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            /* Editor Dashboard */
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col md:flex-row overflow-hidden"
            >
              {/* Sidebar Tabs */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/5 bg-black/20 p-4 md:p-6 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto hide-scrollbar shrink-0">
                {['profile', 'layout', 'typography', 'experience', 'projects', 'liveProjects', 'skills', 'education', 'certifications', 'animations'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-left px-5 py-3.5 rounded-xl capitalize font-medium transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab 
                        ? 'bg-primary text-black shadow-md shadow-primary/20 scale-[1.02]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-black/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'profile' && <ProfileTab />}
                    {activeTab === 'layout' && <LayoutTab />}
                    {activeTab === 'typography' && <TypographyTab />}
                    {activeTab === 'experience' && <ExperienceTab />}
                    {activeTab === 'projects' && <ProjectsTab />}
                    {activeTab === 'liveProjects' && <LiveProjectsTab />}
                    {activeTab === 'skills' && <SkillsTab />}
                    {activeTab === 'education' && <EducationTab />}
                    {activeTab === 'certifications' && <CertificationsTab />}
                    {activeTab === 'animations' && <AnimationsTab />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
