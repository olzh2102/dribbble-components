import { Canvas } from '@react-three/fiber'

import Wave from './wave-mesh'

export default function WaveWrapper() {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Wave />
      </Canvas>
    </div>
  )
}
