# Environment Variables

Environment variables are used to store secrets and configuration that vary between environments (development, staging, production).

## .env File
Place a `.env` file in your root directory.
```env
STRIPE_KEY=sk_test_123
BASE_URL=http://localhost:3000
```

## Accessing in Nuxt
Nuxt automatically loads variables from `.env`.
Use them in `nuxt.config.ts`:
```javascript
export default defineNuxtConfig({
  runtimeConfig: {
    stripeKey: process.env.STRIPE_KEY
  }
})
```
# Caution
Never commit your `.env` file to version control (Git)!
