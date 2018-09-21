"use strict"

const rollupTypescript = require('rollup-plugin-typescript');

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'StorageMessage'
  },
  plugins: [
    rollupTypescript()
  ]
};