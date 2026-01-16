# Route Guards

Route guards are patterns used to protect routes from unauthorized access. In Nuxt, we primarily use **Named Middleware** for this.

## Protecting a Page
In `pages/admin.vue`:
```vue
<script setup>
definePageMeta({
  middleware: 'auth' // Refers to middleware/auth.ts
})
</script>
```

## Logic in Guard
Inside the middleware, you can inspect the `to` and `from` route objects and decide whether to allow the navigation or redirect the user.

```javascript
export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/admin') && !isAdmin.value) {
    return abortNavigation('You are not allowed here')
  }
})
```
