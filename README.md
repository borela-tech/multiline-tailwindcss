# Multiline Tailwind Vite Plugin

*If you like this plugin, give it a star on GitHub and tell about it to your
friends!*

A Vite plugin that allows Tailwind CSS classes to be broken into multiple lines.

## Installation

```bash
npm install -D @borela-tech/vite-plugin-multiline-tailwind-css
```

## Vite Configuration

Add the plugin to your Vite configuration:

```typescript
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import {multilineTailwind} from '@borela-tech/vite-plugin-multiline-tailwind'

export default defineConfig({
  plugins: [
    // other plugins...
    react(),
    ...multilineTailwind(),
    // other plugins...
  ],
})
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
```

Alternatively, you can use the `tailwind` tag to transform string literals:

```js
// It is not necessary to import the tailwind tag, it is declared globally and
// the plugin only uses it to know which string literals to transform. This
// function is never called at runtime.
const BODY_CLASS = tailwind`
  bg-[
    linear-gradient(
      to_right,
      theme(colors.purple.600),
      theme(colors.purple.900),
    ),
  ]
`
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any
improvements or bug fixes.

## License

This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE)
file for details.
