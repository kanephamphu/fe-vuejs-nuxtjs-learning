# Promises & Async/Await

Asynchronous programming is the backbone of modern web applications. A **Promise** is a proxy for a value not necessarily known when the promise is created.

## 1. The Promise Lifecycle
- **Pending**: Initial state, neither fulfilled nor rejected.
- **Fulfilled**: Operation completed successfully.
- **Rejected**: Operation failed.

---

## 2. Implementation vs Result

### Scenario A: Basic Promise Chaining
```javascript
const fetchData = () => new Promise(resolve => {
  setTimeout(() => resolve("Data loaded!"), 1000);
});

console.log("Start");
fetchData().then(data => console.log(data));
console.log("End");
```
**Result:**
```text
Start
End
(1 second delay)
Data loaded!
```

### Scenario B: Error Handling with `try/catch`
```javascript
async function getData() {
  try {
    throw new Error("API Failed");
  } catch (err) {
    console.error("Caught:", err.message);
  } finally {
    console.log("Cleanup done.");
  }
}
getData();
```
**Result:**
```text
Caught: API Failed
Cleanup done.
```

---

## 3. The Event Loop & Microtasks
Promises are handled in the **Microtask Queue**, which has higher priority than the standard **Task Queue** (like `setTimeout`).

![Promises & Event Loop Diagram](/images/js-event-loop.png)

---

## 4. Why Use Async/Await?
It allows you to write asynchronous code that *looks* synchronous, making it much easier to read and maintain while avoiding "Callback Hell".

> [!IMPORTANT]
> Always await your promises or use `.catch()` to prevent unhandled rejections, which can crash Node.js processes or cause silent failures in the browser.

## async/await
Syntactic sugar on top of Promises that makes async code look synchronous.

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Success!"), 1000);
});

async function fetchData() {
  const result = await myPromise;
  console.log(result);
}
```
