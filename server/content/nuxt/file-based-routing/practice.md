## Practice: Route Parameters

We are on a dynamic page `pages/products/[id].vue`.
We need to extract the product ID from the URL and display it.

### Tasks:
1. Import `useRoute` from '#app' (or rely on auto-import).
2. Get the current route object: `const route = useRoute()`.
3. Extract the `id` from `route.params`.
4. Display "Product ID: {id}" in the template.
5. Add a computed property `formattedId` that makes the ID uppercase.

*Note: In this simulated editor, the route is mocked.*
