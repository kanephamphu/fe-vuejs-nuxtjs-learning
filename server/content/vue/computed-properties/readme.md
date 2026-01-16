# Computed Properties

Computed properties allow you to define complex logic that depends on reactive data.

## Why Computed?
Templates should be for simple logic. For complex transformations, use a computed property.
Computed properties are **cached** based on their reactive dependencies.

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
