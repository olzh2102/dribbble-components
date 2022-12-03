import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

import vertex from './shader.vert'
import fragment from './shader.frag'

const WaveMaterial = shaderMaterial(
  {
    time: 0,
    colorStart: new THREE.Color('#505050'),
    colorEnd: new THREE.Color('black'),
    noiseAmplitude: 1,
  },
  vertex,
  fragment
)

extend({ WaveMaterial })

export default WaveMaterial
