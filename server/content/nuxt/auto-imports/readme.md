3. **APIs**: Common functions like `ref`, `computed`, `useRoute`, `useFetch`, etc.

## Benefits
- **Developer Experience**: Less boilerplate, cleaner code.
- **Tree Shaking**: Nuxt only bundle what you actually use.

```vue
<script setup>
// No need to import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <!-- No need to import MyButton component -->
  <MyButton @click="count++">Increment</MyButton>
</template>
```
