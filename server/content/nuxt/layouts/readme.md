# Nuxt Layouts

Layouts are a great way to handle common UI elements like headers and footers that are shared across multiple pages.

## Default Layout
Create a `layouts/default.vue` file.
```vue
<template>
  <div>
    <header>My Website</header>
    <slot /> <!-- Page content will be injected here -->
    <footer>© 2024</footer>
  </div>
</template>
```

## Custom Layouts
You can create multiple layouts in the `layouts/` directory. To use a custom layout on a page, use `definePageMeta`.
```vue
<script setup>
definePageMeta({
  layout: 'custom'
})
</script>
```
# The Slot
In Nuxt layouts, the `<slot />` component (note: no name) is used as the placeholder where the page content will be rendered.
