# Middleware

Middleware allows you to run code **before** navigating to a particular route. It is widely used for authentication guards (e.g., checking if a user is logged in).

## Types of Middleware

1.  **Inline Route Middleware**: Defined directly in the page.
2.  **Named Route Middleware**: Defined in `middleware/` and used in specific pages.
3.  **Global Route Middleware**: Defined in `middleware/` with a `.global.ts` suffix. Runs on every route change.

## Creating Named Middleware
Create a file `middleware/auth.ts`:

```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = false; // logic to check auth state

  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo('/login');
  }
})
```

## Using Middleware
Apply it in your page using `definePageMeta`:

```vue
<!-- pages/dashboard.vue -->
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

> [!WARNING]
> Middleware runs on both the client (during navigation) and the server (on initial load). Ensure your logic is SSR-safe (e.g., check for `window` before accessing browser APIs, or rely on cookies which are available on both).

## 📚 References
- [Nuxt Docs: Middleware](https://nuxt.com/docs/guide/directory-structure/middleware)
- [Nuxt Docs: Route Middleware](https://nuxt.com/docs/guide/concepts/auto-imports#explicit-importing)
