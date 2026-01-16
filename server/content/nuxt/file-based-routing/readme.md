# File-based Routing in Nuxt

Nuxt uses a file-based routing system built on top of Vue Router.

## Basic Routes
The `pages/` directory determines your application routes.
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
