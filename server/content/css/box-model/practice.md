# Practice: The Box Model Lab

In this lab, you'll experiment with how Padding, Border, and Margin interact with each other, and how `box-sizing` changes the math entirely.

## 1. Comparing Box Types
Create two boxes with identical CSS, but change the `box-sizing` property for the second one.

**Implementation Hint (CSS):**
```css
.box {
  width: 200px;
  padding: 20px;
  border: 10px solid black;
}

.content-box { box-sizing: content-box; }
.border-box { box-sizing: border-box; }
```

**Verify your progress:**
- [ ] Inspect the element in Chrome DevTools. 
- [ ] Is the `.content-box` wider than 200px? (Spoiler: Yes, it's 260px).
- [ ] Is the `.border-box` exactly 200px?

---

## 2. Margin Collapse Mystery
Margins sometimes "overlap" instead of adding together.

**Implementation Hint:**
```html
<div style="margin-bottom: 30px;">Box A</div>
<div style="margin-top: 20px;">Box B</div>
```

**Verify your progress:**
- [ ] Is the total gap 50px or 30px? (Spoiler: It's 30px due to collapsing).

---

## 3. Negative Margins
Try setting a negative margin to "pull" an element.

**Implementation Hint:**
```css
.pull-up { margin-top: -10px; }
```
