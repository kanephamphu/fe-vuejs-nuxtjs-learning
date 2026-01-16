# Vue Directives (v-if, v-for, v-model)

Directives are special attributes with the `v-` prefix. They apply special reactive behavior to the rendered DOM.

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
