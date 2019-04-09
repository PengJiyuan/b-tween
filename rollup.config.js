import buble from 'rollup-plugin-buble';

const config = {
  input: './src/index.js',
  output: {
    file: './dist/b-tween.es.js',
    format: 'es'
  },
  plugins: [
    buble({objectAssign: true})
  ]
};

export default config;
