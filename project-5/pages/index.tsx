import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Points, PointMaterial } from '@react-three/drei'

import lang from 'common/lang.json'
import { Lang } from 'common/types'

import ThemeToggler from '~components/theme-toggler'
import LangToggler from '~components/lang-toggler'
import RoundedCorner from '~components/rounded-corner'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import fragmentShader from 'common/fragmentShader'
import vertexShader from 'common/vertexShader'
import { Color, Vector2 } from 'three'
import { random } from 'maath'

const CurrentTime = dynamic(() => import('~components/current-time'), {
  ssr: false,
})

const Fragment = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>()

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1.5}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} />
    </mesh>
  )
}

const Gradient = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>()
  const mousePosition = useRef({ x: 0, y: 0 })

  const updateMousePosition = useCallback((e: any) => {
    mousePosition.current = { x: e.pageX, y: e.pageY }
  }, [])

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_mouse: { value: new Vector2(0, 0) },
      u_bg: {
        value: new Color('#A1A3F7'),
      },
      u_colorA: { value: new Color('#9FBAF9') },
      u_colorB: { value: new Color('#FEB3D9') },
    }),
    []
  )

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, false)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition, false)
    }
  }, [updateMousePosition])

  useFrame((state) => {
    const { clock } = state

    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime()
    mesh.current.material.uniforms.u_mouse.value = new Vector2(
      mousePosition.current.x,
      mousePosition.current.y
    )
  })

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1.5}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  )
}

function Stars(props: any) {
  const ref = useRef<any>()
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="white"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const Home: NextPage = () => {
  const locale = useRouter().locale
  const t = lang[locale as Lang]

  return (
    <div>
      <Head>
        <title>NR</title>
        <meta name="description" content="NR" />
      </Head>
      <RoundedCorner>
        <div className="flex gap-x-5 justify-end px-6">
          <Canvas className="rounded-xl" camera={{ position: [0.0, 0.0, 1.5] }}>
            {/* <ambientLight intensity={0.05} />
            <directionalLight color="red" position={[0, 0, 5]} /> */}
            {/* <Fragment /> */}
            {/* <Gradient /> */}
            <Stars />
            {/* <mesh>
              <sphereGeometry />
              <meshStandardMaterial />
            </mesh> */}
          </Canvas>
          <div className="absolute top-0 left-0 w-full h-full"></div>
          <div className="absolute flex gap-x-5">
            <CurrentTime />
            <LangToggler lang={locale as Lang} />
            <ThemeToggler />
          </div>
          <div className="grid h-full place-content-center text-5xl dark:text-white">
            {t.welcome}
          </div>
        </div>
      </RoundedCorner>
    </div>
  )
}

export default Home
