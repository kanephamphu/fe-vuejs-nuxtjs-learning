# Advanced Type Definitions

Explore Unions, Intersections, and Type Aliases.

## Type Aliases
```typescript
type ID = string | number;
type User = {
  id: ID;
  name: string;
};
```

## Unions (|)
A value can be one of several types.
```typescript
let result: string | number = 404;
```

## Intersections (&)
Combines multiple types into one.
```typescript
type Timestamps = { createdAt: Date };
type Post = User & Timestamps & { content: string };
```
