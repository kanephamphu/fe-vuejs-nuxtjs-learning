# Auto Imports in Nuxt

Nuxt automatically imports your components, composables, and Vue/Nuxt APIs, so you don't have to write import statements manually.

## What is auto-imported?
1. **Components**: Any component in the `components/` directory.
2. **Composables**: Any function exported in the `composables/` directory.
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
