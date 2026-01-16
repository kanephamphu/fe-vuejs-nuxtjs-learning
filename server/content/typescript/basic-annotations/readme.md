# Basic Annotations

TypeScript allows you to explicitly define types for variables, function parameters, and return values.

## Key Types
- `string`: `"Hello"`
- `number`: `42`
- `boolean`: `true`
- `any`: Disables type checking (use sparingly!)
- `void`: No return value

```typescript
let username: string = "Alice";
let count: number = 0;

function greet(name: string): string {
  return `Hello, ${name}`;
}
```
