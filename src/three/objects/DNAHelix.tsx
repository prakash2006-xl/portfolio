import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const DNAHelix = ({ position }: { position?: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null)
  
  const { points } = useMemo(() => {
    const arr = []
    const pairs = 16
    const height = 3.5
    const radius = 0.6
    for (let i = 0; i < pairs; i++) {
      const y = (i / pairs) * height - (height / 2)
      const angle = (i / pairs) * Math.PI * 3
      
      const x1 = Math.cos(angle) * radius
      const z1 = Math.sin(angle) * radius
      
      const x2 = Math.cos(angle + Math.PI) * radius
      const z2 = Math.sin(angle + Math.PI) * radius
      
      arr.push({ p1: [x1, y, z1], p2: [x2, y, z2] })
    }
    return { points: arr }
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.8
      groupRef.current.position.y = (position?.[1] || 0) + Math.sin(state.clock.elapsedTime * 1.5) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {points.map((pair, idx) => (
        <group key={idx}>
          <mesh position={pair.p1 as [number, number, number]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#34D399" emissive="#10B981" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={pair.p2 as [number, number, number]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#60A5FA" emissive="#3B82F6" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[(pair.p1[0] + pair.p2[0])/2, pair.p1[1], (pair.p1[2] + pair.p2[2])/2]} rotation={[0, -Math.atan2(pair.p2[2]-pair.p1[2], pair.p2[0]-pair.p1[0]), Math.PI/2]}>
            <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
            <meshPhysicalMaterial color="#E2E8F0" transparent opacity={0.5} roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
