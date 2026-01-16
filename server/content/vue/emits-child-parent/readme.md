# Emits (Child -> Parent)

While props pass data down, **emits** allow child components to communicate back up to their parents.

## Emitting an Event
Use `$emit` in the template or `this.$emit` in the script.
```vue
<button @click="$emit('custom-event', someData)">Click Me</button>
```

## Listening to an Event
Parents can listen to events emitted by children using `v-on` (or `@`).
```html
<child-component @custom-event="handleEvent"></child-component>
```

## Declaring Emits
It's good practice to declare the events a component can emit.
```javascript
export default {
  emits: ['custom-event', 'update']
}
```
