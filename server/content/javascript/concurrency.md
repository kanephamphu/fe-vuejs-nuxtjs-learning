# Concurrency & Async
JavaScript is single-threaded but handles concurrency using the **Event Loop**.

## Asynchronous Patterns
1. **Callbacks**: Functions passed to run after task completion.
2. **Promises**: Objects representing eventual completion (or failure) of an async operation.
3. **Async/Await**: Syntactic sugar over Promises for writing async code that looks synchronous.

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`
