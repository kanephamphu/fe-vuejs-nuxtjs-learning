# Vue Reactive Data: `ref` vs `reactive`

Vue's reactivity system is powered by JavaScript **Proxies**. It allows Vue to track access and changes to data, automatically updating the DOM when values change.

## 1. `ref()` vs `reactive()`
- **`ref()`**: Used for **primitive** values (strings, numbers) or objects. It wraps the value in an object with a `.value` property.
- **`reactive()`**: Used for **objects and arrays** only. It makes the object itself reactive without using `.value`.

---

## 2. Implementation vs Result

### Scenario A: Working with `ref`
```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);
const increment = () => count.value++;
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```
**Result:**
Initial UI shows `0`. Clicking the button changes it to `1` instantly.

### Scenario B: Working with `reactive`
```javascript
import { reactive } from 'vue';
const state = reactive({ name: 'Vue', age: 3 });

// No .value needed
state.age = 4;
```
**Note:** If you destructure a reactive object (`const { age } = state`), you **lose reactivity**! Use `toRefs()` to fix this.

---

## 3. How it Works (Proxies)
Vue 3 uses **ES6 Proxies** to "intercept" operations on your data.

![Vue Reactivity Proxy Diagram](/images/vue_reactivity_proxy_diagram_1768556012681.png)

---

## 4. Why use `ref()` most of the time?
`ref()` is more flexible because it can hold any data type and is easier to track in your code due to the explicit `.value` requirement in scripts.

> [!TIP]
> Use `<script setup>` for the most concise and modern Vue development experience. It handles a lot of the boilerplate for you.

## reactive
Used only for objects and arrays. No `.value` needed.

```typescript
import { reactive } from 'vue';
const user = reactive({
  name: 'John',
  age: 30
});
user.age++;
```
