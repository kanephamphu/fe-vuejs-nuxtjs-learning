# Slots

# Vue Slots (Content Distribution)

Slots allow you to pass **HTML or other components** into a child component, not just simple data strings. This is vital for "Container" components like Modals, Cards, and Layouts.

## 1. Slot Types
- **Default Slot**: The simplest way to pass content.
- **Named Slots**: Pass different content to specific areas (e.g., `header`, `footer`).
- **Scoped Slots**: Pass data from the **child back to the content** being injected.

---

## 2. Implementation vs Result

### Scenario A: Multiple Named Slots
**Implementation (Child - `BaseLayout.vue`):**
```vue
<template>
  <header><slot name="header"></slot></header>
  <main><slot></slot></main> <!-- Default slot -->
  <footer><slot name="footer"></slot></footer>
</template>
```

**Implementation (Parent):**
```vue
<BaseLayout>
  <template #header><h1>Page Title</h1></template>
  <p>Main content goes here.</p>
  <template #footer><small>Copyright 2024</small></template>
</BaseLayout>
```

**Result:**
The content is perfectly placed into its respective slots within the child component's layout.

---

## 3. Scoped Slots (Advanced)
Scoped slots allow a child to "share" its internal state with the slot content.
```vue
<!-- Child -->
<slot :item="itemData"></slot>

<!-- Parent -->
<template #default="{ item }">
  <span>{{ item.username }}</span>
</template>
```

> [!IMPORTANT]
> Everything in the parent template has access only to the parent scope; everything in the child template has access only to the child scope. Slots are the bridge between these two worlds.
 a powerful way to compose components by allowing parents to inject content into a child's template.

## Basic Slot
```vue
<!-- ChildComponent.vue -->
<div class="card">
</div>
```

```html
<!-- Parent.vue -->
<child-component>
  <h1>This is Slot Content</h1>
</child-component>
```

## Named Slots
You can have multiple slots by giving them names.
```vue
<header><slot name="header"></slot></header>
<main><slot></slot></main>
```

## Scoped Slots
Pass data from the child back to the parent's slot content.
```vue
<slot :user="user"></slot>
```
