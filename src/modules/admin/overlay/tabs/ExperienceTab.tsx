import { useState } from 'react'
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react'
import { useCMSStore } from '../../../../store/cms.store'
import type { Experience } from '../../../../shared/types/cms.types'

export const ExperienceTab = () => {
  const { experience, addExperience, updateExperience, removeExperience } = useCMSStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<Partial<Experience>>({})

  const handleAdd = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      role: 'New Role',
      company: 'Company Name',
      location: 'Location',
      date: 'Start - End',
      points: ['Describe what you did']
    }
    addExperience(newExp)
    setEditingId(newExp.id)
    setFormData(newExp)
  }

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id)
    setFormData(exp)
  }

  const handleSave = () => {
    if (editingId && formData) {
      const cleanedData = {
        ...formData,
        points: formData.points?.filter(p => p.trim() !== '') || []
      }
      updateExperience(editingId, cleanedData)
      setEditingId(null)
    }
  }

  if (editingId) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Edit Experience</h3>
          <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
          <input 
            type="text" 
            value={formData.role || ''}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
            <input 
              type="text" 
              value={formData.company || ''}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
            <input 
              type="text" 
              value={formData.location || ''}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
          <input 
            type="text" 
            value={formData.date || ''}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Bullet Points (One per line)</label>
          <textarea 
            value={formData.points?.join('\n') || ''}
            onChange={(e) => setFormData({...formData, points: e.target.value.split('\n')})}
            rows={5}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>

        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary text-black font-bold px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors mt-4"
        >
          <Save size={18} /> Save Experience
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Experience</h3>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/30 transition-colors text-sm font-medium"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="space-y-3">
        {experience.map(exp => (
          <div key={exp.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
            <div>
              <h4 className="text-white font-medium">{exp.role}</h4>
              <p className="text-sm text-gray-400">{exp.company} • {exp.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleEdit(exp)}
                className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-md"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => removeExperience(exp.id)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors bg-red-400/10 hover:bg-red-400/20 rounded-md"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
