import {stripFirstLine} from './stripFirstLine'
import {unindentString} from './unindentString'

export function adjustExpectedString(str: string): string {
  return unindentString(stripFirstLine(str), 6)
}
