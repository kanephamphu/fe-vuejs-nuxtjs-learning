# The Event Loop

The Event Loop is the mechanism that allows JavaScript to perform non-blocking I/O operations.

## How it Works
1. **Call Stack**: Where the code currently executing lives.
2. **Web APIs**: Browser features (DOM, setTimeout, Fetch) that handle async tasks.
3. **Callback Queue**: Where finished async tasks wait to be pushed back to the stack.
4. **Event Loop**: Monitors the Stack and Queue. If the Stack is empty, it pushes the first item from the Queue.

```javascript
function bar() { console.log("bar"); }
function foo() { bar(); }
foo();
```
Stack: `foo` -> `bar` -> `console.log`.
