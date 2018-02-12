#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;
uniform float time;

void main() {
	vec2 position = vUv;

	float red = position.x * abs(sin(time));
  float green = position.y * abs(cos(time));

	gl_FragColor = vec4(red,green,1.0,1.0);
}