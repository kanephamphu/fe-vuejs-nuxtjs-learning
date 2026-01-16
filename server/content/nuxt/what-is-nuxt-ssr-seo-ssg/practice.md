# Practice: The SSR Laboratory

In this lab, you'll observe the difference between Client-Side Rendering (CSR) and Server-Side Rendering (SSR) by inspecting the "View Page Source".

## 1. Inspecting the Source
Nuxt renders your page on the server, which means the initial HTML sent to the browser already contains your content.

**Lab Task:**
1. Open your Nuxt app in the browser.
2. Right-click and select **"View Page Source"**.
3. Search (Ctrl+F) for text that you know is rendered from your Vue component.

---

## 2. Server-Side Execution
Remember that `script setup` runs on **both** the server and the client during the initial load.

**Implementation Hint:**
```vue
<script setup>
if (import.meta.server) {
  console.log("I am running on the Server! 🚀");
}
if (import.meta.client) {
  console.log("I am running in the Browser! 🌐");
}
</script>
```

**Verify your progress:**
- [ ] Check your terminal (where `npm run dev` is running). Do you see the server log?
- [ ] Check your browser console. Do you see the client log?

---

## 3. SEO Verification
Use the Nuxt DevTools to see how your site looks to search engines.

**Verify your progress:**
- [ ] Open Nuxt DevTools (Shift + Alt + D).
- [ ] Go to the **SEO** tab.
- [ ] Are your Title and Description tags visible?
