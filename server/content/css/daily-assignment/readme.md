# Day 3 Assignment: Portfolio Header

Create a sticky header for your portfolio using CSS.

## Requirements
1. The header should be `fixed` or `sticky` at the top.
2. Use `flexbox` to space out the logo and nav links.
3. Add a subtle `border-bottom` and a high `z-index`.

```html
<header id="navbar">
  <div class="logo">MyBrand</div>
  <nav>
    <a href="#">Home</a>
    <a href="#">Projects</a>
  </nav>
</header>
```

```css
#navbar {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: white;
  z-index: 1000;
}
```
