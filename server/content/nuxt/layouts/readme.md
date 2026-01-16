# Layouts

Layouts are wrappers around your pages. They allow you to define a common structure (like a Header, Sidebar, and Footer) that can be reused across multiple pages.

## The Default Layout
If you create a file named `layouts/default.vue`, it will be used for all pages automatically.

```vue
<!-- layouts/default.vue -->
<template>
  <div class="app-container">
    <header>My App</header>
    <main>
      <slot /> <!-- Page content is injected here -->
    </main>
    <footer>© 2024</footer>
  </div>
</template>
```

## Custom Layouts
You can create named layouts, e.g., `layouts/auth.vue` for login/signup pages.

```vue
<!-- layouts/auth.vue -->
<template>
  <div class="auth-layout bg-gray-100 h-screen flex items-center justify-center">
    <slot />
  </div>
</template>
```

### Using a Custom Layout
In your page component, use `definePageMeta`:

```vue
<!-- pages/login.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
</script>
```

## Dynamic Layouts
You can even switch layouts programmatically using `setPageLayout()` if needed, though `definePageMeta` is preferred for static assignments.

## 📚 References
- [Nuxt Docs: Layouts](https://nuxt.com/docs/guide/directory-structure/layouts)
- [Nuxt Docs: definePageMeta](https://nuxt.com/docs/api/utils/define-page-meta)
