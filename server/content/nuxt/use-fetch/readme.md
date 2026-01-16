# Data Fetching with useFetch

`useFetch` is the most common way to handle data fetching in Nuxt. It is a wrapper around `useAsyncData` and `$fetch`.

## Usage
```vue
<script setup>
const { data, pending, error, refresh } = await useFetch('/api/users');
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else>
    {{ data }}
  </div>
</template>
```

## Options
- `pick`: Only select specific fields.
- `watch`: Re-run when certain reactive data changes.
- `server`: Only fetch on the server.
- `lazy`: Don't block navigation.
