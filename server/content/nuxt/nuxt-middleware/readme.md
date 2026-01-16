# Nuxt Middleware

Nuxt provides a middleware system that allows you to run code before navigating to a particular route.

## Types of Middleware
1. **Anonymous (Inline)**: Defined directly in the page.
2. **Named**: Defined in the `middleware/` directory and applied via `definePageMeta`.
3. **Global**: Defined in the `middleware/` directory with a `.global` suffix (e.g., `auth.global.ts`).

## Example: Auth Middleware
```javascript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = useAuth() // custom composable

  if (!authenticated) {
    return navigateTo('/login')
  }
})
```
# Order of Execution
Global middleware runs first, followed by page-specific middleware in the order they are defined.
