
const Database = require('better-sqlite3');
const fs = require('node:fs');
const path = require('node:path');
const dbPath = path.join('d:', 'Project', 'Training', 'VueJS', 'data.db');
const logPath = path.join('d:', 'Project', 'Training', 'VueJS', 'db_debug.txt');
const sqlite = new Database(dbPath);

let output = '--- DATABASE DIAGNOSTIC ---\n';

try {
  const tables = sqlite.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  output += 'Tables: ' + tables.map(t => t.name).join(', ') + '\n';

  const users = sqlite.prepare('SELECT count(*) as count FROM users').get();
  output += 'User Count: ' + users.count + '\n';
  if (users.count > 0) {
    const sampleUser = sqlite.prepare('SELECT id, email FROM users LIMIT 1').get();
    output += 'Sample User: ' + JSON.stringify(sampleUser) + '\n';
  }

  const lessonsCount = sqlite.prepare('SELECT count(*) as count FROM lessons').get();
  output += 'Lesson Count: ' + lessonsCount.count + '\n';
  
  const progress = sqlite.prepare('SELECT count(*) as count FROM user_progress').get();
  output += 'Progress Records: ' + progress.count + '\n';
} catch (e) {
  output += 'Error: ' + e.message + '\n';
}

fs.writeFileSync(logPath, output);
sqlite.close();
