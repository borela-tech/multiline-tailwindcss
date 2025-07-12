<p align="center">
  <picture>
    <source
      media="(prefers-color-scheme: dark)" 
      srcset="/assets/logo_dark_theme.svg"
      width=200
    >
    <source
      media="(prefers-color-scheme: light)" 
      srcset="/assets/logo_light_theme.svg"
      width=200
    >
    <img
      alt="multiline tailwind logo" 
      src="/assets/logo_light_theme.svg"
      width=200
    >
  </picture>
</p>

<p align="center">
  If you like this plugin, give it a star on GitHub and tell about it to your
  friends!
</p>

<p align="center">
  An esbuild plugin that allows tailwindcss classes to be broken into multiple
  lines.
</p>

## Installation

```bash
npm install -D @borela-tech/esbuild-plugin-multiline-tailwindcss
```

## TSUP

TSUP will make it easier to build packages that require [tailwindcss][tailwindcss],
you can simply add the plugin to your `tsup.config.ts`:

```typescript
import {defineConfig} from 'tsup'
import {multilineTailwindCssPlugin} from '@borela-tech/esbuild-plugin-multiline-tailwindcss'

export default defineConfig(options => {
  return {
    // Other options...
    esbuildPlugins: [multilineTailwindCssPlugin],
    // Other options...
  }
})
```

### Build

After building, a file `tailwindcss.candidates.json` will be generated which
contains the candidates for the [tailwindcss][tailwindcss] classes that were
transformed. 

This file can then be imported into other projects that use [tailwindcss][tailwindcss]
in their css file as follows:

```css
@import "tailwindcss";
@source "../node_modules/some-package/**/tailwindcss.candidates.json";
```
