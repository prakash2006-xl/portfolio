import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useCMSStore } from '../../../../store/cms.store'
import type { Skill } from '../../../../shared/types/cms.types'

export const SkillsTab = () => {
  const { skills, addSkill, removeSkill } = useCMSStore()
  
  const [newSkillName, setNewSkillName] = useState('')
  const [newSkillCategory, setNewSkillCategory] = useState('Languages')

  const categories = Array.from(new Set(skills.map(s => s.category)))
  if (!categories.includes('Languages')) categories.push('Languages')

  const handleAdd = () => {
    if (!newSkillName.trim()) return
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: newSkillName.trim(),
      category: newSkillCategory
    }
    addSkill(newSkill)
    setNewSkillName('')
  }

  // Group skills by category for display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Skills</h3>

      {/* Add New Skill Form */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-gray-400 mb-3">Add New Skill</h4>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Skill name (e.g. React)"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
          />
          <select
            value={newSkillCategory}
            onChange={(e) => setNewSkillCategory(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary w-48"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option value="New Category">Add New Category...</option>
          </select>
          {newSkillCategory === 'New Category' && (
            <input 
              type="text" 
              placeholder="Custom Category"
              onChange={(e) => setNewSkillCategory(e.target.value)}
              className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
            />
          )}
          <button 
            onClick={handleAdd}
            className="bg-primary text-black font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, catSkills]) => (
          <div key={category}>
            <h4 className="text-white font-medium mb-3 border-b border-white/10 pb-2">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {catSkills.map(skill => (
                <div key={skill.id} className="group flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-3 pr-1 py-1">
                  <span className="text-sm text-gray-300">{skill.name}</span>
                  <button 
                    onClick={() => removeSkill(skill.id)}
                    className="p-1 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all rounded-full hover:bg-red-400/10"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
