import { useContext, useRef } from 'react'

import { useFrame, useThree } from '@react-three/fiber'

import { ThemeContext } from '~contexts/theme-provider'

import WaveMaterial from './wave-material'

const Wave = () => {
  const { theme } = useContext(ThemeContext)

  const ref = useRef<{
    time: number
    noiseAmplitude: number
    colorStart: string
    colorEnd: string
  }>()
  const { width, height } = useThree((state) => state.viewport)

  useFrame((state, delta) => {
    if (ref.current) ref.current.time += delta
  })

  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <waveMaterial
        ref={ref}
        key={WaveMaterial.key}
        toneMapped={true}
        // #505050 - secondary[200], #bdbbb0 - secondary[600]
        colorStart={theme === 'dark' ? '#505050' : '#bdbbb0'}
        // #f1f1f1 - primary[500], #ffffff secondary[300]
        colorEnd={theme === 'dark' ? '#f1f1f1' : '#ffffff'}
        noiseAmplitude={theme === 'dark' ? 0.5 : 2}
      />
    </mesh>
  )
}

export default Wave
