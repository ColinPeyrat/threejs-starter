#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 colorA;
uniform vec3 colorB;
varying vec2 vUv;
uniform float time;

void main() {
	vec2 position = vUv;

	float t = position.x;
	t *= sin(time) * 0.5 + 0.5;

	vec3 color = mix(colorA, colorB, t);

	gl_FragColor = vec4(color, 1.0);
}