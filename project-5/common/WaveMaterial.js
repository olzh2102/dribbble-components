import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import glsl from 'babel-plugin-glsl/macro'

// This shader is from Bruno Simons Threejs-Journey: https://threejs-journey.xyz
const WaveMaterial = shaderMaterial(
  {
    time: 0,
    colorStart: new THREE.Color('#505050'),
    colorEnd: new THREE.Color('black'),
    noiseAmplitude: 3
  },
  glsl`
      varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }`,
  glsl`
      #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
      uniform float time;
      uniform float noiseAmplitude;
      uniform vec3 colorStart;
      uniform vec3 colorEnd;
      uniform float aspect;
      varying vec2 vUv;
      void main() {
        vec2 displacedUv = vUv + cnoise3(vec3(vUv * noiseAmplitude, time * 0.07));
        float strength = cnoise3(vec3(displacedUv * 1.3, time * 0.04));
        strength = clamp(strength, 0.0, 1.0);
        vec3 color = mix(colorStart, colorEnd, strength);
        gl_FragColor = vec4(color, 1.0);

        #include <tonemapping_fragment>
        #include <encodings_fragment>
      }`
)

extend({ WaveMaterial })

export { WaveMaterial }
