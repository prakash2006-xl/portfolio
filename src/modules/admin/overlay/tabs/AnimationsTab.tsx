import { useThemeStore } from '../../../../store/theme.store'

export const AnimationsTab = () => {
  const { enableParticles, enableFloatingObjects, enablePostProcessing, setAnimationSetting, backgroundTheme, setBackgroundTheme, activeFloatingObjects, toggleFloatingObject } = useThemeStore()

  const themes = [
    { id: 'particles', name: '3D Dust Particles', desc: 'Classic floating particles in 3D space.' },
    { id: 'aurora', name: 'Aurora Borealis', desc: 'Flowing animated CSS gradient waves.' },
    { id: 'holographic', name: 'Holographic', desc: 'Iridescent glossy animated gradient.' },
    { id: 'starlight', name: 'Starlight', desc: 'Twinkling animated star field.' },
    { id: 'lava-lamp', name: 'Lava Lamp', desc: 'Slow moving soft liquid blobs.' },
    { id: 'quantum', name: 'Quantum', desc: 'High-tech flowing energy lines.' },
    { id: 'zen-garden', name: 'Zen Garden', desc: 'Calm and slow moving pastel flow.' },
    { id: 'cosmic-dust', name: 'Cosmic Dust', desc: 'Deep space rotating galaxy vibe.' },
    { id: 'liquid-metal', name: 'Liquid Metal', desc: 'Smooth silver and chrome flowing metal.' },
    { id: 'nebula', name: 'Nebula Mist', desc: 'Slow rotating cosmic color clouds.' },
    { id: 'soft-clouds', name: 'Soft Clouds', desc: 'Gentle, light blue pastel gradient.' },
    { id: 'midnight-blue', name: 'Midnight Blue', desc: 'Deep, rich blue with a subtle shift.' },
    { id: 'frost', name: 'Frost', desc: 'Crisp, icy white and light blue.' },
    { id: 'warm-sand', name: 'Warm Sand', desc: 'Earthy, comforting beige and sand tones.' },
    { id: 'emerald-depths', name: 'Emerald Depths', desc: 'Dark, rich green water-like gradient.' },
    { id: 'silk', name: 'Silk', desc: 'Smooth flowing dark maroon and purple.' },
    { id: 'monochrome-shift', name: 'Monochrome Shift', desc: 'Sophisticated dark grays panning slowly.' },
    { id: 'golden-hour', name: 'Golden Hour', desc: 'Warm sunset oranges and yellows.' },
    { id: 'abyss', name: 'Abyss', desc: 'Pure black with faint, deep purple accents.' },
    { id: 'ocean-breeze', name: 'Ocean Breeze', desc: 'Light cyan to soft purple pastel blend.' }
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Background Themes</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setBackgroundTheme(t.id)}
            className={`flex flex-col text-left p-4 rounded-lg border transition-all ${backgroundTheme === t.id ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
          >
            <span className={`font-bold mb-1 ${backgroundTheme === t.id ? 'text-primary' : 'text-white'}`}>{t.name}</span>
            <span className="text-xs text-gray-400">{t.desc}</span>
          </button>
        ))}
      </div>

      <h3 className="text-xl font-bold text-white mb-4">3D Engine Templates</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          { id: 'particles', name: 'GPU Particles', desc: 'Custom optimized thousands of floating particles.' },
          { id: 'stars', name: 'Deep Space Stars', desc: 'A static field of 3D stars using Drei.' },
          { id: 'cloud', name: 'Volumetric Cloud', desc: 'A large, slowly moving 3D cloud structure.' },
          { id: 'neuron', name: 'Neural Network', desc: 'Tech-focused interconnected AI node graphics.' },
          { id: 'deep-sea', name: 'Deep Sea', desc: 'Calm underwater floating bubble mechanics.' },
          { id: 'live-stars', name: 'Live Stars', desc: 'Dynamic, moving galaxy with passing sparkles.' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => useThemeStore.getState().setThreeDTemplate(t.id)}
            className={`flex flex-col text-left p-4 rounded-lg border transition-all ${useThemeStore.getState().threeDTemplate === t.id ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
          >
            <span className={`font-bold mb-1 ${useThemeStore.getState().threeDTemplate === t.id ? 'text-primary' : 'text-white'}`}>{t.name}</span>
            <span className="text-xs text-gray-400">{t.desc}</span>
          </button>
        ))}
      </div>

      <h3 className="text-xl font-bold text-white mb-4">3D Rendering Settings</h3>
      
      <div className="space-y-4">
        <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
          <div>
            <span className="block text-white font-medium">GPU Particles</span>
            <span className="block text-sm text-gray-400">Thousands of floating dust particles in the background.</span>
          </div>
          <input 
            type="checkbox" 
            checked={enableParticles}
            onChange={(e) => setAnimationSetting('enableParticles', e.target.checked)}
            className="w-5 h-5 accent-primary"
          />
        </label>

        <div className="flex flex-col gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
          <label className="flex items-center justify-between cursor-pointer group">
            <div>
              <span className="block text-white font-medium">Floating Objects Master</span>
              <span className="block text-sm text-gray-400">Enable or disable all floating 3D objects.</span>
            </div>
            <input 
              type="checkbox" 
              checked={enableFloatingObjects}
              onChange={(e) => setAnimationSetting('enableFloatingObjects', e.target.checked)}
              className="w-5 h-5 accent-primary"
            />
          </label>
          
          {enableFloatingObjects && (
            <div className="pt-4 border-t border-white/10 mt-2">
              <span className="block text-sm font-medium text-white mb-3">Select Objects:</span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: 'torus', name: 'Purple Torus' },
                  { id: 'icosahedron', name: 'Cyan Icosahedron' },
                  { id: 'torusKnot', name: 'Golden Knot' },
                  { id: 'octahedron', name: 'Pink Octahedron' },
                  { id: 'dodecahedron', name: 'Green Dodecahedron' },
                  { id: 'cone', name: 'Silver Cone' },
                  { id: 'neuralBrain', name: 'Neural Brain' },
                  { id: 'aiCore', name: 'AI Bot Core' },
                  { id: 'techAtom', name: 'Neon Tech Atom' },
                  { id: 'holoCube', name: 'Holographic Cube' },
                  { id: 'dnaHelix', name: 'DNA Helix' }
                ].map(obj => (
                  <label key={obj.id} className="flex items-center gap-3 p-3 bg-black/40 border border-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={activeFloatingObjects?.includes(obj.id) ?? false}
                      onChange={() => toggleFloatingObject(obj.id)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-gray-300">{obj.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
          <div>
            <span className="block text-white font-medium">Post Processing Effects</span>
            <span className="block text-sm text-gray-400">Bloom, Vignette, and Chromatic Aberration.</span>
          </div>
          <input 
            type="checkbox" 
            checked={enablePostProcessing}
            onChange={(e) => setAnimationSetting('enablePostProcessing', e.target.checked)}
            className="w-5 h-5 accent-primary"
          />
        </label>
      </div>
    </div>
  )
}
