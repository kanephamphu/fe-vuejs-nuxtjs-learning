# Assets vs Public

Nuxt provides two directories for static files, but they behave differently.

## /public Directory
Files here are served as-is at the root path. Use this for files that don't need processing, like `favicon.ico` or `robots.txt`.
Example: `/public/logo.png` is accessible at `http://localhost:3000/logo.png`.

## /assets Directory
Files here are processed by the build tool (Vite). Use this for styles, fonts, or images that you want to be optimized or hashed.
Example: To use an image in a template:
```html
<img src="~/assets/img/hero.jpg" alt="Hero">
```
# Key Difference
- **Public**: Static, no processing, URL is predictable.
- **Assets**: Processed, optimized, URL contains a hash for caching.
