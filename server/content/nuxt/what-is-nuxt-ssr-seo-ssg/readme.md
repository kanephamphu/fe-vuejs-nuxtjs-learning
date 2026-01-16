# What is Nuxt? (SSR, SEO, & SSG)

Nuxt is a powerful framework built on top of Vue.js that solves some of the biggest problems in modern web development: **SEO**, **Performance**, and **Developer Experience**.

## 1. Core Rendering Modes
- **SSR (Server-Side Rendering)**: Nuxt renders the full HTML on the server for every request. **Best for SEO & Dynamic Content.**
- **SSG (Static Site Generation)**: Nuxt pre-renders every page into static HTML files at build time. **Best for Speed.**
- **Hydration**: The process where a static page becomes interactive once it reaches the browser.

---

## 2. Implementation vs Result

### Scenario A: Universal Search Engine Visibility
Because Nuxt sends full HTML, search engines (like Google) can see your content immediately.

**Implementation (Nuxt Page):**
```vue
<script setup>
useSeoMeta({
  title: 'My Incredible Course',
  description: 'Master Nuxt.js in 12 days!'
});
</script>
```

**Result (Rendered HTML Source):**
```html
<head>
  <title>My Incredible Course</title>
  <meta name="description" content="Master Nuxt.js in 12 days!">
</head>
<body>
  <h1>Master Nuxt.js...</h1>
</body>
```
*Contrast: Standard SPAs often send an almost empty `<body>`.*

---

## 3. The Nuxt Lifecycle (Server to Client)
Understanding how code travels from your server to your user's screen is vital.

![Nuxt SSR Lifecycle Diagram](/images/nuxt-lifecycle.png)

---

## 4. Why Nuxt?
Beyond rendering, Nuxt provides **File-based Routing**, **Auto-imports**, and a powerful **Module System** that eliminates thousands of lines of boilerplate code.

> [!IMPORTANT]
> Some Browser-only globals like `window` or `document` are not available during SSR. Wrap them in `process.client` checks or `onMounted` hooks to prevent server crashes.
you to mix these strategies on a per-page basis!
