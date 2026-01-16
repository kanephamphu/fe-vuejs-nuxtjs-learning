# definePageMeta

`definePageMeta` is a compiler macro that you can use to set metadata for your page components located in the `pages/` directory.

## Common Usage
- **layout**: Set a custom layout for the page.
- **middleware**: Define page-specific middleware.
- **alias**: Set one or more aliases for the page.
- **keepalive**: Control whether the page state should be preserved.

```vue
<script setup>
definePageMeta({
  layout: 'auth',
  middleware: ['auth'],
  alias: ['/login-now']
})
</script>
```
# Note
`definePageMeta` can only be used inside the `pages/` directory. It is processed at build time.
