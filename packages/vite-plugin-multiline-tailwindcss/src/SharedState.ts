import type {ModuleCandidates} from './ModuleCandidates'
import type {ViteDevServer} from 'vite'

export interface SharedState {
  candidatesFromTransforms: {
    className: ModuleCandidates
    tagged: ModuleCandidates
  }
  compilationResult?: {
    code: string
    map: string
  }
  cssDependencies?: Set<string>
  devServer?: ViteDevServer
  outDir?: string
  rootCssDirPath?: string
  rootCssPath?: string
}
