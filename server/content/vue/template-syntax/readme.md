# Vue Template Syntax

Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component instance's data.

## 1. Core Bindings
- **Interpolation (`{{ }}`)**: The "Mustache" syntax for plain text.
- **Attribute Binding (`v-bind` or `:`)**: For dynamically setting HTML attributes (like `id`, `src`, `href`).
- **JavaScript Expressions**: You can put any valid JS expression inside the mustaches.

---

## 2. Implementation vs Result

### Scenario A: Dynamic Attributes
```vue
<script setup>
const imageUrl = 'https://picsum.photos/200';
const imageAlt = 'Random Photo';
const isDisabled = true;
</script>

<template>
  <img :src="imageUrl" :alt="imageAlt" />
  <button :disabled="isDisabled">Pointless Button</button>
</template>
```

**Result:**
The `src` and `alt` tags are perfectly populated. The button is grayed out and unclickable because `isDisabled` is true.

### Scenario B: Expressions
```vue
<template>
  <p>{{ ok ? 'YES' : 'NO' }}</p>
  <p>{{ message.split('').reverse().join('') }}</p>
</template>
```
**Result:**
Complex logic can be embedded directly in the view, although for *very* complex logic, **Computed Properties** are preferred.

---

## 3. Raw HTML (`v-html`)
Normal mustaches interpret data as plain text. To output real HTML, use the `v-html` directive.

> [!CAUTION]
> Never use `v-html` on user-provided content (like comments). This opens your site to **XSS (Cross-Site Scripting)** attacks.
 uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component data.

## Text Interpolation
`<span>Message: {{ msg }}</span>`

## Directives (v-prefix)
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
