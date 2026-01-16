# ID Selectors

ID selectors are used to target a **single, unique** element on a page.

## Syntax
In CSS, IDs start with a hash `#`.
```css
#main-header {
  font-size: 2rem;
}
```

In HTML, you use the `id` attribute.
```html
<header id="main-header">Welcome</header>
```

## ID vs Class
- **ID**: Unique (only one per page). High specificity.
- **Class**: Reusable. Lower specificity.
