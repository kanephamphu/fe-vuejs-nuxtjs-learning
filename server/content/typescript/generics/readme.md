# TypeScript Generics

Generics allow you to create **reusable components** that work with a variety of types rather than a single one. This provides flexibility without sacrificing type safety.

## 1. The `<T>` Concept
Think of a Generic as a "Type Variable". You pass the type in when you use the function or class.

---

## 2. Implementation vs Result

### Scenario A: Generic Function
```typescript
function getFirst<T>(items: T[]): T {
  return items[0];
}

const firstNum = getFirst([1, 2, 3]);    // T is number
const firstStr = getFirst(["A", "B"]);    // T is string

console.log(firstNum.toFixed(2));
console.log(firstStr.toUpperCase());
```
**Result:**
Both calls are perfectly type-safe. TS knows that `firstNum` is a number and `firstStr` is a string.

### Scenario B: Generic Constraints
Sometimes you want to limit what `T` can be.
```typescript
interface HasId { id: number }

function logId<T extends HasId>(obj: T) {
  console.log("ID is:", obj.id);
}

logId({ id: 101, name: "Admin" }); // Works
logId({ name: "Guest" });           // Error!
```
**Result:**
The `logId` function now **must** receive an object that has an `id` property.

---

## 3. Utility Types (The Power of Generics)
TypeScript provides built-in generics to transform types:
- **`Partial<T>`**: Makes all properties in `T` optional.
- **`Pick<T, Keys>`**: Selects a subset of properties from `T`.
- **`Record<K, T>`**: Creates an object type with specific keys and values.

> [!TIP]
> Use Generics whenever you find yourself writing the exact same logic for multiple different types. It keeps your code DRY (Don't Repeat Yourself).

const stringBox: Box<string> = { contents: "hello" };
