# Reactive Data: ref & reactive

Vue 3 uses the Composition API to define reactive state.

## ref
Used for primitive values (string, number, boolean) and can also hold objects. Access via `.value` in logic, but unwrapped in templates.

```typescript
import { ref } from 'vue';
const count = ref(0);
count.value++; // Increment
```

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
