export {}
declare global {
  function tailwind(
    strings: TemplateStringsArray,
    ...expressions: unknown[]
  ): string
}
