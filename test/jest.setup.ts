/* eslint-env jest */

import 'array-flat-polyfill'
import { warnSpy } from './helpers/consoleSpies'
import './helpers/inspect'
import { jestSetTimeout } from './helpers/timeout'

warnSpy.mockImplementation()

jestSetTimeout(5000)

// For testing package detection
process.chdir(__dirname)

// Jest attempts to sandbox globals, but it doesn't work with `instanceof`
// https://github.com/facebook/jest/issues/2549
// Object.defineProperty(Uint8Array, Symbol.hasInstance, {
//   value(target: any) {
//     return ['Uint8Array', 'Buffer'].includes(
//       target.constructor.name,
//     )
//   },
//   writable: true,
// })

// TODO: do we still need this?
if (process.env.npm_config_argv) {
  process.env.JEST_WATCH = JSON.parse(
    process.env.npm_config_argv,
  ).original.includes('--watch')
}

Date.now = jest.fn(() => new Date('2021-12-07').getTime())
