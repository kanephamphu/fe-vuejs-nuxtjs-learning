# Sizing in CSS

Controlling the size of elements is crucial for layout.

## Width and Height
You can set explicit sizes or use percentages.
```css
.card {
  width: 300px;
  height: 200px;
}
```

## Units
1. **px**: Absolute pixels.
2. **%**: Relative to the parent element.
3. **rem/em**: Relative to font size.
4. **vw/vh**: Relative to the viewport (screen) width/height.

## Max/Min
Use `max-width` and `min-height` to create responsive designs that don't break on small screens.
