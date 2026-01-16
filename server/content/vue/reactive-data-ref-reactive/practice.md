# Practice: The Reactivity Lab

In this lab, you'll experiment with `ref()` and `reactive()`, and observe the common mistake of "losing reactivity" when destructuring.

## 1. Comparing `ref` vs `reactive`
Try to store a primitive and an object using both methods.

**Implementation Hint (Vue):**
```vue
<script setup>
import { ref, reactive } from 'vue';

// 1. A primitive with ref
const count = ref(0);

// 2. An object with reactive
const state = reactive({
  name: "Kane",
  score: 10
});

const update = () => {
  count.value++;   // ref needs .value
  state.score++;   // reactive does NOT need .value
};
</script>
```

**Verify your progress:**
- [ ] Does `count.value++` work without `.value`? (Spoiler: No, it would try to increment the object itself).
- [ ] Does `state.score++` work?

---

## 2. The Destructuring Trap
One of the most common Vue bugs is destructuring a `reactive` object and losing its link to the UI.

**Implementation Hint:**
```javascript
const { name } = state; 
// Now try changing state.name = "New Name"
// Does the {{ name }} in your template update?
```

**Verify your progress:**
- [ ] Observe that the UI **stopped updating** for the destructured variable.
- [ ] Solution: Use `toRefs(state)` if you must destructure.

---

## 3. Deep Reactivity
Vue reactivity is "deep" by default.

**Implementation Hint:**
```javascript
const user = reactive({
  profile: { age: 25 }
});
user.profile.age = 26; // This WILL trigger an update
```
