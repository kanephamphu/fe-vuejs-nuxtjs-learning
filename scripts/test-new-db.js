
const Database = require('better-sqlite3');
const path = require('node:path');
const dbPath = path.join(process.cwd(), 'test_new.db');
console.log('Connecting to', dbPath);
try {
  const sqlite = new Database(dbPath, { timeout: 1000 });
  console.log('Connected to new DB.');
  sqlite.prepare('CREATE TABLE test (id INTEGER PRIMARY KEY)').run();
  console.log('Table created.');
  sqlite.close();
  console.log('Done.');
} catch (e) {
  console.error('Error:', e.message);
}
