# What is Vue & SPA?

Vue.js is a progressive JavaScript framework for building user interfaces.

## Single Page Applications (SPA)
An SPA is a web application that loads a single HTML page and dynamically updates that page as the user interacts with the app.

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
