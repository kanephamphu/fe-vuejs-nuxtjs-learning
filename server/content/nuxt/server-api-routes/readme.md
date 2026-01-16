# Server API Routes (Nitro)

Nuxt uses a server engine called Nitro to handle server-side logic in the `server/api` directory.

## Creating an API Route
Create a file like `server/api/hello.ts`.
```typescript
export default defineEventHandler((event) => {
  return {
    message: 'Hello from Nitro!'
  }
})
```
This is accessible at `http://localhost:3000/api/hello`.

## Dynamic API Routes
Use square brackets: `server/api/users/[id].ts`.
```typescript
export default defineEventHandler((event) => {
  const id = event.context.params.id
  return { id }
})
```

## Handling Methods
Nuxt looks for the method in the filename: `server/api/test.post.ts` only responds to POST requests.
