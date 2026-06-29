import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const NeuralBrain = ({ position }: { position?: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null)
  
  const { points, lines } = useMemo(() => {
    const nodeCount = 300
    const connectionDistance = 0.4
    const positions = new Float32Array(nodeCount * 3)
    const pointsArr: THREE.Vector3[] = []
    
    for (let i = 0; i < nodeCount; i++) {
      const hemisphere = Math.random() > 0.5 ? 1 : -1
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = Math.cbrt(Math.random()) * 1.2
      
      const x = r * Math.sin(phi) * Math.cos(theta) * 0.8 + (hemisphere * 0.5)
      const y = r * Math.sin(phi) * Math.sin(theta) * 1.1
      const z = r * Math.cos(phi) * 1.3
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      
      pointsArr.push(new THREE.Vector3(x, y, z))
    }
    
    const linePositions: number[] = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (pointsArr[i].distanceTo(pointsArr[j]) < connectionDistance) {
          linePositions.push(
            pointsArr[i].x, pointsArr[i].y, pointsArr[i].z,
            pointsArr[j].x, pointsArr[j].y, pointsArr[j].z
          )
        }
      }
    }
    
    return { points: positions, lines: new Float32Array(linePositions) }
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      groupRef.current.scale.set(scale, scale, scale)
      groupRef.current.position.y = (position?.[1] || 0) + Math.sin(state.clock.elapsedTime * 1.2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#E879F9" transparent opacity={0.9} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={lines.length / 3} array={lines} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#C084FC" transparent opacity={0.25} />
      </lineSegments>
    </group>
  )
}
