# Promises & async/await

Promises are the modern way to handle asynchronous operations.

## Promises
A Promise represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
States: `Pending`, `Fulfilled`, `Rejected`.

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Success!"), 1000);
});
```

## async/await
Syntactic sugar on top of Promises that makes async code look synchronous.

```javascript
async function fetchData() {
  const result = await myPromise;
  console.log(result);
}
```
