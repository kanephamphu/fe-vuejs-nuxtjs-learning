## Practice: Props in Action

We have two components: `App.vue` (parent) and `UserProfile.vue` (child).
The Child component expects a `username` (string) and `age` (number).

### Tasks:
1. In the Child component (which is simulated here in the single file), define props using `defineProps`.
   - `username`: String, required.
   - `age`: Number, default to 18.
2. Render these props in the template.
3. In the Parent logic, create a ref `currentUser` with value 'Alice'.
4. Pass `currentUser` to the Child component.

*Note: In this editor, we are simulating the child component logic within the same file for simplicity, but conceptually imagine `UserProfile` is separate.*
