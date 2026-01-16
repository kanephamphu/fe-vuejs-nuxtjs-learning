# Event Modifiers

Vue provides event modifiers for `v-on` to handle common DOM event details.

## Common Modifiers
- `.stop`: Calls `event.stopPropagation()`.
- `.prevent`: Calls `event.preventDefault()`.
- `.capture`: Use capture mode when adding event listener.
- `.self`: Only trigger if `event.target` is the element itself.
- `.once`: The event will be triggered at most once.
- `.passive`: Corresponds to addEventListener's passive option.

```html
<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- click event's propagation will be stopped -->
<a @click.stop="doThis"></a>
```
