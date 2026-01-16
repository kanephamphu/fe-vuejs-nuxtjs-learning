# Nuxt Server API Routes

Nuxt isn't just a frontend framework; it's a **Fullstack** framework. Using the `server/` directory, you can build a powerful backend API powered by **Nitro**.

## 1. Directory Structure
- `server/api/hello.ts` -> `/api/hello`
- `server/api/user/[id].ts` -> `/api/user/123`
- `server/routes/health` -> `/health` (No `/api` prefix)

---

## 2. Implementation vs Result

### Scenario A: Creating an API Endpoint
**Implementation (`server/api/users.ts`):**
```typescript
export default defineEventHandler(async (event) => {
  // Access headers, query params, or body
  const query = getQuery(event);
  
  return {
    message: "Success!",
    users: [ { id: 1, name: "Kane" } ]
  };
});
```

**Result:**
When you visit `http://localhost:3000/api/users`, you will receive a JSON response. This API is automatically hosted by the same server running your Nuxt app, with no extra configuration needed.

---

## 3. Handling POST Data
```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // Perform database insert here...
  return { status: 'ok' };
});
```

> [!IMPORTANT]
> Nuxt Server Routes use **H3**, a tiny but powerful HTTP framework. It's extremely fast and supports both Node.js and Edge/Serverless environments (like Vercel or Cloudflare Workers).

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
