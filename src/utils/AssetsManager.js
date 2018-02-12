import OBJLoader from 'imports-loader?THREE=three!exports-loader?THREE.OBJLoader!three-extras/loaders/OBJLoader.js';
import MTLLoader from 'imports-loader?THREE=three!exports-loader?THREE.MTLLoader!three-extras/loaders/MTLLoader.js';
import { extname } from 'path';

const isOBJ = ext => /\.(obj)$/i.test(ext);

class AssetsManager {
  constructor() {
    this.queue = [];
    this.cache = {};
  }

  // Add an asset to be queued, format: { url, ...options }
  addQueue({ url, mtl, key }) {
    const opt = {
      url
    };

    opt.key = key || url;

    if (mtl) {
      opt.mtl = mtl;
    }

    this.queue.push(opt);

    return opt.key;
  }

  // Fetch a loaded asset by key or URL
  get(key = '') {
    return this.cache[key];
  }

  // Loads all queued assets
  loadQueued(cb) {
    let total = this.queue.length;

    if (process.env.NODE_ENV === 'development') {
      console.log(`[assets] Loading ${total} queued items`);
    }
    for (let i = 0; i < this.queue.length; i++) {
      const item = this.queue[i];

      this.load(item, (err, result) => {
        const percent = total <= 1 ? 1 : i / (total - 1);

        // if last
        if (i == this.queue.length - 1) {
          cb();
        }
      });
    }
  }

  load(item, cb) {
    const { cache } = this;
    const { url, mtl } = item;
    const ext = extname(url);
    const key = item.key || url;

    const done = (err, data) => {
      if (err) {
        delete cache[key];
      } else {
        cache[key] = data;
      }

      cb(err, data);
    };

    if (isOBJ(ext)) {
      // TODO Handle when no materials
      const mtlLoader = new MTLLoader();

      mtlLoader.load(mtl, materials => {
        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(url, object => {
          done(null, object);
        });
      });
    }
  }
}

export default new AssetsManager();
