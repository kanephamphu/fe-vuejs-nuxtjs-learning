import Database from 'better-sqlite3';
import path from 'node:path';

const dbPath = path.join(process.cwd(), 'data.db');
const db = new Database(dbPath);

console.log('Fixing database schema...');

try {
    // Add practice_content to lessons
    try {
        db.prepare('ALTER TABLE lessons ADD COLUMN practice_content TEXT').run();
        console.log('Added practice_content to lessons');
    } catch (e: any) {
        if (e.message.includes('duplicate column name')) {
            console.log('practice_content already exists in lessons');
        } else {
            throw e;
        }
    }

    // Add practice_completed and exercise_completed to user_progress
    try {
        db.prepare('ALTER TABLE user_progress ADD COLUMN practice_completed INTEGER DEFAULT 0').run();
        console.log('Added practice_completed to user_progress');
    } catch (e: any) {
        if (e.message.includes('duplicate column name')) {
            console.log('practice_completed already exists in user_progress');
        } else {
            throw e;
        }
    }

    try {
        db.prepare('ALTER TABLE user_progress ADD COLUMN exercise_completed INTEGER DEFAULT 0').run();
        console.log('Added exercise_completed to user_progress');
    } catch (e: any) {
        if (e.message.includes('duplicate column name')) {
            console.log('exercise_completed already exists in user_progress');
        } else {
            throw e;
        }
    }

    console.log('Database fix complete.');
} catch (error) {
    console.error('Fix failed:', error);
} finally {
    db.close();
}
