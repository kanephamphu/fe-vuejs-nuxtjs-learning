# Computed Properties

Computed properties allow you to define complex logic that depends on reactive data.

## Why Computed?
Templates should be for simple logic. For complex transformations, use a computed property.
# Vue Computed Properties

Computed properties allow you to define a property that is derived from other data. They are **cached** based on their reactive dependencies, making them much more efficient than regular methods.

## 1. Why Computed?
- **Caching**: A computed property will only re-evaluate when some of its reactive dependencies have changed.
- **Declarative**: It describes a value that *should* exist based on other values.

---

## 2. Implementation vs Result

### Scenario A: Filtered List
**Implementation (Vue):**
```javascript
const searchQuery = ref('');
const allItems = ref(['Apple', 'Banana', 'Cherry']);

const filteredItems = computed(() => {
  console.log('Computing list...');
  return allItems.value.filter(item =>
    item.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
```

**Result:**
If you change a *different* piece of data that isn't `searchQuery`, the `console.log` will not run. Vue is smart enough to serve the "cached" result instantly.

---

## 3. Computed vs Methods
- **Method**: Runs every time a re-render happens.
- **Computed**: Only runs when dependencies change.

> [!IMPORTANT]
> Computed properties should be **read-only** by default. They should be "pure" functions—calculating a result without changing any state or performing side effects (like API calls).
 **cached** based on their reactive dependencies.

```javascript
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: ['Vue 2 - Advanced Guide', 'Vue 3 - Basic Guide']
      }
    }
  },
  computed: {
    publishedBooksMessage() {
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}
```
# Dependency Tracking
A computed property will only re-evaluate when some of its reactive dependencies have changed.
