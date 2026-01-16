# Day 2 Assignment: Typed Data Store

Build a generic data store class in TypeScript.

## Requirements
1. Use a Generic `T` for the data type.
2. Implement methods for `add`, `get`, and `getAll`.
3. Use a private array to store items.

```typescript
class DataStore<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  getAll(): T[] {
    return this.items;
  }
}

const userStore = new DataStore<{name: string}>();
```
