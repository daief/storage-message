'use strict';

const rollupTypescript = require('rollup-plugin-typescript');
const serve = require('rollup-plugin-serve');

const isProd = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'StorageMessage',
  },
  plugins: [
    rollupTypescript(),
    isProd
      ? null
      : serve({
          contentBase: '.',
          openPage: '/example/page1.html',
          open: true,
          host: 'localhost',
          port: 10001,
        }),
  ].filter((p) => p),
};
