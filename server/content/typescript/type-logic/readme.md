# Type Logic: typeof, keyof, and Indexed Access

TypeScript provides powerful operators to derive types from values or other types.

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
