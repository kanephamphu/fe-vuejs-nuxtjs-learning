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
