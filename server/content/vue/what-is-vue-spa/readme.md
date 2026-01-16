# What is Vue.js?
## The Progressive JavaScript Framework
<!-- theme: emerald -->

Vue (pronounced /vjuː/, like **view**) is a JavaScript framework for building user interfaces. 

It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces.

---

# Core Feature: Declarative Rendering
## Describing the UI
<!-- theme: default -->

Vue extends standard HTML with a template syntax that allows us to declaratively describe HTML output based on JavaScript state.

```html
<h1>{{ message }}</h1>
```
When `message` changes, the H1 updates automatically.

---

# Core Feature: Reactivity
## Tracking Changes
<!-- theme: default -->

Vue automatically tracks JavaScript state changes and efficiently updates the DOM when changes happen.

```javascript
import { ref } from 'vue'
const count = ref(0)
```
Change `count.value` -> View updates.

---

# The Progressive Framework
## Adoption Made Easy
<!-- theme: dark -->

Vue is designed to be flexible and incrementally adoptable.
- Enhancing static HTML
- Web Components
- Single Page Application (SPA)
- Fullstack / SSR (Nuxt)

---

# Single Page Application (SPA)
## Modern Web Experience
<!-- theme: default -->

An SPA loads a single web page and dynamically updates that page as the user interacts with the app.

Instead of reloading the browser for every page change, Vue intercepts navigation and updates the content instantly.

---

# Ready?
## Let's write some code!
<!-- theme: emerald -->

Now that you know the concepts, let's move on to the next lessons to start coding.

---

# References
## Learn More
<!-- theme: default -->

- [Vue.js Official Guide](https://vuejs.org/guide/introduction.html)
- [The Vue Point (Blog)](https://blog.vuejs.org/)
