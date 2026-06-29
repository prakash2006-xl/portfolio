import { AdaptiveDpr, AdaptiveEvents, Stars, Sparkles, Cloud } from '@react-three/drei'
import { BackgroundShader } from '../shaders/BackgroundShader'
import { GPUParticles } from '../particles/GPUParticles'
import { FloatingObjects } from './FloatingObjects'
import { PostProcessingEffects } from '../postprocessing/PostProcessingEffects'
import { useThemeStore } from '../../store/theme.store'
import { NeuronGraphic } from '../templates/NeuronGraphic'
import { DeepSea } from '../templates/DeepSea'
import { LiveStars } from '../templates/LiveStars'

export const HeroScene = () => {
  const { enableParticles, enableFloatingObjects, enablePostProcessing, backgroundTheme, threeDTemplate } = useThemeStore()
  
  return (
    <>
      {backgroundTheme === 'particles' && <color attach="background" args={['#050816']} />}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Performance Optimization */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <BackgroundShader />
      
      {/* 3D Template Rendering */}
      {enableParticles && threeDTemplate === 'particles' && <GPUParticles />}
      {enableParticles && threeDTemplate === 'stars' && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
      {enableParticles && threeDTemplate === 'sparkles' && <Sparkles count={800} scale={15} size={6} speed={0.4} color="#00e5ff" />}
      {enableParticles && threeDTemplate === 'cloud' && <Cloud position={[0, 0, -10]} scale={1.5} speed={0.2} opacity={0.5} />}
      {enableParticles && threeDTemplate === 'neuron' && <NeuronGraphic />}
      {enableParticles && threeDTemplate === 'deep-sea' && <DeepSea />}
      {enableParticles && threeDTemplate === 'live-stars' && <LiveStars />}

      {enableFloatingObjects && <FloatingObjects />}
      {enablePostProcessing && <PostProcessingEffects />}
    </>
  )
}

