import {
  ResolvedConfig,
  ViteDevServer,
} from 'vite'

type Id = string
type Candidates = string[]

export interface SharedState {
  candidatesFromTransforms: {
    className: Map<Id, Candidates>
    tagged: Map<Id, Candidates>
  }
  devServer?: ViteDevServer
  projectRootPath?: string
  resolveCss?: ReturnType<ResolvedConfig['createResolver']>
  resolveJs?: ReturnType<ResolvedConfig['createResolver']>
  rootCssPath?: string
  srcDirPath?: string
}
