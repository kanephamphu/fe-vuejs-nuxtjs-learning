# Nuxt Data Fetching: useFetch

Nuxt provides two primary ways to fetch data: `useFetch` and `useAsyncData`. Both are designed to handle the complexities of **SSR (Server-Side Rendering)** and prevent duplicate requests.

## 1. Why useFetch?
- **SSR-Friendly**: Fetches data on the server and "hydrates" it on the client without sending a second request.
- **Reactive**: If the URL is a `ref`, Nuxt will automatically re-fetch the data when the URL changes.
- **Type-safe**: Works perfectly with TypeScript out of the box.

---

## 2. Implementation vs Result

### Scenario A: Basic Data Fetching
**Implementation (Nuxt):**
```javascript
const { data, pending, error, refresh } = await useFetch('/api/users');
```

**Result:**
- `data`: The JSON result from the server.
- `pending`: A boolean that is true while the request is in flight.
- `error`: Contains error details if the request fails.
- `refresh`: A function you can call to force a reload of the data.

### Scenario B: Dynamic Parameters
```javascript
const id = ref(1);
const { data: user } = await useFetch(() => `/api/users/${id.value}`);
```
**Result:**
If you change `id.value = 2`, the `user` data will automatically update!

---

## 3. Important Options
- **`pick`**: Only extract specific keys from the API response to keep your payload small.
- **`watch`**: An array of reactive sources to watch for changes to trigger a re-fetch.

> [!CAUTION]
> Never use standard `fetch()` inside your `setup` functions for main data. Standard `fetch` doesn't know about SSR and will cause your app to fetch the data twice (once on server, once on client), leading to flickering and wasted resources.

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
