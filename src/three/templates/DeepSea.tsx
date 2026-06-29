import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const DeepSea = () => {
  const count = 400
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 50,
        z: (Math.random() - 0.5) * 50,
        speed: 0.2 + Math.random() * 0.8,
        scale: 0.05 + Math.random() * 0.2,
        wobbleSpeed: Math.random() * 2,
        wobbleSize: Math.random() * 0.8
      })
    }
    return temp
  }, [count])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    
    particles.forEach((particle, i) => {
      // Float upwards
      particle.y += particle.speed * delta
      if (particle.y > 25) particle.y = -25
      
      // Wobble side to side (like bubbles)
      const wobbleX = particle.x + Math.sin(time * particle.wobbleSpeed) * particle.wobbleSize
      const wobbleZ = particle.z + Math.cos(time * particle.wobbleSpeed) * particle.wobbleSize
      
      dummy.position.set(wobbleX, particle.y, wobbleZ)
      dummy.scale.setScalar(particle.scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <fog attach="fog" args={['#020813', 10, 40]} />
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshPhysicalMaterial 
          color="#4fd1c5" 
          transparent 
          opacity={0.3} 
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </instancedMesh>
    </>
  )
}
