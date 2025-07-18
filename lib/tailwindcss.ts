export {}
declare global {
  function tailwindcss(
    strings: TemplateStringsArray,
    ...expressions: unknown[]
  ): string
}
