# Tailwind CSS in Nuxt

Tailwind CSS is a utility-first CSS framework that allows you to build custom designs directly in your markup.

## Why Tailwind?
- **Speed**: No need to switch between HTML and CSS files.
- **Consistency**: Uses a predefined design system (colors, spacing).
- **Customizability**: Easily extensible via `tailwind.config.ts`.

## Using with Nuxt
The best way to use it is via the `@nuxtjs/tailwindcss` module.
```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss']
})
```

## Utility Classes
```html
<div class="p-4 bg-blue-500 text-white rounded shadow">
  Hello Tailwind!
</div>
```
