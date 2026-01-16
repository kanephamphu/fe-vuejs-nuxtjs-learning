# Nuxt Layouts

Layouts are used to create common UI structures across multiple pages, such as a **Header**, **Footer**, or **Sidebar**. They help you keep your pages clean and DRY (Don't Repeat Yourself).

## 1. Using Layouts
- **`default.vue`**: The automatic layout applied to all pages.
- **Custom Layouts**: Created in the `layouts/` directory and applied on a per-page basis.

---

## 2. Implementation vs Result

### Scenario A: Defining a Default Layout
**Implementation (`layouts/default.vue`):**
```vue
<template>
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
