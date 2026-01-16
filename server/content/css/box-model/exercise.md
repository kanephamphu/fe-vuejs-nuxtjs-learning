# Daily Exercise: The Layout Architect

### 🧩 The Scenario
You are designing a sidebar that must be exactly `300px` wide to fit into the design grid. Your current CSS is causing the sidebar to "break" the layout.

### 🛠️ The Challenge
If you have the following CSS:
```css
.sidebar {
  width: 250px;
  padding: 20px;
  border: 5px solid black;
  box-sizing: content-box;
}
```

1. **Calculate**: What is the total visual width of the sidebar?
2. **Refactor**: Which single property would you add to make it exactly `250px` wide including the padding?

---

### ✅ Knowledge Check
- [x] I can calculate total width in `content-box` mode.
- [x] I understand when margins collapse.

? Which property includes padding and border in the total width? ! box-sizing
? What is the space between content and border? ! padding
? Does `margin` affect the internal size of an element? ! no

? Select all components that add to the visual size in `content-box` (Multiple Choice):
- [x] Content Width
- [x] Padding
- [x] Border
- [ ] Margin
