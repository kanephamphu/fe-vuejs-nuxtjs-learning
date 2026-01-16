# Practice: Exploring Primitives

In this lab, you'll experiment with JavaScript's primitive types and observe their unique behaviors, especially the immutability and the `typeof` quirks.

## 1. The `typeof` Mystery
Try to find out what JavaScript thinks `null` and `undefined` are.

**Lab Task:**
1. Open your console (or use the editor).
2. Type `typeof null`.
3. Type `typeof undefined`.

---

## 2. Immutability Test
Primitives cannot be changed; they can only be replaced.

**Implementation Hint:**
```javascript
let name = "Kane";
name[0] = "C"; // Trying to change the first letter
console.log(name); 
```

**Verify your progress:**
- [ ] Does the name change to "Cane"? (Spoiler: No, it remains "Kane").
- [ ] What happens if you re-assign the whole variable: `name = "Cane"`?

---

## 3. Symbol Creation
Symbols are unique identifer primitives.

**Implementation Hint:**
```javascript
const s1 = Symbol("id");
const s2 = Symbol("id");
console.log(s1 === s2);
```

**Verify your progress:**
- [ ] Are the two symbols equal even though they have the same description?
