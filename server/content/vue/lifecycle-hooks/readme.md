# Lifecycle Hooks

Each Vue component instance goes through a series of initialization steps when it's created - for example, it needs to set up data observation, compile the template, mount the instance to the DOM, and update the DOM when data changes. Along the way, it also runs functions called lifecycle hooks, giving users the opportunity to add their own code at specific stages.

## Diagram
Creation -> Mounting -> Updating -> Unmounting

## Key Hooks (Composition API)

- `onMounted()`: Called after the component has been mounted. Safe to access the DOM here.
- `onUpdated()`: Called after the component has updated its DOM tree due to a reactive state change.
- `onUnmounted()`: Called after the component has been unmounted. Good for cleanup (timers, event listeners).

## Example
```javascript
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```
