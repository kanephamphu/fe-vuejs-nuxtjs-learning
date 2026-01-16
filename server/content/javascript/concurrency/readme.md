# Concurrency in JavaScript

JavaScript is single-threaded, meaning it can only execute one thing at a time. However, it handles concurrency using an asynchronous model.

## JavaScript Concurrency

Concurrency in JavaScript is the ability to manage multiple tasks that start, run, and complete in overlapping time periods. It's important to distinguish this from **Parallelism** (doing two things at the exact same time).

## 1. Concurrency vs Parallelism
- **Concurrency**: Dealing with many things at once (using the Event Loop).
- **Parallelism**: Doing many things at once (using Web Workers).

---

## 2. Implementation vs Result

### Scenario A: Managing Multiple Requests
```javascript
async function fetchAll() {
  console.log("Fetching...");
  const [res1, res2] = await Promise.all([
    fetch("https://api.example.com/data1"),
    fetch("https://api.example.com/data2")
  ]);
  console.log("Both done!");
}
fetchAll();
```
**Result:**
Both requests start **at the same time**. The total wait time is just the time of the *slowest* request, not the sum of both.

---

## 3. Web Workers for Heavy Tasks
For CPU-intensive tasks (like data processing), use **Web Workers** to run code in a background thread, preventing the UI from freezing.

> [!TIP]
> Use `Promise.allSettled()` if you want to wait for multiple requests but don't want one single failure to cancel all other results.
```javascript
console.log("Start");
setTimeout(() => console.log("Async Task"), 1000);
console.log("End");
```
Output: `Start`, `End`, `Async Task` after 1s.
