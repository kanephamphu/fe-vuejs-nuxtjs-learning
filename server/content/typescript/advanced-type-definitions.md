# Advanced Type Definitions

## Interfaces
Define the shape of an object.
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email?: string; // Optional
}
\`\`\`

## Type Aliases
Similar to interfaces but can represent primitives, unions, tuples.
\`\`\`typescript
type ID = string | number;
type Callback = (data: string) => void;
\`\`\`
