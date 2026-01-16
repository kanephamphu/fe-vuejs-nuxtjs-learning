# CSS Grid Layout

CSS Grid is a two-dimensional layout system for the web.

## Grid Container
- `display: grid;`
- `grid-template-columns`: Defines the columns.
- `grid-template-rows`: Defines the rows.
- `gap`: Spacing between items.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

## Grid Items
- `grid-column`: span or start/end positions.
- `grid-row`: span or start/end positions.
