# Day 1 assignment: Weather App Logic

Build the core logic for a simple weather application.

## Requirements
1. Create as asynchronous function `getWeather` that returns a promise.
2. Use `setTimeout` to simulate an API call.
3. Handle a successful response and an error cases.

```javascript
async function getWeather(city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (city === "London") {
        resolve({ temp: 15, condition: "Cloudy" });
      } else {
        reject("City not found");
      }
    }, 1000);
  });
}
```
