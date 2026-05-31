import {compileCssPlugin} from './compileCssPlugin'
import {initialize} from './initialize'
import {transformJsxCssClassesPlugin} from './transformJsxCssClassesPlugin'
import {transformTaggedStringsPlugin} from './transformTaggedStringsPlugin'
import type {Config} from './Config'
import type {Plugin} from 'vite'
import type {SharedState} from './SharedState'

/**
 * Vite plugin to extract TailwindCSS class candidates from JSX and tagged
 * template literals.
 * @public
 */
export function multilineTailwindCss(config?: Config): Plugin[] {
  const state: SharedState = {
    candidatesFromTransforms: {
      className: new Map(),
      tagged: new Map(),
    },
    ...config,
  }
  return [
    initialize(state),
    transformTaggedStringsPlugin(state),
    transformJsxCssClassesPlugin(state),
    compileCssPlugin(state),
  ] satisfies Plugin[]
}
