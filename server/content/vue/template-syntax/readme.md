# Template Syntax

Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component data.

## Text Interpolation
`<span>Message: {{ msg }}</span>`

## Directives (v-prefix)
- `v-bind`: Dynamically bind one or more attributes.
- `v-on`: Attach event listeners.
- `v-html`: Output raw HTML.

```vue
<template>
  <div :id="dynamicId">
    <p>{{ user.name }}</p>
    <button @click="doSomething">Click me</button>
  </div>
</template>
```
