import { useState } from 'react'
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react'
import { useCMSStore } from '../../../../store/cms.store'
import type { Education } from '../../../../shared/types/cms.types'

export const EducationTab = () => {
  const { education, addEducation, updateEducation, removeEducation } = useCMSStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<Partial<Education>>({})

  const handleAdd = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: 'New Degree',
      institution: 'Institution Name',
      date: 'Start - End',
      details: 'Relevant details or GPA'
    }
    addEducation(newEdu)
    setEditingId(newEdu.id)
    setFormData(newEdu)
  }

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id)
    setFormData(edu)
  }

  const handleSave = () => {
    if (editingId && formData) {
      updateEducation(editingId, formData)
      setEditingId(null)
    }
  }

  if (editingId) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Edit Education</h3>
          <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Degree / Certificate</label>
          <input 
            type="text" 
            value={formData.degree || ''}
            onChange={(e) => setFormData({...formData, degree: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Institution</label>
          <input 
            type="text" 
            value={formData.institution || ''}
            onChange={(e) => setFormData({...formData, institution: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
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
          <label className="block text-sm font-medium text-gray-400 mb-1">Details (GPA, Coursework)</label>
          <input 
            type="text" 
            value={formData.details || ''}
            onChange={(e) => setFormData({...formData, details: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>

        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary text-black font-bold px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors mt-4"
        >
          <Save size={18} /> Save Education
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Education</h3>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/30 transition-colors text-sm font-medium"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="space-y-3">
        {education.map(edu => (
          <div key={edu.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
            <div>
              <h4 className="text-white font-medium">{edu.degree}</h4>
              <p className="text-sm text-gray-400">{edu.institution} • {edu.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleEdit(edu)}
                className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-md"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => removeEducation(edu.id)}
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
