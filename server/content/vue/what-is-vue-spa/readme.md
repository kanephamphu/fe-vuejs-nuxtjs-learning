## Why Vue?
- **Declarative Rendering**: Vue uses a template syntax that allows you to declaratively describe the output based on JavaScript state.
- **Reactivity**: Vue automatically tracks changes to JavaScript state and efficiently updates the DOM when changes happen.

```javascript
const app = Vue.createApp({
  data() {
    return { count: 0 }
  }
}).mount('#app')
```
