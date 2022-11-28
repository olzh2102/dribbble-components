import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

import { WaveMaterial } from '../../common/WaveMaterial'

const Wave = () => {
  const ref = useRef<any>()
  const { width, height } = useThree((state) => state.viewport)

  const [hovered, setHover] = useState(false)

  useFrame((state, delta) => {
    // ref.current.colorStart = hovered ? new THREE.Color('#3f5153') : new THREE.Color('#505050')
    // ref.current.noiseAmplitude = state.mouse.x / state.mouse.y / 10
    ref.current.time += delta * 2
  })

  return (
    <mesh
      scale={[width, height, 1]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry />
      <waveMaterial
        ref={ref}
        key={WaveMaterial.key}
        toneMapped={true}
        noiseAmplitude={3.0}
        colorStart="#505050"
        colorEnd="#f1f1f1"
      />
    </mesh>
  )
}

export default Wave
