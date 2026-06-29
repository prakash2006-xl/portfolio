import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const NeuronGraphic = () => {
  const groupRef = useRef<THREE.Group>(null)
  
  const { points, lines } = useMemo(() => {
    const nodeCount = 200
    const connectionDistance = 4.0
    const positions = new Float32Array(nodeCount * 3)
    const pointsArr: THREE.Vector3[] = []
    
    // Generate random nodes
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 25
      const y = (Math.random() - 0.5) * 25
      const z = (Math.random() - 0.5) * 25
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      
      pointsArr.push(new THREE.Vector3(x, y, z))
    }
    
    // Connect nodes that are close to each other
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
    
    return {
      points: positions,
      lines: new Float32Array(linePositions)
    }
  }, [])

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04
      groupRef.current.rotation.x += delta * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.12} color="#00e5ff" transparent opacity={0.9} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[lines, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#2dd4bf" transparent opacity={0.15} />
      </lineSegments>
    </group>
  )
}
