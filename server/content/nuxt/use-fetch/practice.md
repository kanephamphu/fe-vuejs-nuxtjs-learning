## Practice: Fetching Users

Fetch a list of users from the mock API `https://jsonplaceholder.typicode.com/users` and display their names.

### Tasks:
1. Use `await useFetch(...)` with the URL provided.
2. Destructure `data`, `pending`, and `error`.
3. In the template:
   - Show "Loading..." if `pending` is true.
   - Show "Error!" if `error` exists.
   - Use `v-for` to list `user.name` from `data`.

*Note: The editor environment mocks external requests but simulates the async delay.*
