# Coordinates: Top, Right, Bottom, Left

Positioned elements (relative, absolute, fixed, sticky) use coordinate properties to offset their location.

## Properties
- `top`: Offset from the top edge.
- `right`: Offset from the right edge.
- `bottom`: Offset from the bottom edge.
- `left`: Offset from the left edge.

## Inset Shorthand
Modern CSS provides the `inset` property as a shorthand for all four.
```css
.overlay {
  position: absolute;
  inset: 0; /* top:0, right:0, bottom:0, left:0 */
  background: rgba(0,0,0,0.5);
}
```
# Negative Values
You can use negative values (e.g., `top: -10px`) to pull elements outside their container.
