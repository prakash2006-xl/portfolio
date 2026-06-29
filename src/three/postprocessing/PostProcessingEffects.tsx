import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

export const PostProcessingEffects = () => {
  return (
    <EffectComposer multisampling={0}>
      <Bloom 
        luminanceThreshold={0.5} 
        mipmapBlur 
        intensity={0.8} 
      />
      <ChromaticAberration 
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.001, 0.001)}
      />
      <Noise opacity={0.015} />
      <Vignette eskil={false} offset={0.1} darkness={0.9} />
    </EffectComposer>
  )
}
