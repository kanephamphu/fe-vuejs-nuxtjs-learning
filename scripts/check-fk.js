
const Database = require('better-sqlite3');
const path = require('node:path');
const dbPath = path.join(process.cwd(), 'data.db');
const sqlite = new Database(dbPath);

console.log('--- DB Check ---');
const users = sqlite.prepare('SELECT id, email FROM users').all();
console.log('Users in DB:', users);

const lessonsCount = sqlite.prepare('SELECT count(*) as count FROM lessons').get();
console.log('Total Lessons:', lessonsCount.count);

const firstLesson = sqlite.prepare('SELECT id, slug FROM lessons LIMIT 1').get();
console.log('First Lesson Sample:', firstLesson);

sqlite.close();
