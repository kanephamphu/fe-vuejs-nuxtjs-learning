import Database from 'better-sqlite3';
import path from 'node:path';

const dbPath = path.join(process.cwd(), 'data.db');
const db = new Database(dbPath);

console.log('Verifying database...');

try {
    const lessonCount = db.prepare('SELECT count(*) as count FROM lessons').get().count;
    console.log(`Lesson count: ${lessonCount}`);

    const userProgressCount = db.prepare('SELECT count(*) as count FROM user_progress').get().count;
    console.log(`User progress count: ${userProgressCount}`);

    // Check for practice_content column
    const columns = db.prepare('PRAGMA table_info(lessons)').all();
    const hasPracticeContent = columns.some(c => c.name === 'practice_content');
    console.log(`Has practice_content column: ${hasPracticeContent}`);

    if (lessonCount > 0 && hasPracticeContent) {
        console.log('Verification successful!');
    } else {
        console.log('Verification failed.');
    }
} catch (error) {
    console.error('Verification failed with error:', error);
} finally {
    db.close();
}
