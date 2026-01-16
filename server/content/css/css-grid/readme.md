# CSS Grid Layout

CSS Grid is a **2-dimensional** layout system. It handles both columns and rows simultaneously, allowing for complex, grid-like layouts that were previously impossible without hacks.

## 1. Grid Terminology
- **Grid Container**: The parent element (`display: grid`).
- **Grid Item**: The direct children.
- **Grid Track**: A column or a row.
- **Grid Area**: A space bounded by four grid lines.

---

## 2. Implementation vs Result

### Scenario A: The 3-Column Layout
```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Hybrid sizing */
  gap: 20px;
}
```

**Result Visualization:**
```text
[ Sidebar (25%) ][ Main Content (50%) ][ Sidebar (25%) ]
```

### Scenario B: Implicit vs Explicit Grid
```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 150px;
}
```
**Result:**
This creates a **responsive gallery**. Items will automatically wrap into new rows as the screen gets smaller, but they will never be smaller than `200px`.

---

## 3. Grid Areas (Named Layouts)
You can name areas of your grid to make the layout much more readable:
```css
.layout {
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
}
```

> [!TIP]
> Use `grid-gap` (or just `gap`) instead of margins on items. It prevents "double margin" issues and makes spacing perfect across the entire grid.

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
