
const Database = require('better-sqlite3');
const path = require('node:path');
const dbPath = path.join(process.cwd(), 'data.db');
const sqlite = new Database(dbPath);

const stats = sqlite.prepare('SELECT module, count(*) as count FROM lessons GROUP BY module').all();
console.log('--- Curriculum Stats ---');
stats.forEach(s => console.log(`${s.module}: ${s.count} lessons`));

const total = sqlite.prepare('SELECT count(*) as count FROM lessons').get();
console.log('Total Lessons:', total.count);

sqlite.close();
