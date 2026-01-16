# CSS Positioning

# CSS Positioning & Coordinates

Positioning allows you to take elements out of the "Normal Document Flow" and place them exactly where you need them.

## 1. Positioning Modes
- **`static`** (Default): Follows the normal page flow.
- **`relative`**: Positioned relative to its **original self**.
- **`absolute`**: Positioned relative to its **nearest positioned ancestor** (non-static).
- **`fixed`**: Positioned relative to the **viewport** (browser window).
- **`sticky`**: Toggles between `relative` and `fixed` based on scroll position.

---

## 2. Implementation vs Result

### Scenario A: The `parent: relative` + `child: absolute` Pattern
This is the most common way to place icons or overlays inside a container.

**Implementation (CSS):**
```css
.card {
  position: relative; /* Anchor for the child */
  width: 200px;
  height: 200px;
}

.badge {
  position: absolute;
  top: 5px;
  right: 5px;
}
```

**Result:**
The `.badge` will "stick" to the top-right corner of the `.card`. Without `position: relative` on the card, the badge would fly up to the corner of the whole page!

### Scenario B: Sticky Navigation
```css
nav {
  position: sticky;
  top: 0;
  z-index: 100;
}
```
**Result:**
The navigation bar will scroll with the page until it hits the top edge, then it will "stick" there.

---

## 3. Z-Index and Stacking Context
The `z-index` property controls which element sits on top of another. It **only works** on elements that have a `position` other than `static`.

> [!IMPORTANT]
> A `z-index: 9999` might still fail if the element is inside a parent with a lower "Stacking Context". Think of stacking contexts like layers in Photoshop.

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
