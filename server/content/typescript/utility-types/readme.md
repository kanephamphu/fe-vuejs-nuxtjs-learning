# Utility Types

TypeScript provides several utility types to facilitate common type transformations.

## Common Utilities
- `Partial<T>`: Makes all properties in `T` optional.
- `Required<T>`: Makes all properties in `T` required.
- `Readonly<T>`: Makes all properties in `T` readonly.
- `Pick<T, Keys>`: Selects a set of properties from `T`.
- `Omit<T, Keys>`: Removes a set of properties from `T`.
- `Record<Keys, T>`: Constructs an object type with specific keys and values.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserPreview = Pick<User, "name" | "email">;
type DraftUser = Partial<User>;
```
