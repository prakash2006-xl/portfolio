import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const AICore = ({ position }: { position?: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = (position?.[1] || 0) + Math.sin(state.clock.elapsedTime * 1.5) * 0.2
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.5
      ring1Ref.current.rotation.y += delta * 1.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * 0.8
      ring2Ref.current.rotation.z += delta * 0.9
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y -= delta * 1.5
      ring3Ref.current.rotation.z -= delta * 0.5
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#38BDF8" emissive="#0EA5E9" emissiveIntensity={2} toneMapped={false} />
      </mesh>

      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.8, 0.05, 16, 64]} />
        <meshPhysicalMaterial color="#94A3B8" metalness={1} roughness={0.1} clearcoat={1} />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.2, 0.08, 16, 64]} />
        <meshPhysicalMaterial color="#0EA5E9" metalness={0.8} roughness={0.2} emissive="#0284C7" emissiveIntensity={0.5} />
      </mesh>

      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.6, 0.03, 16, 64]} />
        <meshPhysicalMaterial color="#E2E8F0" metalness={0.9} roughness={0.1} wireframe />
      </mesh>
    </group>
  )
}
