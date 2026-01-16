# Vue Directives

Directives are special attributes with the `v-` prefix. They apply special reactive behavior to the rendered DOM.

## Common Directives
- `v-if`: Conditionally render an element.
- `v-else` / `v-else-if`: Used with `v-if`.
- `v-for`: Render a list of items based on an array.
- `v-bind` (`:`): Dynamically bind an attribute to an expression.
- `v-on` (`@`): Listen to DOM events.
- `v-model`: Create two-way data binding on form inputs.

```html
<p v-if="seen">Now you see me</p>

<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.text }}
  </li>
</ul>

<input v-model="message" placeholder="edit me">
```
