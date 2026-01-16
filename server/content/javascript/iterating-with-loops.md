# Iterating with Loops
Loops offer a quick and easy way to do something repeatedly.

## Common Loops
1. **`for` loop**: Standard loop with initializer, condition, and increment.
2. **`while` loop**: Loops as long as a specified condition is true.
3. **`do...while` loop**: Executes the block once, then checks condition.
4. **`for...of` loop**: Iterates over iterable objects (arrays, strings).
5. **`for...in` loop**: Iterates over enumerable properties of an object.

### Example: For...of
```javascript
const array = ['a', 'b', 'c'];
for (const element of array) {
  console.log(element);
}
```
