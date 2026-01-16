# Daily Exercise: The Legacy Refactor

### 🧩 The Scenario
You've inherited a codebase full of `var` declarations and confusing global leaks. Your job is to refactor a specific function to use modern scoping and prevent bugs.

### 🛠️ The Challenge
Identify the issues in this snippet:
```javascript
function processData() {
  if (true) {
    var data = "Important Info";
  }
  console.log(data); // This works! Why?
}
```

---

### ✅ Knowledge Check
- [x] I know that `const` cannot be reassigned.
- [x] I understand that `let` is block-scoped.
- [x] I can explain the "Temporal Dead Zone".

? Which keyword should you use for a value that never changes? ! const
? What happens if you access a `let` variable before it is declared? ! ReferenceError
? Which scope does `var` have? ! function

? Why is `const` safer than `var`? (Multiple Choice):
- [x] Prevents accidental reassignment
- [x] Has block scope
- [ ] It makes the computer faster
- [ ] It automatically saves to database
