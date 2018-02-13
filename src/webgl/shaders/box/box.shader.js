import glslify from 'glslify';
import vertexShaderSource from './box.vert';
import fragmentShaderSource from './box.frag';

const vertexShader = glslify(vertexShaderSource);
const fragmentShader = glslify(fragmentShaderSource);

export { vertexShader, fragmentShader };
