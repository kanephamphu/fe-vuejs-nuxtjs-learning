# Components & Props

Components allow us to split the UI into independent, reusable pieces.

## Defining a Component
Components are typically defined in `.vue` files.
```vue
<template>
  <button>{{ label }}</button>
</template>

<script>
export default {
  props: ['label']
}
</script>
```

## Props: One-Way Data Flow
Props are custom attributes you can register on a component. When a value is passed to a prop attribute, it becomes a property on that component instance.
Data flows **down** from parent to child via props.

```html
<my-button label="Click Me"></my-button>
```
# Prop Validation
```javascript
props: {
  label: {
    type: String,
    required: true
  }
}
```
