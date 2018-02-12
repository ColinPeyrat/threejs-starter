<template>
  <section class="home">
    <div id="webgl"></div>
  </section>
</template>

<script>
// WebGL scenes
import { Box } from 'webgl/objects/Box';

export default {
  name: 'home',
  data() {
    return {
      webgl: null,
      // TODO Display Webgl canvas only if loaded
      isLoaded: false
    };
  },
  mounted() {
    import('webgl').then(webgl => this.initWebGL(webgl));
  },
  methods: {
    loadWebGL() {
      // TODO Create assets queue to load all assets

      // Add any "WebGL components" here...

      this.webgl.scene.add(new Box());

      this.onWebGLLoaded();
    },
    initWebGL(context) {
      const { webgl } = context;

      this.webgl = webgl;

      // To avoid page pulling, text highlighting and such
      this.webgl.canvas.addEventListener(
        'touchstart',
        this.handlePreventDefault
      );
      this.webgl.canvas.addEventListener(
        'mousedown',
        this.handlePreventDefault
      );

      const $wrapper = this.$el.querySelector('#webgl');
      $wrapper.appendChild(this.webgl.canvas);

      this.loadWebGL(this.webgl);
    },
    onWebGLLoaded() {
      this.isLoaded = true;

      // start animation loop
      this.webgl.start();

      // draw a frame so that its correct on first DOM render
      this.webgl.draw();
    },

    handlePreventDefault(ev) {
      ev.preventDefault();
    }
  }
};
</script>

<style lang="scss" scoped>

</style>


