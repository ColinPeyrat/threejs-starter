import { Object3D, BoxGeometry, ShaderMaterial, Mesh } from 'three';
import helloWorldVertex from 'shaders/helloWorld.vert';
import helloWorldFragment from 'shaders/helloWorld.frag';

class Box extends Object3D {
  constructor() {
    super();

    const uniforms = {
      time: { type: 'f', value: 1.0 }
    };

    const geometry = new BoxGeometry(1, 1, 1);
    this.material = new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: helloWorldVertex,
      fragmentShader: helloWorldFragment
    });

    const mesh = new Mesh(geometry, this.material);

    this.add(mesh);
  }

  update(dt = 0, time = 0) {
    // TODO Update value with GUI
    this.material.uniforms.time.value = time;

    this.rotation.x += dt * 1.0;
    this.rotation.y += dt * 1.0;
  }
}

// this.params = {
//   cubeSpeed: 0.02,
//   pulseSpeed: 0.025
// };

// this.uniforms = {
//   u_time: { type: 'f', value: 1.0 }
// };

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.ShaderMaterial({
//   uniforms: this.uniforms,
//   vertexShader: helloWorldVertex,
//   fragmentShader: helloWorldFragment
// });
// this.cube = new THREE.Mesh(geometry, material);

export default Box;
