# ref vs reactive

In the Composition API, there are two main ways to create reactive state: `ref()` and `reactive()`.

## ref()
- Takes an inner value and returns a reactive and mutable ref object.
- Access the value via `.value`.
- Recommended for **primitives** (string, number, boolean) and can also handle objects.
```javascript
const count = ref(0);
count.value++;
```

## reactive()
- Returns a reactive proxy of the object.
- No `.value` needed.
- Only works for **objects** (and collections like Map/Set).
- **CAUTION**: Destructuring or reassigning the variable will lose reactivity!
```javascript
const state = reactive({ count: 0 });
state.count++;
```
