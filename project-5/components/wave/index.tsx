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
        colorStart={theme === 'dark' ? '#353535' : '#f7f5f2'}
        colorEnd={theme === 'dark' ? '#000' : '#ffffff'}
        noiseAmplitude={theme === 'dark' ? 0.5 : 2}
      />
    </mesh>
  )
}

export default Wave
