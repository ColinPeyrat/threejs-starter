import { Object3D, BoxGeometry, ShaderMaterial, Mesh, Color } from 'three';
import { canvas, webgl, gui } from 'webgl';
import helloWorldVertex from 'shaders/helloWorld.vert';
import helloWorldFragment from 'shaders/helloWorld.frag';

class Box extends Object3D {
  constructor() {
    super();

    const uniforms = {
      time: { value: 1.0 },
      colorA: { value: new Color('rgb(213,70,70)') },
      colorB: { value: new Color('rgb(223,191,86)') }
    };

    const geometry = new BoxGeometry(1, 1, 1);
    this.material = new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: helloWorldVertex,
      fragmentShader: helloWorldFragment
    });

    const mesh = new Mesh(geometry, this.material);

    this.add(mesh);

    // attach dat.gui stuff here as usual
    const folder = gui.addFolder('Box');

    this.settings = {
      rotationSpeed: 0.5,
      pulseSpeed: 1.5,
      colorA: this.material.uniforms.colorA.value.getStyle(),
      colorB: this.material.uniforms.colorB.value.getStyle()
    };

    const update = () => {
      this.material.uniforms.colorA.value.setStyle(this.settings.colorA);
      this.material.uniforms.colorB.value.setStyle(this.settings.colorB);
    };

    folder.add(this.settings, 'rotationSpeed', 0, 10.0);
    folder.add(this.settings, 'pulseSpeed', 0, 6.0);
    folder.addColor(this.settings, 'colorA').onChange(update);
    folder.addColor(this.settings, 'colorB').onChange(update);
    folder.open();
  }

  update(dt = 0, time = 0) {
    this.material.uniforms.time.value = time * this.settings.pulseSpeed;

    this.rotation.x += dt * this.settings.rotationSpeed;
    this.rotation.y += dt * this.settings.rotationSpeed;
  }
}

export default Box;
