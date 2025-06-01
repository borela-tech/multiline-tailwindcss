import {ViteDevServer} from 'vite'

type Id = string
type PotentialTailwindClass = string

export interface SharedState {
  candidates: {
    className: Map<Id, PotentialTailwindClass[]>
    tagged: Map<Id, PotentialTailwindClass[]>
  }
  devServer?: ViteDevServer
  projectRoot?: string
  virtualTailwindModule: {
    id: string
    resolvedId: string
  }
}
