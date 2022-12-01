import { useContext, useRef, useState } from 'react'
import { ThreeElements, useFrame, useThree } from '@react-three/fiber'

import { ThemeContext } from '~contexts/theme-provider'
import WaveMaterial from './wave-material'
import * as THREE from 'three'

const Box = (props: ThreeElements['mesh']) => {
  const mesh = useRef<THREE.Mesh>(null!)
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

const Wave = () => {
  const { theme } = useContext(ThemeContext)

  const ref = useRef<any>()
  const { width, height } = useThree((state) => state.viewport)

  const [hovered, setHover] = useState(false)

  // const uniforms = {
  //   u_time: {
  //     type: 'f',
  //     value: 1.0,
  //   },
  //   u_resolution: {
  //     type: 'v2',
  //     value: new THREE.Vector2(),
  //   },
  //   u_mouse: {
  //     type: 'v2',
  //     value: new THREE.Vector2(),
  //   },
  // }

  useFrame(({ mouse }, delta) => {
    ref.current.time += delta
    // ref.current.noiseAmplitude = mouse.x / mouse.y / 10
    // console.log(ref.current.noiseAmplitude)
    // ref.current.u_mouse.x = state.mouse.x
    // ref.current.u_mouse.y = state.mouse.y
    // console.log('STATE PONITER', state.pointer)
    ref.current.colorStart = hovered ? new THREE.Color('#3f5153') : new THREE.Color('#505050')
    console.log('STATE MOUSE x', mouse.x)
    console.log('STATE MOUSE y', mouse.y)
    // console.log(ref.current.u_mouse)
    // uniforms.u_mouse.value.x = state.mouse.x
    // uniforms.u_mouse.value.y = state.mouse.y
  })

  return (
    <mesh
      scale={[width, height, 1]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* <ambientLight />
      <pointLight position={[10, 10, 10]} /> */}
      <planeGeometry />
      {/* @ts-ignore */}
      <waveMaterial
        ref={ref}
        key={WaveMaterial.key}
        toneMapped={true}
        colorStart={theme === 'dark' ? '#505050' : '#a9bcd0'}
        colorEnd={theme === 'dark' ? '#f1f1f1' : '#ffffff'}
        // u_mouse={new THREE.Vector2(1, 1)}

        noiseAmplitude={3.0}
      />
    </mesh>
    // <Box position={[-1.2, 0, 0]} />
  )
}

export default Wave
