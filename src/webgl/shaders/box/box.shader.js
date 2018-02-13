import glslify from 'glslify';
import vertexShaderSource from './box.vert';
import fragmentShaderSource from './box.frag';

// TODO npm script to automate the creation of new shaders

const vertexShader = glslify(vertexShaderSource);
const fragmentShader = glslify(fragmentShaderSource);

export { vertexShader, fragmentShader };
