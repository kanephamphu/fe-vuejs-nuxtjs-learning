# Data Fetching

Nuxt provides composables to handle data fetching in your Vue components. They are SSR-friendly, meaning they run on the server during initial load and on the client during navigation.

## `useFetch`
The most straightforward way to fetch data. It is a wrapper around `$fetch`.
```javascript
const { data, pending, error } = await useFetch('/api/users')
```
- **SSR-safe**: Dedupes calls so data isn't fetched twice.
- **Reactive**: `data`, `pending`, `error` are reactive refs.

## `useAsyncData`
More flexible wrapper. Useful when you need to wrap multiple async calls or non-fetch logic.
```javascript
const { data } = await useAsyncData('users', () => myAsyncFunction())
```

## Modifiers
- `lazy: true`: Don't block navigation.
- `pick: ['id', 'name']`: Only return specific fields.
- `transform`: Alter data before returning.
