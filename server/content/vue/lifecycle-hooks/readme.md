# Lifecycle Hooks

Each Vue component instance goes through a series of initialization steps when it's created - for example, it needs to set up data observation, compile the template, mount the instance to the DOM, and update the DOM when data changes.

## Common Hooks
- `mounted`: Called after the instance has been mounted to the DOM. Best place for DOM manipulation or fetching data.
- `updated`: Called after a data change causes the virtual DOM to be re-rendered and patched.
- `unmounted`: Called after a component instance has been unmounted. Best place to clean up timers or event listeners.

```javascript
export default {
  mounted() {
    console.log('Component is now mounted!');
  }
}
```
# Composition API Hooks
In `<script setup>`, hooks are prefixed with `on`: `onMounted`, `onUpdated`, etc.
