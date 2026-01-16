# CSS Selectors

Selectors define which HTML elements the styles apply to.

## Common Selectors
- **Tag Selector**: `p { color: red; }` (Target all `<p>` tags)
- **Class Selector**: `.btn { padding: 10px; }` (Target elements with `class="btn"`)
- **ID Selector**: `#main { margin: 0; }` (Target element with `id="main"`)

## Specificity
ID > Class > Tag

```css
/* Lowest specificity */
article { color: black; }

/* Medium specificity */
.featured { color: blue; }

/* Highest specificity */
#hero { color: white; }
```
