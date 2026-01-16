# Generics

Generics allow you to create reusable components that work with a variety of types rather than a single one.

## Basic Syntax
```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("myString");
let output2 = identity<number>(100);
```

## Generic Interfaces
```typescript
interface Box<T> {
  contents: T;
}

const stringBox: Box<string> = { contents: "hello" };
```
