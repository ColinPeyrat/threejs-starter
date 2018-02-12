import WebGLApp from 'webgl/WebGLApp';
import AssetsManager from 'utils/AssetsManager';
import dat from 'dat.gui';

// Setup dat.gui
const gui = new dat.GUI();

if (process.env.NODE_ENV !== 'development') {
  document.querySelector('.dg.ac').style.display = 'none';
}

// Create a canvas
const canvas = document.createElement('canvas');

// Setup the WebGLRenderer
const webgl = new WebGLApp({ canvas, debug: true, background: 0xffffff });

export { canvas, webgl, gui };
