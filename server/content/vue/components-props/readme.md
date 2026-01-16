# Components & Props

Components are the building blocks of Vue applications. They allow us to split the UI into independent, reusable pieces.

## Defining a Component
In Vue 3 with `<script setup>`, a component is defined simply by importing it.
```vue
<script setup>
import MyButton from './MyButton.vue'
</script>

<template>
  <MyButton />
</template>
```

## Props: Passing Data Down
Props are custom attributes you can register on a component. When a value is passed to a prop attribute, it becomes a property on that component instance.

### Defining Props
Use the `defineProps` macro. It doesn't need to be imported.

```javascript
<script setup>
const props = defineProps({
  title: String,
  likes: {
    type: Number,
    required: true,
    default: 0
  }
})
</script>
```

### Accessing Props
- **In Template**: Directly use the prop name (e.g., `{{ title }}`).
- **In Script**: Use the returned `props` object (e.g., `props.title`).

## One-Way Data Flow
Props form a **one-way-down binding**. Parent updates flow down to the child, but not the other way around. This prevents child components from accidentally mutating the parent's state.
