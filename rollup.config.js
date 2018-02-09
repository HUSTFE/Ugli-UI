import json from 'rollup-plugin-json'
import alias from 'rollup-plugin-alias'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import autoprefixer from 'autoprefixer'

import path from 'path'
import fs from 'fs'

// The babel plugin will not load .babelrc by NODE_ENV.
// We do it ourselves.
const babelrc = JSON.parse(fs.readFileSync('.babelrc'))

export default {
  input: fs.existsSync('./rollup.entry.temp.js')
    ? './rollup.entry.temp.js'
    : './index.js',
  output: {
    file: 'build/dist/ugli-ui.js',
    format: 'es',
    banner: '/* eslint-disable */',
  },
  plugins: [
    json(),
    resolve(),
    postcss({
      extensions: ['.sass', '.css'],
      inject: false,
      extract: true,
      minimize: false,
      modules: true,
      to: 'build/dist/ugli-ui.css',
      plugins: [autoprefixer()],
    }),
    alias({
      // avoid this plugin adding .js ext. to our path.
      resolve: [''],
      '@style': path.resolve(__dirname, 'src/style'),
      '@shared': path.resolve(__dirname, 'src/components/shared'),
    }),
    babel(
      Object.assign(
        {
          exclude: 'node_modules/**',
          babelrc: false,
        },
        babelrc.env.production,
      )
    ),
    commonjs(),
  ],
  // all dependencies will be regarded as external
  /* eslint-disable global-require */
  external: Object.keys(require('./package.json').dependencies),
}
