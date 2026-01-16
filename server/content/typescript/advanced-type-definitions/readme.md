# TypeScript Advanced Type Definitions

Moving beyond basic types, TypeScript allows you to compose complex types using **Unions**, **Intersections**, and **Type Aliases**.

## 1. Core Composition
- **Unions (`|`)**: A value that coordinate be one of several types.
- **Intersections (`&`)**: Combines multiple types into one.
- **Type Aliases (`type`)**: A way to give a name to any type (including unions and intersections).

---

## 2. Implementation vs Result

### Scenario A: Union Types & Narrowing
TypeScript requires you to "narrow" the type before you can use properties specific to one branch.

**Implementation (TypeScript):**
```typescript
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this block, TS knows id is a string
    console.log(id.toUpperCase());
  } else {
    // In this block, TS knows id is a number
    console.log(id.toFixed(2));
  }
}
```

**Result:**
The compiler ensures you don't accidentally call `.toUpperCase()` on a number, preventing runtime crashes.

### Scenario B: Intersection Types
```typescript
interface HasName { name: string }
interface HasAge { age: number }

type Person = HasName & HasAge;

const kane: Person = {
  name: "Kane",
  age: 28
};
```
**Result:**
The `kane` object **must** have both a name and an age. If either is missing, TS will throw an error.

---

## 3. Interfaces vs Type Aliases
- **Interfaces**: Can be extended (`extends`) and "merged" (Declaration Merging). Better for objects.
- **Type Aliases**: Can represent anything (Unions, Tuples). Cannot be merged. Use when you need more flexibility.

> [!TIP]
> Use Discriminated Unions (Unions with a common literal property) for complex state management. It's the most powerful way to handle multiple "modes" or "statuses" in your application.
