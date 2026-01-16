# What is Nuxt?

Nuxt is an open source framework that makes web development intuitive and powerful. It is built on top of **Vue.js**, providing a structured way to build performant, SEO-friendly applications.

## Why Nuxt? (The Problems it Solves)

Standard Vue applications are Single Page Applications (SPAs). While SPAs are great for user experience, they have two major downsides:

1.  **Empty First Paint**: The browser downloads an empty `index.html` file and then waits for the JavaScript bundle to execute before showing anything.
2.  **Poor SEO**: Search engines (crawlers) often struggle to index client-side rendered content efficiently.

## Rendering Modes

Nuxt allows you to choose the best rendering strategy for your app:

### 1. Universal Rendering (SSR)
Your application is rendered on the server (returning full HTML) and then "hydrated" on the client.
- **Pros**: Excellent SEO, fast initial load.
- **Cons**: Requires a Node.js server.

### 2. Static Site Generation (SSG)
Nuxt pre-renders every page of your app into static HTML files at build time.
- **Pros**: Can be hosted anywhere (Netlify, Vercel, S3), super fast, secure.
- **Cons**: Build time increases with the number of pages.

### 3. Client-Side Rendering (CSR)
Acts exactly like a standard Vue SPA. Nuxt still provides benefits like file-based routing and auto-imports.

## Key Features

- **File-based Routing**: Define routes by creating files in `pages/`.
- **Code Splitting**: Nuxt automatically splits your code into smaller chunks.
- **Auto-imports**: Use Vue composables (`ref`, `computed`) and Nuxt utils (`useFetch`) without importing them.
- **Zero Config**: TypeScript and modern tools are configured out of the box.

> [!TIP]
> Nuxt follows the principle of **Convention over Configuration**. By following its folder structure, you avoid manually wiring up routes, stores, and middleware.

## 📚 References
- [Nuxt Documentation](https://nuxt.com/docs/getting-started/introduction)
- [Vue.js Guide](https://vuejs.org/guide/introduction.html)
- [Universal Rendering Explained](https://nuxt.com/docs/guide/concepts/rendering)
