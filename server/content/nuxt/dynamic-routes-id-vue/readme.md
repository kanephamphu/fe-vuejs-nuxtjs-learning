
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
