# Functions
Functions are the building blocks of readable, maintainable, and reusable code.

## 1. Function Declaration
```javascript
function greet(name) {
  return "Hello " + name;
}
```

## 2. Function Expression
```javascript
const greet = function(name) {
  return "Hello " + name;
};
```

## 3. Arrow Functions (ES6)
Concise syntax, implicit return for single expressions, and lexical `this`.
```javascript
const greet = (name) => "Hello " + name;
```
