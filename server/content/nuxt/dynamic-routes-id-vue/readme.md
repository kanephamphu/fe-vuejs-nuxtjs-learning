# Dynamic Routes ([id].vue)

Dynamic routes allow you to create pages that respond to parameters in the URL, such as `/posts/1` or `/users/alice`.

## Syntax
To create a dynamic route, use square brackets in the filename.
Example: `pages/users/[id].vue` matches `/users/1`, `/users/abc`, etc.

## Accessing Parameters
Use `useRoute().params` to access the value.
```vue
<script setup>
const route = useRoute()
const userId = route.params.id
</script>

<template>
  <p>User ID: {{ userId }}</p>
</template>
```

## Catch-all Routes
Use `[...slug].vue` to match any path after the prefix.
Example: `pages/blog/[...slug].vue` matches `/blog/2024/01/post`.
