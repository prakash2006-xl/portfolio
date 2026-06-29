import { useState } from 'react'
import { supabase } from '../../services/supabase/client'
import { GlassCard } from '../../shared/ui/GlassCard'
import { useAuthStore } from '../../store/auth.store'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, setIsAdmin } = useAuthStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
    } else if (data.user) {
      setUser(data.user)
      setIsAdmin(true)
    }
    
    setLoading(false)
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-transparent font-sans">
      <GlassCard intensity="high" className="w-full max-w-md p-8 md:p-10">
        <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">Admin Access</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/80 text-background font-bold py-3 px-4 rounded-lg transition-colors mt-4"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </GlassCard>
    </div>
  )
}
