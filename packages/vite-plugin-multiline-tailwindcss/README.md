<p align="center">
  <picture>
    <source
      media="(prefers-color-scheme: dark)" 
      srcset="https://raw.githubusercontent.com/borela-tech/multiline-tailwindcss/refs/heads/main/assets/logo_dark_theme.svg"
      width=200
    >
    <source
      media="(prefers-color-scheme: light)" 
      srcset="https://raw.githubusercontent.com/borela-tech/multiline-tailwindcss/refs/heads/main/assets/logo_light_theme.svg"
      width=200
    >
    <img
      alt="multiline tailwind logo" 
      src="https://raw.githubusercontent.com/borela-tech/multiline-tailwindcss/refs/heads/main/assets/logo_light_theme.svg"
      width=200
    >
  </picture>
</p>

<p align="center">
  <em>
    If you like this plugin, give it a star on GitHub and tell about it to your
    friends!
  </em>
</p>

<p align="center">
  A <a href="https://vite.dev/">Vite</a> plugin that allows <a href="https://tailwindcss.com/">tailwindcss</a> 
  classes to be broken into multiple lines.
</p>

## Installation

```bash
npm install -D @borela-tech/vite-plugin-multiline-tailwindcss
```

## Vite Configuration

Add the plugin to your Vite configuration:

```typescript
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import {multilineTailwindCss} from '@borela-tech/vite-plugin-multiline-tailwindcss'

export default defineConfig({
  plugins: [
    // other plugins...
    react(),
    ...multilineTailwindCss(),
    // other plugins...
  ],
})
```

### Index.css

Create a file called `index.css` under `<Project Root>/src/` directory and 
import [tailwindcss][tailwindcss]:

```css
@import "tailwindcss";
```

Then, include this file in your main entry point, typically `main.tsx` or `index.tsx`:

```js
import './index.css'
```

### Usage

The plugin will search for the className attribute in your JSX/TSX files and 
transform the classes into a single line.

```jsx
<div className="
  bg-[
    linear-gradient(
      to_right,
      theme(colors.purple.600),
      theme(colors.purple.900),
    ),
  ]
">
  <div className="
    bg-[
      linear-gradient(
        to_right,
        theme(colors.zinc.900/15%)_1px,
        transparent_1px,
      ),
      linear-gradient(
        to_top,
        theme(colors.zinc.900/15%)_1px,
        transparent_1px,
      ),
    ]
    bg-[size:4px_4px]
    p-4
  ">
    Some content
  </div>
</div>

// Becomes:

<div className="bg-[linear-gradient(to_right,theme(colors.purple.600),theme(colors.purple.900))]">
  <div className="bg-[linear-gradient(to_right,theme(colors.zinc.900/15%)_1px,transparent_1px),linear-gradient(to_top,theme(colors.zinc.900/15%)_1px,transparent_1px)] bg-[size:4px_4px] p-4">
    Some content
  </div>
</div>
```

Alternatively, you can use the `tailwindcss` tag to transform string literals:

```js
// It is not necessary to import the tailwind tag, it is declared globally and
// the plugin only uses it to know which string literals to transform. This
// function is never called at runtime.

const BODY_CSS = tailwindcss`
  bg-[
    linear-gradient(
      to_right,
      theme(colors.purple.600),
      theme(colors.purple.900),
    ),
  ]
`

// Becomes:

const BODY_CSS = `bg-[linear-gradient(to_right,theme(colors.purple.600),theme(colors.purple.900))]`
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any
improvements or bug fixes.

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE.md)
file for details.

[tailwindcss]: https://tailwindcss.com
