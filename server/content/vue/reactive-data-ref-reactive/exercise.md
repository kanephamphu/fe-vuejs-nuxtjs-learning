# Daily Exercise: The State Manager

### 🧩 The Scenario
You are building a game dashboard. You have a "User" object that needs to be tracked. Currently, you are using separate `ref()` for every field, and it's getting messy.

### 🛠️ The Challenge
Refactor the following into a single `reactive` object:
```javascript
const name = ref("Kane");
const score = ref(100);
const isOnline = ref(true);
```

---

### ✅ Knowledge Check
- [x] I understand when to use `ref` vs `reactive`.
- [x] I know that `ref` requires `.value` in logic blocks.
- [x] I can explain why destructuring `reactive` breaks the UI update.

? Which function should you use for a number primitive? ! ref
? Do you need `.value` inside the template? ! no
? Can `reactive` store a simple string? ! no

? Why use `ref` for objects sometimes? (Multiple Choice):
- [x] To allow replacing the entire object
- [x] It's consistent with primitive refs
- [ ] It's faster than reactive
- [ ] It automatically saves to local storage
