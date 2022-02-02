const esbuild = require('esbuild');
const fs = require('fs-extra');
const localPkgJson = require('../package.json');

esbuild
  .build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: process.env.NODE_ENV !== 'production',
    target: ['es6'],
    outdir: './dist',
    define: {
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    },
    platform: 'node',
    external: Object.keys({
      ...(localPkgJson.dependencies || {}),
      ...(localPkgJson.devDependencies || {}),
      ...(localPkgJson.peerDependencies || {}),
    }),
  })
  .then(() => {
    fs.copySync('./public', './dist');
  })
  .catch(() => process.exit(1));
