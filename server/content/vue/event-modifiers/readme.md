- `.once`: The event will be triggered at most once.
- `.passive`: Corresponds to addEventListener's passive option.

```html
<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- click event's propagation will be stopped -->
<a @click.stop="doThis"></a>
```
