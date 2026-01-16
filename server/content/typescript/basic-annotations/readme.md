# TypeScript: Basic Annotations

TypeScript is a **superset** of JavaScript that adds **static typing**. This means you can catch errors *before* you even run your code, directly in your editor.

## 1. Core Types
- **string**, **number**, **boolean**: The basic building blocks.
- **any**: Disables type checking (Use sparingly!).
- **void**: Used for functions that don't return a value.

---

## 2. Implementation vs Result

### Scenario A: Function Type Safety
TypeScript ensures the arguments you pass match the expected types.

**Implementation (TypeScript):**
```typescript
function greet(name: string, age: number): string {
  return `Hello ${name}, you are ${age} years old!`;
}

// Error during development!
greet("Alice", "twenty-five"); 
```

**Result (Compiler Error):
```text
Argument of type 'string' is not assignable to parameter of type 'number'.
```

### Scenario B: Object Interface
```typescript
interface User {
  id: number;
  username: string;
  isAdmin?: boolean; // Optional property
}

const newUser: User = { id: 1, username: "dev_kane" };
```
**Result:**
The `newUser` object is now perfectly validated. If you try to add `state: "active"`, TS will prevent it.

---

## 3. How it Works (Transpilation)
Browsers cannot run TypeScript. It must be converted into JavaScript first.

![TypeScript Type System Diagram](/images/ts_type_system_diagram_1768556089387.png)

---

## 4. The Power of "Static Checking"
Static checking means errors are caught during the **build step**, not at **runtime** when your users are using the app.

> [!TIP]
> Use `interface` for defining object structures and `type` for unions or aliases. Interfaces are generally preferred for public-facing APIs due to better error messages and extensibility.
