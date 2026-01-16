import Database from 'better-sqlite3';
import path from 'node:path';

const dbPath = path.join(process.cwd(), 'data.db');
const db = new Database(dbPath);

console.log('Verifying content...');

try {
    const row = db.prepare("SELECT content FROM lessons WHERE slug = 'javascript-primitive-data-types'").get();
    if (row && row.content && !row.content.includes('Concept overview...')) {
        console.log('✅ Content verified: ' + row.content.substring(0, 50) + '...');
    } else {
        console.log('❌ Content verification failed or still using fallback.');
    }
} catch (error) {
    console.error('Verification failed:', error);
} finally {
    db.close();
}
