import * as THREE from 'three';
import { WebGLRenderer, PerspectiveCamera, Scene, AxesHelper } from 'three';
import rightNow from 'right-now';
const OrbitControls = require('three-orbit-controls')(THREE);

class WebGLApp {
  constructor(opts = {}) {
    this.debug = opts.debug || false;

    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: false,
      failIfMajorPerformanceCaveat: true,
      ...opts
    });

    this.canvas = this.renderer.domElement;

    const background = opts.background || '#000';
    this.renderer.setClearColor(background, 1);

    // clamp pixel ratio for performance
    this.maxPixelRatio = 1;

    // clamp delta to stepping anything too far forward
    this.maxDeltaTime = 1 / 30;

    // setup a basic camera
    const fov = 45;
    const near = 0.01;
    const far = 100;
    this.camera = new PerspectiveCamera(fov, 1, near, far);
    this.camera.position.z = 5;

    // set up a simple orbit controller
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.update();

    this.time = 0;
    this.isRunning = false;
    this.lastTime = rightNow();
    this.rafID = null;

    this.scene = new Scene();

    // setup help for debugging
    if (this.debug) {
      this.scene.add(new AxesHelper(10));
    }

    // handle resize events
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('orientationchange', () => this.resize());

    // force an initial resize event
    this.resize();

    // this.initGui();
  }

  resize(width = window.innerWidth, height = window.innerHeight) {
    this.width = width;
    this.height = height;

    // setup new size & update camera aspect if necessary
    this.renderer.setSize(width, height);
    if (this.camera.isPerspectiveCamera) {
      this.camera.aspect = width / height;
    }
    this.camera.updateProjectionMatrix();

    // draw a frame to ensure the new size has been registered visually
    this.draw();
    return this;
  }

  update(dt = 0, time = 0) {
    this.controls.update();

    // recursively tell all child objects to update
    this.scene.traverse(obj => {
      if (typeof obj.update === 'function') {
        obj.update(dt, time);
      }
    });

    return this;
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    return this;
  }

  start() {
    if (this.rafID !== null) {
      return;
    }

    this.rafID = window.requestAnimationFrame(this.animate);
    this.isRunning = true;
    return this;
  }

  stop() {
    if (this.rafID === null) {
      return;
    }

    window.cancelAnimationFrame(this.rafID);
    this.rafID = null;
    this.isRunning = false;
    return this;
  }

  animate = () => {
    if (!this.isRunning) {
      return;
    }

    window.requestAnimationFrame(this.animate);

    const now = rightNow();
    const dt = Math.min(this.maxDeltaTime, (now - this.lastTime) / 1000);
    this.time += dt;
    this.lastTime = now;
    this.update(dt, this.time);
    this.draw();
  };
}

export default WebGLApp;
