# Nuxt CSS Handling

Nuxt makes it easy to manage CSS, whether you're using plain CSS, Sass, or a framework like Tailwind.

## Global CSS
You can define global CSS files in `nuxt.config.ts`.
```javascript
export default defineNuxtConfig({
  css: ['~/assets/css/main.css']
})
```

## Scoped CSS
In `.vue` components, you can use the `<style scoped>` attribute to ensure styles only apply to that component.
```vue
<template>
  <div class="box">Title</div>
</template>

<style scoped>
.box { color: red; }
</style>
```

## Sass/SCSS
Just install the preprocessor: `npm install -D sass`. Nuxt will automatically handle `.scss` files.
