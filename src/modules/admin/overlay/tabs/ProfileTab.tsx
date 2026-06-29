import { useState } from 'react'
import { Save } from 'lucide-react'
import { useCMSStore } from '../../../../store/cms.store'

export const ProfileTab = () => {
  const { profile, updateProfile } = useCMSStore()
  const [localProfile, setLocalProfile] = useState(profile)

  const handleSave = () => {
    updateProfile(localProfile)
    alert('Profile saved successfully!')
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Edit Profile</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
          <input 
            type="text" 
            value={localProfile.firstName || ''}
            onChange={(e) => setLocalProfile({...localProfile, firstName: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Middle Name</label>
          <input 
            type="text" 
            value={localProfile.middleName || ''}
            onChange={(e) => setLocalProfile({...localProfile, middleName: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
          <input 
            type="text" 
            value={localProfile.lastName || ''}
            onChange={(e) => setLocalProfile({...localProfile, lastName: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Taglines (Comma separated)</label>
        <input 
          type="text" 
          value={localProfile.taglines?.join(', ')}
          onChange={(e) => setLocalProfile({...localProfile, taglines: e.target.value.split(',').map(t => t.trim())})}
          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Summary</label>
        <textarea 
          value={localProfile.summary}
          onChange={(e) => setLocalProfile({...localProfile, summary: e.target.value})}
          rows={5}
          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
          <input 
            type="email" 
            value={localProfile.email}
            onChange={(e) => setLocalProfile({...localProfile, email: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
          <input 
            type="text" 
            value={localProfile.phone}
            onChange={(e) => setLocalProfile({...localProfile, phone: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
        <input 
          type="text" 
          value={localProfile.location}
          onChange={(e) => setLocalProfile({...localProfile, location: e.target.value})}
          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">LinkedIn URL</label>
          <input 
            type="text" 
            value={localProfile.linkedin}
            onChange={(e) => setLocalProfile({...localProfile, linkedin: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">GitHub URL</label>
          <input 
            type="text" 
            value={localProfile.github || ''}
            onChange={(e) => setLocalProfile({...localProfile, github: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Twitter/X URL</label>
          <input 
            type="text" 
            value={localProfile.twitter || ''}
            onChange={(e) => setLocalProfile({...localProfile, twitter: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Resume URL</label>
          <input 
            type="text" 
            value={localProfile.resume || ''}
            onChange={(e) => setLocalProfile({...localProfile, resume: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>
      </div>

      <button 
        onClick={handleSave}
        className="flex items-center gap-2 bg-primary text-black font-bold px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors mt-4"
      >
        <Save size={18} /> Save Profile
      </button>
    </div>
  )
}
