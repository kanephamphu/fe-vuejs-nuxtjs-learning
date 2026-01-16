# Error & Loading States

Handling pending and error states is essential for a good user experience.

## Pending State
The `pending` boolean from `useFetch` or `useAsyncData` tells you if the request is still loading.
```html
<div v-if="pending">Loading...</div>
<div v-else>{{ data }}</div>
```

## Error State
The `error` object contains information if the request failed.
```html
<div v-if="error">
  <p>Something went wrong: {{ error.message }}</p>
  <button @click="refresh">Try Again</button>
</div>
```

## Global Error Page
Nuxt automatically displays `error.vue` in the root of your project when an unhandled error occurs.
