# TypeScript Type Logic

Type Logic allows you to constrain values to specific sets (Literals) or provide a set of named constants (Enums). This eliminates "magic strings" and "magic numbers" from your code.

## 1. Literals & Enums
- **Literal Types**: Restrict a variable to an exact value (`'loading' | 'done'`).
- **Enums**: A way to define a set of named constants. Numeric by default, but can be String-based.

---

## 2. Implementation vs Result

### Scenario A: Literal Type Safety
```typescript
type Direction = 'North' | 'South' | 'East' | 'West';

function move(dir: Direction) {
  console.log(`Moving ${dir}`);
}

move('North');
move('Center'); // Error!
```
**Result (Compiler Error):**
```text
Argument of type '"Center"' is not assignable to parameter of type 'Direction'.
```

### Scenario B: String Enums (Clearer Logs)
```typescript
enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

const currentRole = UserRole.Admin;
console.log(currentRole);
```
**Result:**
```text
ADMIN
```

---

## 3. Lookup Types & `keyof`
The `keyof` operator takes an object type and produces a string or numeric literal union of its keys.
```typescript
interface Config {
  apiUrl: string;
  timeout: number;
}
type ConfigKey = keyof Config; // "apiUrl" | "timeout"
```

> [!IMPORTANT]
> Prefer **String Literals** over Enums in most modern TypeScript projects. They are more "Standard JS" friendly and often lead to cleaner, more tree-shakeable code.

## typeof
Extract the type of a value.
```typescript
const user = { name: "Alice", age: 30 };
type UserType = typeof user; // { name: string, age: number }
```

## keyof
Get a union of all keys of an object type.
```typescript
type UserKeys = keyof UserType; // "name" | "age"
```

## Indexed Access
Access the type of a specific property.
```typescript
type NameType = UserType["name"]; // string
```
