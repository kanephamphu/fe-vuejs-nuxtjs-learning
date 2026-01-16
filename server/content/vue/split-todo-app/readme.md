# Day 5 Assignment: Split Todo App

Refactor a monolithic Todo application into smaller, reusable components.

## Requirements
1. Create a `TodoItem` component that receives a todo as a prop.
2. The `TodoItem` should emit a `remove` event when a delete button is clicked.
3. Create a `TodoInput` component that emits an `add` event with the new task text.
4. Manage the main list state in the parent `App.vue`.

```vue
<!-- App.vue -->
<todo-input @add="addTodo"></todo-input>
<ul>
  <todo-item 
    v-for="todo in todos" 
    :key="todo.id" 
    :todo="todo"
    @remove="removeTodo"
  ></todo-item>
</ul>
```
