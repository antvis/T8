#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const cwd = process.cwd();
const es = path.join(cwd, 'es');
const lib = path.join(cwd, 'lib');
const src = path.join(cwd, 'src');

function readdir(dir) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const sub = path.join(dir, file);
      const stat = fs.statSync(sub);
      if (stat && stat.isDirectory()) {
        readdir(sub);
      } else {
        const ext = path.extname(file);
        if (ext === '.less' || ext === '.css') {
          const less = path.relative(src, sub);
          fse.copySync(sub, path.join(es, less));
          fse.copySync(sub, path.join(lib, less));
        }
      }
    });
  }
}

console.log('Copy less files');
readdir(path.join(src, 'styles'));
