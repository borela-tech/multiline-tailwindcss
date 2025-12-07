export function stripFirstLine(str: string): string {
  return str.split('\n').slice(1).join('\n')
}
