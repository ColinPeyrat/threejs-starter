const argv = require('minimist')(process.argv.slice(2));

const fs = require('fs');
const chalk = require('chalk');
const maxstache = require('maxstache');
const path = require('path');
const mkdirp = require('mkdirp');

let name = argv._[0];

if (!name) {
  console.error(chalk.red(`Error: Must give a name to create object.`));
  process.exit(0);
}

name = name.charAt(0).toUpperCase() + name.slice(1);

const cwd = process.cwd();
const dir = path.resolve(__dirname, `../src/webgl/objects/${name}`);

fs.stat(dir, (err, stat) => {
  if (err) {
    write();
  } else {
    console.log(
      chalk.red(`Path at ${path.relative(cwd, dir)} already exists!`)
    );
  }
});

function write() {
  mkdirp(dir, err => {
    if (err) throw err;
    Promise.all([
      template(
        path.resolve(__dirname, 'template/object/index.js'),
        path.resolve(dir, `index.js`)
      ),
      template(
        path.resolve(__dirname, 'template/object/Object.js'),
        path.resolve(dir, `${name}.js`)
      )
    ])
      .then(() => {
        console.log(`Created new ${name} object at ${dir}`);
      })
      .catch(err => console.error(err));
  });
}

function template(input, output) {
  const data = {
    name: name
  };
  return new Promise((resolve, reject) => {
    fs.readFile(input, 'utf8', (err, str) => {
      if (err) return reject(err);
      str = maxstache(str, data);
      fs.writeFile(output, str, err => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
}
