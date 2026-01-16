# Reactive Data in Vue 3

Reactivity is the core of Vue. It allows us to track changes in our data and update the UI automatically.

## `ref()`
`ref()` is the most common way to declare reactive state. It can hold any value type (primitives, objects, arrays).
- Access value in JS: `myRef.value`
- Access value in Template: `{{ myRef }}` (automatically unwrapped)

## `reactive()`
`reactive()` is used for objects and arrays. It returns a deep reactive proxy of the original object.
- Access property: `state.count`
- **Limitation**: Can only hold objects (not primitives like string/number).
- **Limitation**: Replacing the entire object breaks reactivity reference.

## Comparison
| Feature | `ref()` | `reactive()` |
|---------|---------|--------------|
| Primitives | ✅ Yes | ❌ No |
| Objects | ✅ Yes | ✅ Yes |
| Access | `.value` | Direct |
| Reassignable | ✅ Yes | ❌ No (props only) |

## Best Practice
It is recommended to use `ref()` by default for most use cases, as it is more flexible and consistent.
