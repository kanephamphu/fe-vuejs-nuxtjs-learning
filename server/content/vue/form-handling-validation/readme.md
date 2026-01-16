# Vue Form Handling & Validation

Handling user input is a core task for any web app. Vue's `v-model` directive makes form handling "synchronous" between your UI and your state.

## 1. Two-Way Data Binding
- **Inputs & Textareas**: Binds to the `value` property and `input` event.
- **Checkboxes & Radios**: Binds to the `checked` property and `change` event.
- **Select**: Binds to the `value` property and `change` event.

---

## 2. Implementation vs Result

### Scenario A: Complex Form State
**Implementation (Vue):**
```vue
<script setup>
const form = reactive({
  email: '',
  acceptTerms: false,
  role: 'developer'
});

const submit = () => {
  if (!form.email.includes('@')) alert('Invalid Email!');
  else console.log('Submitting:', form);
};
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="form.email" type="email" />
    <input v-model="form.acceptTerms" type="checkbox" />
    <select v-model="form.role">
      <option value="developer">Developer</option>
      <option value="designer">Designer</option>
    </select>
    <button :disabled="!form.acceptTerms">Submit</button>
  </form>
</template>
```

**Result:**
The `form` object is updated in real-time as the user types or clicks. The submit button is automatically enabled/disabled based on the `acceptTerms` checkbox state.

---

## 3. Modifiers for Forms
- **`.lazy`**: Syncs data only on `change` events (lost focus) instead of `input`.
- **`.number`**: Automatically casts the input string to a number.
- **`.trim`**: Trims whitespace from both ends of the input.

> [!TIP]
> For large, complex forms, consider using a library like **VeeValidate** or **Vuelidate**. They provide robust schema-based validation that handles all edge cases.
 uses `v-model` for two-way data binding on form inputs, making it easy to capture and validate user input.

## Basic Usage
```html
<input v-model="text">
<textarea v-model="message"></textarea>
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
