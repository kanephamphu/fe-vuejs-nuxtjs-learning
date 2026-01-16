
import Database from 'better-sqlite3';
import path from 'node:path';

const dbPath = path.join(process.cwd(), 'data.db');
const sqlite = new Database(dbPath);

const lessonsCount = sqlite.prepare('SELECT COUNT(*) as count FROM lessons').get();
const javascriptLessons = sqlite.prepare("SELECT title FROM lessons WHERE module = 'javascript'").all();

console.log(`Total lessons: ${lessonsCount.count}`);
console.log('JavaScript lessons:');
javascriptLessons.forEach(l => console.log(`- ${l.title}`));

sqlite.close();
