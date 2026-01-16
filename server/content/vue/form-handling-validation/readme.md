# Form Handling & Validation

Vue uses `v-model` for two-way data binding on form inputs, making it easy to capture and validate user input.

## Basic Usage
```html
<input v-model="text">
<textarea v-model="message"></textarea>
<input type="checkbox" v-model="checked">
```

## Lazy Modifiers
By default, `v-model` syncs the input with the data after each `input` event. You can add the `.lazy` modifier to sync after `change` events.
```html
<input v-model.lazy="msg">
```

## Basic Validation
You can use computed properties or watchers to validate the state of your form.
```javascript
computed: {
  isEmailValid() {
    return /^[^@]+@^@]+$/.test(this.email);
  }
}
```
