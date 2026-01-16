# useAsyncData

`useAsyncData` is a composable provided by Nuxt to handle asynchronous data fetching with SSR support.

## Difference from useFetch
`useFetch(url)` is a shorthand for `useAsyncData(key, () => $fetch(url))`. Use `useAsyncData` when you need to perform more complex logic before fetching, or when using a different data source (e.g., a database driver).

## Usage
```javascript
const { data, pending, error, refresh } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxt.com/mountains')
)
```

## Refreshing Data
The `refresh` function can be used to re-execute the fetching logic manually.
