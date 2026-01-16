# The Box Model

Every element in CSS is a rectangular box. The Box Model consists of:

1. **Content**: Where text and images appear.
2. **Padding**: Transparent area around the content.
3. **Border**: Goes around the padding and content.
4. **Margin**: Transparent area outside the border (spacing between elements).

```css
.box {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  box-sizing: border-box; /* Highly recommended! */
}
```
