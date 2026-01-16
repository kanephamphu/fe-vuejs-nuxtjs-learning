
const Database = require('better-sqlite3');
const path = require('node:path');
const dbPath = path.join(process.cwd(), 'data.db');
console.log('Connecting to', dbPath);
try {
  const sqlite = new Database(dbPath, { timeout: 1000 });
  console.log('Connected.');
  sqlite.close();
  console.log('Closed.');
} catch (e) {
  console.error('Error:', e.message);
}
