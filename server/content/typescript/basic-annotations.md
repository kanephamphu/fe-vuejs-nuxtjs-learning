# Basic Annotations in TypeScript
TypeScript adds static typing to JavaScript. Annotations explicitly specify the type of variables, function parameters, and return values.

## Syntax
```typescript
let variableName: Type = value;
```

## Common Types
- `string`, `number`, `boolean`
- `any`: Disables type checking (avoid when possible).
- `void`: For functions returning nothing.
- `null`, `undefined`.
- Arrays: `number[]` or `Array<number>`.

```typescript
function add(a: number, b: number): number {
  return a + b;
}
```
