# Runtime Config per Environment

Nuxt provides a Runtime Config API to expose configuration and environment variables within your application.

## Configuration
In `nuxt.config.ts`:
```javascript
export default defineNuxtConfig({
  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    },
    // Private keys are only available server-side
    apiSecret: '123'
  }
})
```

## Usage
Use the `useRuntimeConfig` composable.
```javascript
const config = useRuntimeConfig()
console.log(config.public.apiBase)
```
# Environment Variables
You can override these values using `.env` files or environment variables prefixed with `NUXT_`.
Example: `NUXT_PUBLIC_API_BASE=https://prod.com/api`
