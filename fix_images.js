const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');
const map = {
    'css_box_model_diagram_1768555974904.png': 'css-box-model.png',
    'js_promises_event_loop_diagram_1768555928473.png': 'js-event-loop.png',
    'js_scope_diagram_1768555886603.png': 'js-scope.png',
    'nuxt_ssr_lifecycle_diagram_1768556054996.png': 'nuxt-lifecycle.png',
    'ts_type_system_diagram_1768556089387.png': 'ts-types.png',
    'vue_lifecycle_diagram_1768556691522.png': 'vue-lifecycle.png',
    'vue_reactivity_proxy_diagram_1768556012681.png': 'vue-reactivity.png'
};

console.log('Starting rename in:', dir);

Object.entries(map).forEach(([oldName, newName]) => {
    const oldPath = path.join(dir, oldName);
    const newPath = path.join(dir, newName);
    if (fs.existsSync(oldPath)) {
        try {
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${newName}`);
        } catch (e) {
            console.error(`Error renaming ${oldName}:`, e.message);
        }
    } else {
        console.log(`Skipped (not found): ${oldName}`);
        if (fs.existsSync(newPath)) {
            console.log(`  -> New file already exists: ${newName}`);
        }
    }
});
