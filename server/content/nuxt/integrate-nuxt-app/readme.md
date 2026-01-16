# Day 7 Assignment: Integrate Nuxt App

Connect your Nuxt frontend to a real (or mock) API and display meaningful data.

## Requirements
1. Create a page `pages/products/index.vue`.
2. Use `useFetch` to get a list of products from `https://fakestoreapi.com/products`.
3. Handle the `pending` state with a loading message.
4. Display the product titles and prices in a list.

```vue
<script setup>
const { data: products, pending } = await useFetch('https://fakestoreapi.com/products')
</script>

<template>
  <div v-if="pending">Loading products...</div>
  <ul v-else>
    <li v-for="product in products" :key="product.id">
      {{ product.title }} - ${{ product.price }}
    </li>
  </ul>
</template>
```
