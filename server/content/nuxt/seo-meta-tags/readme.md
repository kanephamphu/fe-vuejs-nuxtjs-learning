# SEO Meta Tags in Nuxt

Nuxt provides several ways to manage your application's SEO and meta tags.

## useHead
The `useHead` composable allows you to programmatically set `<head>` tags.
```javascript
useHead({
  title: 'My Page Title',
  meta: [
    { name: 'description', content: 'This is my page description' }
  ]
})
```

## useSeoMeta
A more developer-friendly way to set SEO tags, especially for social media sharing.
```javascript
useSeoMeta({
  title: 'My Page',
  ogTitle: 'My Page',
  description: 'This is my page',
  ogDescription: 'This is my page',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
```
# Components
You can also use `<Title>`, `<Meta>`, and `<Link>` components in your templates.
