export default [
  {
    input: 'src/index.js',
    output: [{
      file: './dist/cjs/index.js',
      format: 'cjs',
    }, {
      file: './dist/es/index.js',
      format: 'es',
    }]
  }
]