# The JavaScript Event Loop

JavaScript is **single-threaded**, meaning it can only do one thing at a time. The **Event Loop** is the secret sauce that allows it to handle thousands of concurrent operations (like network requests) without freezing the UI.

## 1. The Architecture
- **Call Stack**: Where your code is executed (LIFO).
- **Web APIs**: Browser features (DOM, setTimeout, Fetch) that handle async work.
- **Microtask Queue**: Promises and MutationObservers (High priority).
- **Task Queue**: Timers and Events (Lower priority).

---

## 2. Implementation vs Result

### Scenario A: The Execution Order
```javascript
console.log("1: Start");

setTimeout(() => console.log("2: Timeout"), 0);

Promise.resolve().then(() => console.log("3: Promise"));

console.log("4: End");
```
**Result:**
```text
1: Start
4: End
3: Promise (Microtask runs immediately after stack is empty)
2: Timeout (Task runs after ALL microtasks)
```

---

## 3. Visualizing the Loop
The Event Loop constantly checks if the **Call Stack** is empty. If it is, it first drains the **Microtask Queue**, then takes one task from the **Task Queue**.

![Event Loop Diagram](file:///C:/Users/ptai/.gemini/antigravity/brain/737194ec-538b-4679-b8b6-55b2472cf8bf/js_promises_event_loop_diagram_1768555928473.png)

> [!CAUTION]
> Don't block the stack! Heavy calculations (like processing a huge image) in the main thread will freeze your entire website because the Event Loop won't be able to process any new tasks.

```javascript
function bar() { console.log("bar"); }
function foo() { bar(); }
foo();
Stack: `foo` -> `bar` -> `console.log`.
