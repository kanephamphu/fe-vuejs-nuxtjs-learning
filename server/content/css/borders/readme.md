# Borders and Radius

Borders define the edge of an element and can be customized in various ways.

## Border Properties
- `border-width`
- `border-style` (`solid`, `dashed`, `dotted`, `none`)
- `border-color`

## Shorthand
```css
.box {
  border: 2px solid black;
}
```

## Border Radius
Create rounded corners using `border-radius`.
```css
.button {
  border-radius: 8px; /* Slightly rounded */
  border-radius: 50%; /* Circle (if square) */
}
```
# Specificity
You can also set individual borders: `border-top`, `border-bottom`, etc.
