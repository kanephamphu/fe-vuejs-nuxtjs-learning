
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
