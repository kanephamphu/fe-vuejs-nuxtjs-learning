# JavaScript Variables & Scope

In JavaScript, how you declare a variable determines its **visibility** (Scope) and **lifetime**. Understanding this is critical for avoiding bugs like memory leaks and naming collisions.

## 1. Scope Types

### Global Scope
Variables declared outside any function or block. Available everywhere.

### Function Scope
Variables declared with `var` inside a function are scoped to that function.

### Block Scope (Modern JS)
Variables declared with `let` and `const` inside `{}` (blocks) are scoped to that block.

---

## 2. Implementation vs Result

### Scenario A: `var` Function Scoping
```javascript
function testVar() {
  if (true) {
    var x = "I am var";
  }
  console.log(x); // Works! var ignores blocks
}
testVar();
```
**Result:**
```text
I am var
```

### Scenario B: `let` Block Scoping
```javascript
function testLet() {
  if (true) {
    let y = "I am let";
  }
  console.log(y); // ReferenceError! let stays in the block
}
testLet();
```
**Result:**
```text
ReferenceError: y is not defined
```

---

## 3. Hoisting Visualization

Hoisting is JavaScript's default behavior of moving declarations to the top.

```javascript
console.log(myVar); // undefined (not error!)
var myVar = 10;

console.log(myLet); // Cannot access 'myLet' before initialization
let myLet = 20;
```

---

## 4. Visualizing Scope
Here is a diagram showing how nested scopes interact:

![JavaScript Scope Diagram](/images/js_scope_diagram_1768555886603.png)

> [!TIP]
> Always prefer `const` by default. Only use `let` if you know the value must change, and avoid `var` in modern development to prevent scoping surprises.
