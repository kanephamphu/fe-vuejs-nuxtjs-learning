# Slots

Slots are a powerful way to compose components by allowing parents to inject content into a child's template.

## Basic Slot
```vue
<!-- ChildComponent.vue -->
<div class="card">
  <slot></slot> <!-- Content goes here -->
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
