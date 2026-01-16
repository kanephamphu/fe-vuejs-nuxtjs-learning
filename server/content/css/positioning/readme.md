# CSS Positioning

The `position` property allows you to take elements out of the normal document flow and place them exactly where you want.

## Position Values
1. `static`: Default. Normal document flow.
2. `relative`: Positioned relative to its normal position.
3. `absolute`: Positioned relative to its nearest positioned ancestor (non-static).
4. `fixed`: Positioned relative to the viewport (stays during scroll).
5. `sticky`: Toggles between relative and fixed based on scroll position.

```css
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
# Z-Index
Use `z-index` to control the stack order of positioned elements.
