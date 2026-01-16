# Dynamic Class & Style Binding

Vue allows you to dynamically toggle classes and apply inline styles based on reactive data.

## Class Binding
You can pass an object to `:class` to dynamically toggle classes.
```html
<div :class="{ active: isActive, 'text-danger': hasError }"></div>
```

## Array Syntax
You can also bind to an array of classes.
```html
<div :class="[activeClass, errorClass]"></div>
```

## Style Binding
The object syntax for `:style` is a bit like CSS, but it uses camelCase for properties.
```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```
