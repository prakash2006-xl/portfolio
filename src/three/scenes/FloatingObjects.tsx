import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useThemeStore } from '../../store/theme.store'
import { NeuralBrain } from '../objects/NeuralBrain'
import { AICore } from '../objects/AICore'
import { TechAtom } from '../objects/TechAtom'
import { HoloCube } from '../objects/HoloCube'
import { DNAHelix } from '../objects/DNAHelix'

export const FloatingObjects = () => {
  const groupRef = useRef<THREE.Group>(null)
  const activeFloatingObjects = useThemeStore((state) => state.activeFloatingObjects) || []
  
  const torusRef = useRef<THREE.Mesh>(null)
  const icosahedronRef = useRef<THREE.Mesh>(null)
  const torusKnotRef = useRef<THREE.Mesh>(null)
  const octahedronRef = useRef<THREE.Mesh>(null)
  const dodecahedronRef = useRef<THREE.Mesh>(null)
  const coneRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.2
      torusRef.current.rotation.y = t * 0.3
      torusRef.current.position.y = Math.sin(t) * 0.5
    }
    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x = -t * 0.1
      icosahedronRef.current.rotation.z = t * 0.2
      icosahedronRef.current.position.y = Math.sin(t + Math.PI) * 0.5
    }
    if (torusKnotRef.current) {
      torusKnotRef.current.rotation.y = t * 0.4
      torusKnotRef.current.position.y = Math.sin(t * 1.2) * 0.4
    }
    if (octahedronRef.current) {
      octahedronRef.current.rotation.z = t * 0.5
      octahedronRef.current.position.y = Math.sin(t * 0.8) * 0.6
    }
    if (dodecahedronRef.current) {
      dodecahedronRef.current.rotation.x = t * 0.3
      dodecahedronRef.current.rotation.y = t * 0.2
      dodecahedronRef.current.position.y = Math.sin(t * 1.5) * 0.3
    }
    if (coneRef.current) {
      coneRef.current.rotation.x = t * 0.4
      coneRef.current.rotation.z = t * 0.3
      coneRef.current.position.y = Math.sin(t * 1.1) * 0.5
    }
    
    // Smooth mouse follow
    if (groupRef.current) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.pointer.x * Math.PI) / 10, 0.05)
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (-state.pointer.y * Math.PI) / 10, 0.05)
    }
  })

  return (
    <group ref={groupRef}>
      {activeFloatingObjects.includes('torus') && (
        <mesh ref={torusRef} position={[-4, 1, -2]}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshPhysicalMaterial color="#7C3AED" roughness={0.1} metalness={0.8} clearcoat={1} transmission={0.5} />
        </mesh>
      )}
      
      {activeFloatingObjects.includes('icosahedron') && (
        <mesh ref={icosahedronRef} position={[4, 1, -2]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial color="#00E5FF" wireframe emissive="#00E5FF" emissiveIntensity={0.5} />
        </mesh>
      )}

      {activeFloatingObjects.includes('torusKnot') && (
        <mesh ref={torusKnotRef} position={[2.5, -2.5, -3]}>
          <torusKnotGeometry args={[0.7, 0.2, 64, 16]} />
          <meshPhysicalMaterial color="#F59E0B" roughness={0.2} metalness={0.9} clearcoat={0.5} />
        </mesh>
      )}

      {activeFloatingObjects.includes('octahedron') && (
        <mesh ref={octahedronRef} position={[-2.5, -2.5, -3]}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshPhysicalMaterial color="#EC4899" roughness={0} transmission={0.9} thickness={0.5} clearcoat={1} />
        </mesh>
      )}

      {activeFloatingObjects.includes('dodecahedron') && (
        <mesh ref={dodecahedronRef} position={[-5, -1, -4]}>
          <dodecahedronGeometry args={[0.9, 0]} />
          <meshPhysicalMaterial color="#10B981" wireframe emissive="#10B981" emissiveIntensity={0.6} />
        </mesh>
      )}

      {activeFloatingObjects.includes('cone') && (
        <mesh ref={coneRef} position={[5, -1, -4]}>
          <coneGeometry args={[0.6, 1.2, 32]} />
          <meshPhysicalMaterial color="#94A3B8" roughness={0.3} metalness={1} clearcoat={1} />
        </mesh>
      )}

      {/* New AI-Themed Custom Objects */}
      {activeFloatingObjects.includes('neuralBrain') && <NeuralBrain position={[4.5, 3, -5]} />}
      {activeFloatingObjects.includes('aiCore') && <AICore position={[-4.5, 3, -5]} />}
      {activeFloatingObjects.includes('techAtom') && <TechAtom position={[0, -3.5, -4]} />}
      {activeFloatingObjects.includes('holoCube') && <HoloCube position={[-6, 1.5, -6]} />}
      {activeFloatingObjects.includes('dnaHelix') && <DNAHelix position={[6, 1.5, -6]} />}
    </group>
  )
}
