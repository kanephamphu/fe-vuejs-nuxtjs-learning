# Nuxt File-based Routing

Nuxt eliminates the need for manual router configuration. It automatically generates your application's routes based on the file structure of the `pages/` directory.

## 1. Directory Structure Rule
- `pages/index.vue` -> `/`
- `pages/about.vue` -> `/about`

## Dynamic Routes
Use brackets in filenames for parameters.
- `pages/users/[id].vue` -> `/users/123`

```vue
<script setup>
const route = useRoute();
console.log(route.params.id);
</script>
```

## Navigation
Use `<NuxtLink>` for client-side navigation.
`<NuxtLink to="/about">About Us</NuxtLink>`
