
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
