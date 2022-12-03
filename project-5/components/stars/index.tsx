import { useContext, useRef, useState } from 'react'
import { random } from 'maath'
import { useFrame } from '@react-three/fiber'
import { PointMaterial, Points, Stars } from '@react-three/drei'
import { MathUtils } from 'three'
import { ThemeContext } from '~contexts/theme-provider'

export default function Star(props: any) {
  const { theme } = useContext(ThemeContext)
  const ref = useRef<any>()
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))

  useFrame((state, delta) => {
    // ref.current.rotation.x = MathUtils.damp(ref.current.rotation.x, -state.mouse.y, 2.75, delta)
    // ref.current.rotation.y = MathUtils.damp(ref.current.rotation.y, state.mouse.x, 2.75, delta)
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
    // ref.current.position.z += delta / 2
    // ref.current.rotation.z -= delta / 10
  })

  return (
    <group>
      {/* <Stars ref={ref} radius={250} count={5000} factor={10} depth={0} /> */}
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={theme === 'dark' ? '#505050' : '#a9bcd0'}
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}
