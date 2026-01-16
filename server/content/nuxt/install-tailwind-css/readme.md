# Day 8 Assignment: Install TailwindCSS

Practice setting up Tailwind CSS in a fresh Nuxt project.

## Requirements
1. Install the module: `npm install -D @nuxtjs/tailwindcss`.
2. Add `@nuxtjs/tailwindcss` to the `modules` array in `nuxt.config.ts`.
3. Create a `tailwind.config.js` file (optional, but good for customization).
4. Use Tailwind's grid or flex classes to build a simple 3-column layout.

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
    <div class="bg-red-100 p-4">Column 1</div>
    <div class="bg-green-100 p-4">Column 2</div>
    <div class="bg-blue-100 p-4">Column 3</div>
  </div>
</template>
```
