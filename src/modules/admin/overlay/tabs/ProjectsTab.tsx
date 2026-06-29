import { useState } from 'react'
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react'
import { useCMSStore } from '../../../../store/cms.store'
import type { Project } from '../../../../shared/types/cms.types'
import { ImageUploader } from '../../../../shared/ui/ImageUploader'

export const ProjectsTab = () => {
  const { projects, addProject, updateProject, removeProject } = useCMSStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<Partial<Project>>({})

  const handleAdd = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      date: 'Date',
      description: 'Short description',
      points: ['Describe features'],
      tags: ['React', 'TypeScript']
    }
    addProject(newProj)
    setEditingId(newProj.id)
    setFormData(newProj)
  }

  const handleEdit = (proj: Project) => {
    setEditingId(proj.id)
    setFormData(proj)
  }

  const handleSave = () => {
    if (editingId && formData) {
      updateProject(editingId, formData)
      setEditingId(null)
    }
  }

  if (editingId) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Edit Project</h3>
          <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input 
              type="text" 
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Live Demo URL (Optional)</label>
            <input 
              type="text" 
              value={formData.link || ''}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              placeholder="https://..."
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">GitHub URL (Optional)</label>
            <input 
              type="text" 
              value={formData.github || ''}
              onChange={(e) => setFormData({...formData, github: e.target.value})}
              placeholder="https://github.com/..."
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
          <input 
            type="text" 
            value={formData.description || ''}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>

        <div className="mb-4">
          <ImageUploader 
            label="Project Image (Optional)"
            value={formData.image || ''} 
            onChange={(url) => setFormData({...formData, image: url})} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Tags (Comma separated)</label>
          <input 
            type="text" 
            value={formData.tags?.join(', ') || ''}
            onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim())})}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Bullet Points (One per line)</label>
          <textarea 
            value={formData.points?.join('\n') || ''}
            onChange={(e) => setFormData({...formData, points: e.target.value.split('\n').filter(p => p.trim() !== '')})}
            rows={4}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
        </div>

        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary text-black font-bold px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors mt-4"
        >
          <Save size={18} /> Save Project
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Projects</h3>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/30 transition-colors text-sm font-medium"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(proj => (
          <div key={proj.id} className="flex flex-col justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors h-full">
            <div>
              <div className="flex items-start justify-between mb-1">
                <h4 className="text-white font-medium">{proj.title}</h4>
                <div className="flex gap-1">
                  {proj.image && <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded border border-primary/20" title="Has Image">🖼️</span>}
                  {proj.link && <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded border border-primary/20" title="Has Live Demo">🔗</span>}
                  {proj.github && <span className="text-[10px] bg-white/10 text-white px-1.5 py-0.5 rounded border border-white/10" title="Has GitHub">🐙</span>}
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-3">{proj.date}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {proj.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 bg-white/10 text-gray-300 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <button 
                onClick={() => handleEdit(proj)}
                className="flex-[2] flex items-center justify-center gap-2 py-1.5 text-primary hover:text-white transition-colors bg-primary/10 hover:bg-primary/20 rounded-md font-medium text-sm"
              >
                <Edit2 size={14} /> Edit / Add Links
              </button>
              <button 
                onClick={() => removeProject(proj.id)}
                className="flex-1 flex justify-center py-1.5 text-red-400 hover:text-red-300 transition-colors bg-red-400/10 hover:bg-red-400/20 rounded-md"
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
