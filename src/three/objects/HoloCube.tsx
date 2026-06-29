import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const HoloCube = ({ position }: { position?: [number, number, number] }) => {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = (position?.[1] || 0) + Math.sin(state.clock.elapsedTime) * 0.25
    }
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.3
      outerRef.current.rotation.y += delta * 0.4
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.5
      innerRef.current.rotation.y -= delta * 0.6
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={outerRef}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial color="#818CF8" wireframe emissive="#6366F1" emissiveIntensity={1} />
      </mesh>
      <mesh ref={innerRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="#F472B6" emissive="#EC4899" emissiveIntensity={0.8} transparent opacity={0.6} roughness={0} />
      </mesh>
    </group>
  )
}
