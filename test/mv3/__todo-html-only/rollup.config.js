import { chromeExtension } from '$src'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import path from 'path'

export default {
  input: path.join(__dirname, 'manifest.json'),
  output: {
    dir: path.join(__dirname, 'dist'),
    format: 'esm',
  },
  plugins: [
    chromeExtension({ verbose: false }),
    typescript(),
    resolve(),
    commonjs(),
  ],
}
