# Practice: The Timer Lab

In this lab, you'll master JavaScript's scheduling functions: `setTimeout` and `setInterval`. You'll learn how to start them, stop them, and see how they interact with the execution flow.

## 1. The Delayed Message (`setTimeout`)
`setTimeout` allows you to run a function once after a specified delay (in milliseconds).

**Lab Task:**
- Create a timeout that logs "BOOM!" after 3 seconds.
- Notice that code *after* the timeout runs *before* the timeout finishes.

**Implementation Hint:**
```javascript
console.log("Timer started...");
setTimeout(() => {
  console.log("BOOM! (3 seconds later)");
}, 3000);
console.log("Timer is ticking...");
```

**Verify your progress:**
- [ ] Does "Timer is ticking..." appear BEFORE "BOOM!"? (It should!).

---

## 2. The Recurring Metronome (`setInterval`)
`setInterval` runs a function repeatedly at a specific interval.

**Lab Task:**
- Create a counter that counts up every 1 second.
- use `clearInterval` to stop it when it reaches 5.

**Implementation Hint:**
```javascript
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Beat: ${count}`);

  if (count >= 5) {
    clearInterval(intervalId);
    console.log("Metronome stopped.");
  }
}, 1000);
```

**Verify your progress:**
- [ ] Does it stop exactly at 5?
- [ ] What happens if you forget `clearInterval`? (Spoiler: It runs forever!).

---

## 3. The Zero-Delay Trick
What happens if you set the timeout to `0`?

**Implementation Hint:**
```javascript
console.log("1. Start");
setTimeout(() => console.log("2. Timeout"), 0);
console.log("3. End");
```

**Verify your progress:**
- [ ] Predict the order. Is it 1, 2, 3 OR 1, 3, 2?
- [ ] Understanding this proves you master the **Event Loop**!
