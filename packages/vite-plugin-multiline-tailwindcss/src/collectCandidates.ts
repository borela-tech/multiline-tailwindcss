import type {ModuleCandidates} from './ModuleCandidates'
import type {Scanner} from '@tailwindcss/oxide'

export function collectCandidates(
  scanner: Scanner,
  classNameCandidates: ModuleCandidates,
  taggedCandidates: ModuleCandidates,
) {
  const allCandidates = scanner.scan()

  for (const [, candidates] of classNameCandidates)
    allCandidates.push(...candidates)

  for (const [, candidates] of taggedCandidates)
    allCandidates.push(...candidates)

  return allCandidates
}
