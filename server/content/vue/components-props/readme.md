# Vue Components & Props

Components are the fundamental building blocks of a Vue application. They allow you to divide the UI into independent, reusable pieces. **Props** are how data flows *down* from a parent to a child.

## 1. The Component Pattern
- **Encapsulation**: Each component manages its own HTML, CSS, and Logic.
- **Reusable**: Use the same button or card across multiple pages.
- **One-Way Data Flow**: Data flows down via Props, and events flow up via Emits.

---

## 2. Implementation vs Result

### Scenario A: Defining and Using Props
**Implementation (Child Component - `UserCard.vue`):**
```vue
<script setup>
defineProps({
  name: String,
  role: { type: String, default: 'Student' }
});
</script>

<template>
  <div class="user-card">
    <h3>{{ name }}</h3>
    <p>Role: {{ role }}</p>
  </div>
</template>
```

**Implementation (Parent Component):**
```vue
<UserCard name="Kane" role="Developer" />
<UserCard name="Alice" /> 
```

**Result:**
The first card shows "Developer", while the second card uses the **default value** "Student".

---

## 3. Prop Validation
Always use the object syntax for `defineProps` to enforce type safety. This catches bugs early by warning you in the console if the wrong data type is passed.

> [!IMPORTANT]
> Props are **read-only**. A child component should never try to mutate a prop directly. If you need to change the data, either use `ref` to create a local copy or `emit` an event to the parent.


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
