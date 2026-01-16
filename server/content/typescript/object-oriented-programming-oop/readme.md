# Object-Oriented Programming (OOP) in TypeScript

TypeScript adds powerful features to JavaScript classes, such as access modifiers and interfaces.

## Access Modifiers
- `public`: Accessible from anywhere (default).
- `private`: Accessible only within the class.
- `protected`: Accessible within the class and its subclasses.

## Interaces & Classes
A class can implement an interface to enforce a specific structure.

```typescript
interface Animal {
  makeSound(): void;
}

class Dog implements Animal {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public makeSound(): void {
    console.log("Woof!");
  }
}
```
# Inheritence
```typescript
class Poodle extends Dog {
  // Inherits name and makeSound
}
```
