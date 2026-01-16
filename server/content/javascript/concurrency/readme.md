# Concurrency in JavaScript

JavaScript is single-threaded, meaning it can only execute one thing at a time. However, it handles concurrency using an asynchronous model.

## Synchronous vs Asynchronous
- **Synchronous**: Code executes line by line. Each line waits for the previous one.
- **Asynchronous**: Code can start a task and move on. When the task is done, the result is handled later (e.g., via callbacks).

```javascript
console.log("Start");
setTimeout(() => console.log("Async Task"), 1000);
console.log("End");
```
Output: `Start`, `End`, `Async Task` after 1s.
