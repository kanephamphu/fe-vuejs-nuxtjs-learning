# The CSS Display Property

The `display` property is the most important CSS property for controlling layout. It determines how an element "behaves" in relation to its neighbors.

## 1. Core Values
- **`block`**: Takes up the full width. Starts on a new line.
- **`inline`**: Takes up only as much width as necessary. Does not start on a new line.
- **`inline-block`**: Like `inline`, but allows you to set `width`, `height`, and `margin`.
- **`none`**: Removes the element from the document entirely.

---

## 2. Implementation vs Result

### Scenario A: Block vs Inline
```html
<p style="display: block; border: 1px solid red;">I am a Block</p>
<span style="display: inline; border: 1px solid blue;">I am Inline</span>
<span style="display: inline; border: 1px solid blue;">Me too!</span>
```

**Result Visualization:**
```text
[ I am a Block (Full Width)             ]
[ I am Inline ][ Me too! ]
```

### Scenario B: Display None vs Visibility Hidden
- **`display: none`**: Element is **deleted** from the layout.
- **`visibility: hidden`**: Space is **reserved**, but element is invisible.

---

## 3. Modern Layout Values
The `display` property is also used to trigger modern layout engines:
- **`display: flex`**: Enables Flexbox.
- **`display: grid`**: Enables CSS Grid.

> [!IMPORTANT]
> Some elements have a default `display`. `<div>`, `<p>`, `<h1>` are `block`. `<span>`, `<a>`, `<img>` are `inline`.
`display` property determines how an element is rendered and how it interacts with other elements.

## Common Values
- `block`: Starts on a new line and takes full width.
- `inline`: Sits side-by-side; doesn't respect width/height.
- `inline-block`: Sits side-by-side but respects width/height.
- `none`: Completely removes the element from the layout.
- `flex`: Enables Flexbox layout for children.
- `grid`: Enables Grid layout for children.

```css
.nav-item {
  display: inline-block;
  padding: 10px;
}
```
