import type {ViteDevServer} from 'vite'

type Id = string
type Candidates = string[]

export interface SharedState {
  candidatesFromTransforms: {
    className: Map<Id, Candidates>
    tagged: Map<Id, Candidates>
  }
  devServer?: ViteDevServer
  outDir?: string
  rootCssDirPath?: string
  rootCssPath?: string
}
