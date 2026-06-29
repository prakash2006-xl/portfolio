import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { HeroScene } from '../../three/scenes/HeroScene'
import { HeroOverlay } from './HeroOverlay'

export const Hero = () => {
  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-transparent">
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Overlay Layer */}
      <HeroOverlay />
    </section>
  )
}
