import { useContext, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

import { ThemeContext } from '~contexts/theme-provider'
import WaveMaterial from './wave-material'

const Wave = () => {
  const { theme } = useContext(ThemeContext)

  const ref = useRef<any>()
  const { width, height } = useThree((state) => state.viewport)

  useFrame((state, delta) => {
    ref.current.time += delta
  })

  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry />
      {/* @ts-ignore */}
      <waveMaterial
        ref={ref}
        key={WaveMaterial.key}
        toneMapped={true}
        colorStart={theme === 'dark' ? '#505050' : '#a9bcd0'}
        colorEnd={theme === 'dark' ? '#f1f1f1' : '#ffffff'}
        noiseAmplitude={theme === 'dark' ? 0.5 : 2}
      />
    </mesh>
  )
}

export default Wave
