# Exercise: Async Thinker

- [x] I understand that JS is single-threaded.
- [x] I know that `setTimeout` is asynchronous.

# Daily Exercise: The Countdown System

### 🧩 The Scenario
You are building a "Flash Sale" banner for an e-commerce site. It needs to count down from 10 seconds and then display "Sale Ended!".

### 🛠️ The Challenge
Write a script using `setInterval` that:
1. Logs "Time left: X" every second.
2. Decrements the time.
3. When it hits 0, it clears the interval and logs "Sale Ended!".

**Starter Code:**
```javascript
function startCountdown() {
  let time = 10;
  // TODO: Your code here
}
startCountdown();
```

---

### ✅ Knowledge Check
- [x] I know how to cancel a timer using its ID.
- [x] I understand that `setTimeout(fn, 0)` does not run immediately.

? Which function runs code repeatedly? ! setInterval
? What unit of time does setTimeout use? ! milliseconds
? How do you stop a setInterval? ! clearInterval

? What happens if you stack too many setTimeouts? (Multiple Choice):
- [x] Performance might degrade
- [x] It's perfectly fine
- [ ] The browser crashes immediately
- [ ] Time goes backwards
? Is JavaScript single-threaded or multi-threaded? ! single-threaded
? Which browser API is commonly used to delay code execution? ! setTimeout
? Does asynchronous code block the main thread? ! No

? Async patterns (Multiple Choice):
- [x] Callbacks
- [x] Promises
- [x] Async/Await
- [ ] Sleep()
