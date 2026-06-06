# `@borela-tech/multiline-tailwindcss`

Shared runtime and transformation core for the
[multiline-tailwindcss](https://github.com/borela-tech/multiline-tailwindcss)
plugin suite.

This package serves two roles:

1. **Runtime**: Provides the `tailwindcss` and `base64Asset` tagged template 
   functions. These act as build-time markers for the esbuild/Vite plugins and
   are replaced at compile time with the transformed string. At runtime (if
   unprocessed) they return a descriptive error string.
2. **Build-time**: Contains the core transformation logic used internally by
  `@borela-tech/esbuild-plugin-multiline-tailwindcss` and 
  `@borela-tech/vite-plugin-multiline-tailwindcss`.

This package is bundled as a dependency of both plugins, so no separate install
is needed when using either plugin.

## Usage

```js
import {base64Asset} from '@borela-tech/multiline-tailwindcss'
import {tailwindcss} from '@borela-tech/multiline-tailwindcss'

const STYLES = tailwindcss`
  bg-[
    linear-gradient(
      to right,
      theme(colors.purple.600),
      theme(colors.purple.900),
    ),
  ]
  p-4
`

const NOISE = base64Asset`../assets/noise.png`
```

These tags are transformed at build time by the esbuild or Vite plugin. The
runtime functions are never called in production.

## License

Apache 2.0. See [LICENSE](../../LICENSE.md).
