import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export const LiveStars = () => {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((_state, delta) => {
    if (groupRef.current) {
      // Slow rotation for the entire galaxy
      groupRef.current.rotation.y -= delta * 0.04
      groupRef.current.rotation.x -= delta * 0.015
      groupRef.current.rotation.z -= delta * 0.005
    }
  })

  return (
    <group ref={groupRef}>
      {/* Deep background static-ish stars */}
      <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={2} />
      
      {/* Closer dynamic sparkles passing by */}
      <Sparkles count={400} scale={40} size={4} speed={0.5} color="#ffffff" opacity={0.6} />
      <Sparkles count={200} scale={25} size={6} speed={1.0} color="#00e5ff" opacity={0.8} />
      <Sparkles count={100} scale={15} size={10} speed={1.5} color="#2dd4bf" opacity={0.9} />
    </group>
  )
}
