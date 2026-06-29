import { useCMSStore } from '../../../../store/cms.store'

const AVAILABLE_FONTS = [
  { name: 'Default Sans', value: '' },
  { name: 'Inter', value: '"Inter", sans-serif' },
  { name: 'Playfair Display (Serif)', value: '"Playfair Display", serif' },
  { name: 'Space Mono (Monospace)', value: '"Space Mono", monospace' },
  { name: 'Outfit (Modern)', value: '"Outfit", sans-serif' },
  { name: 'Cinzel (Elegant)', value: '"Cinzel", serif' },
]

export const TypographyTab = () => {
  const { sectionFonts, setSectionFont, sectionOrder } = useCMSStore()

  // Display names matching LayoutTab
  const displayNames: Record<string, string> = {
    about: 'About Me',
    skills: 'Skills',
    projects: 'Projects',
    liveProjects: 'Live Projects',
    certifications: 'Certifications',
    experience: 'Experience'
  }

  // Ensure all possible sections are editable, or just the ones in current sectionOrder
  const sectionsToEdit = sectionOrder?.length > 0 ? sectionOrder : Object.keys(displayNames)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white font-display">Typography Settings</h3>
      </div>
      
      <p className="text-gray-400 text-sm mb-4">
        Customize the font family for each section of your portfolio.
      </p>

      <div className="space-y-4">
        {sectionsToEdit.map((sectionId) => (
          <div key={sectionId} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <span className="text-white font-medium text-base w-1/3">
              {displayNames[sectionId] || sectionId}
            </span>
            
            <select
              value={sectionFonts[sectionId] || ''}
              onChange={(e) => setSectionFont(sectionId, e.target.value)}
              className="w-2/3 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-primary text-sm"
              style={{ fontFamily: sectionFonts[sectionId] || 'inherit' }}
            >
              {AVAILABLE_FONTS.map(font => (
                <option key={font.name} value={font.value} style={{ fontFamily: font.value || 'inherit' }}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
