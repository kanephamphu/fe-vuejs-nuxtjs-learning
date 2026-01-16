# TypeScript Configuration (tsconfig.json)

The `tsconfig.json` file is the heart of any TypeScript project. It tells the compiler how to transform your code.

## Important Options
- `target`: The version of JavaScript to output (e.g., `ESNext`, `ES2022`).
- `module`: The module system to use (e.g., `NodeNext`, `ESNext`).
- `strict`: Enables all strict type-checking options. (RECOMMENDED!)
- `baseUrl` & `paths`: For custom module resolution (path aliases).
- `compilerOptions.lib`: Standard library files to include (e.g., `DOM`, `ES2022`).

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "strict": true,
    "skipLibCheck": true
  }
}
```
