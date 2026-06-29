import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float d = length(p);
    
    // Simple nebula/energy wave effect
    vec3 color1 = vec3(0.0, 0.898, 1.0); // #00E5FF
    vec3 color2 = vec3(0.486, 0.227, 0.929); // #7C3AED
    
    float wave = sin(d * 10.0 - uTime * 2.0) * 0.5 + 0.5;
    vec3 finalColor = mix(color1, color2, wave) * (1.0 - d);
    
    gl_FragColor = vec4(finalColor * 0.15, 1.0); // Keep it very dark
  }
`

export const BackgroundShader = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh position={[0, 0, -20]}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 }
        }}
        depthWrite={false}
      />
    </mesh>
  )
}
