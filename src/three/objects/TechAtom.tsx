import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const TechAtom = ({ position }: { position?: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null)
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const ring3 = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = (position?.[1] || 0) + Math.sin(state.clock.elapsedTime * 2) * 0.15
      groupRef.current.rotation.y += delta * 0.2
    }
    if (ring1.current) ring1.current.rotation.x += delta * 1.5
    if (ring2.current) ring2.current.rotation.y += delta * 1.5
    if (ring3.current) ring3.current.rotation.z += delta * 1.5
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#2DD4BF" emissive="#14B8A6" emissiveIntensity={3} toneMapped={false} />
      </mesh>

      <mesh ref={ring1} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[1.5, 0.05, 16, 64]} />
        <meshPhysicalMaterial color="#38BDF8" emissive="#0EA5E9" emissiveIntensity={0.5} roughness={0.1} />
      </mesh>
      <mesh ref={ring2} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 64]} />
        <meshPhysicalMaterial color="#38BDF8" emissive="#0EA5E9" emissiveIntensity={0.5} roughness={0.1} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 64]} />
        <meshPhysicalMaterial color="#38BDF8" emissive="#0EA5E9" emissiveIntensity={0.5} roughness={0.1} />
      </mesh>
    </group>
  )
}
