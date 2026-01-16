# File-based Routing

Nuxt.js automates routing based on the file structure of your `pages/` directory. You don't need a separate router configuration file!

## Basic Routes
- `pages/index.vue` -> `/`
- `pages/about.vue` -> `/about`
- `pages/contact.vue` -> `/contact`

## Dynamic Routes
Use square brackets to denote dynamic parameters.
- `pages/users/[id].vue` -> `/users/1`, `/users/abc`
- Access the parameter via `useRoute().params.id`.

## Nested Routes
Create a folder with the same name as a file to create nested routes.
- `pages/users.vue` (Parent)
- `pages/users/index.vue` (Default child)
- `pages/users/[id].vue` (Dynamic child)
Inside `users.vue`, you must use `<NuxtPage />` to display the child component.
