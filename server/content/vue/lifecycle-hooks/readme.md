# Vue Lifecycle Hooks

Every Vue component instance goes through a series of initialization steps when it's created. Along the way, it runs functions called **Lifecycle Hooks**, giving you the opportunity to add your own code at specific stages.

## 1. The Lifecycle Sequence
- **`onMounted`**: The component has been rendered and the DOM nodes are available. **Best for API calls and DOM manipulation.**
- **`onUpdated`**: The component has re-rendered due to a data change.
- **`onUnmounted`**: The component is about to be destroyed. **Best for cleanup (clearing timers, event listeners).**

---

## 2. Implementation vs Result

### Scenario A: Fetching Data on Mount
**Implementation (Vue):**
```javascript
import { onMounted, ref } from 'vue';

const users = ref([]);

onMounted(async () => {
  console.log("Component is mounted! Fetching users...");
  const response = await fetch('https://api.example.com/users');
  users.value = await response.json();
});
```
**Result:**
The user list is populated immediately after the page finishes loading, providing a seamless user experience.

---

## 3. Visualizing the Lifecycle
Understanding the exact order of hooks is essential for debugging timing-related issues.

![Vue Lifecycle Hooks Diagram](/images/vue_lifecycle_diagram_1768556691522.png)

> [!CAUTION]
> Do not use `onMounted` to try and access a child component's DOM nodes if that child is hidden behind a `v-if` that is currently false. The child must be rendered for its hooks to fire.


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
