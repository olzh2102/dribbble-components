#pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
uniform float time;
uniform vec3 colorStart;
uniform vec3 colorEnd;
uniform vec2 u_mouse;
uniform float aspect;
varying vec2 vUv;

void main() {
  vec2 displacedUv = vUv + cnoise3(vec3(vUv * 0.8, time * 0.02));
  float strength = cnoise3(vec3(displacedUv * 0.5, time * 0.04));
  strength = clamp(strength, 0.0, 1.0);
  vec3 color = mix(colorStart, colorEnd, strength);
  gl_FragColor = vec4(color, 1.0);
  // vec2 um = u_mouse.xy;
  // gl_FragColor = vec4(um.x, um.y, 0.0, 0.1);

  #include <tonemapping_fragment>
  #include <encodings_fragment>
}
