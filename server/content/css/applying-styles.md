# Applying Styles in CSS
CSS can be applied to HTML in three ways:

1. **Inline Styles**: Using the \`style\` attribute. (Not recommended for maintainability)
   \`\`\`html
   <p style="color: red;">Red text</p>
   \`\`\`

2. **Internal Styles**: Using \`<style>\` tag in \`<head>\`.
   \`\`\`html
   <style>
     p { color: blue; }
   </style>
   \`\`\`

3. **External Styles**: strict separation of concerns.
   \`\`\`html
   <link rel="stylesheet" href="styles.css">
   \`\`\`
