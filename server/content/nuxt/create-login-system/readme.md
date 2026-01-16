# Day 9 Assignment: Create Login System

Implement a basic authentication flow using Nitro API routes and Nuxt state.

## Requirements
1. Create a `server/api/auth/login.post.ts` route that returns a token for valid credentials.
2. Create a login page with a form that calls this API.
3. On success, store the token/user state (using a Pinia store or a composable).
4. Use a middleware to protect the dashboard page from unauthenticated users.

```typescript
// server/api/auth/login.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (body.email === 'admin@test.com' && body.password === '123') {
    return { token: 'mock-jwt-token' }
  }
  throw createError({ statusCode: 401, message: 'Invalid credentials' })
})
```
