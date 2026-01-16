import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { eq } from 'drizzle-orm';
import fs from 'node:fs';
import path from 'node:path';
import { lessons, exercises } from '../server/db/schema';
import * as schema from '../server/db/schema';

// Database setup for standalone script
const dbPath = path.join(process.cwd(), 'data.db');
const sqlite = new Database(dbPath);
const db = drizzle(sqlite, { schema });

async function seed() {
  console.log('Seeding database...');
  try {
    const modules = {
      javascript: [
          { title: 'Variables and Scope', topic: 'Day 1: Javascript', type: 'Concept/Self-learning' },
          { title: 'Primitive Data Types', topic: 'Day 1: Javascript', type: 'Concept/Self-learning' },
          { title: 'Operators and Logic', topic: 'Day 1: Javascript', type: 'Concept/Self-learning' },
          { title: 'Iterating with Loops', topic: 'Day 1: Javascript', type: 'Concept/Self-learning' },
          { title: 'Functions', topic: 'Day 1: Javascript', type: 'Concept/Self-learning' },
          { title: 'Functional Concepts', topic: 'Day 1: Javascript', type: 'Concept/Self-learning' },
          { title: 'Concurrency', topic: 'Day 1: Javascript', type: 'Concept/Self-learning' },
          { title: 'The Event Loop', topic: 'Day 1: Javascript', type: 'Concept/Self-learning' },
          { title: 'Daily Assignment', topic: 'Day 1: Javascript', type: 'Assignment/Lab' },
          { title: 'Daily Quick-test', topic: 'Day 1: Javascript', type: 'Test/Quiz' },
      ],
      typescript: [
          { title: 'Basic Annotations', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning' },
          { title: 'Advanced Type Definitions', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning' },
          { title: 'Type Logic', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning' },
          { title: 'Configuration', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning' },
          { title: 'Object-Oriented Programming (OOP)', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning' },
          { title: 'Generics', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning' },
          { title: 'Utility Types', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning' },
          { title: 'Daily Assignment', topic: 'Day 2: TypeScript', type: 'Assignment/Lab' },
          { title: 'Daily Quick-test', topic: 'Day 2: TypeScript', type: 'Test/Quiz' },
      ],
      css: [
          { title: 'Defining Layout', topic: 'Day 3: CSS', type: 'Concept/Self-learning' },
          { title: 'Applying Styles', topic: 'Day 3: CSS', type: 'Concept/Self-learning' },
          { title: 'Tag Selectors', topic: 'Day 3: CSS', type: 'Concept/Self-learning' },
          { title: 'Class Selectors', topic: 'Day 3: CSS', type: 'Concept/Self-learning' },
          { title: 'ID Selectors', topic: 'Day 3: CSS', type: 'Concept/Self-learning' },
          { title: 'Colors', topic: 'Day 3: CSS', type: 'Concept/Self-learning' },
          { title: 'Sizing', topic: 'Day 3: CSS', type: 'Concept/Self-learning' },
          { title: 'Borders', topic: 'Day 3: CSS', type: 'Concept/Self-learning' },
          { title: 'The Display Property', topic: 'Day 3: CSS', type: 'Concept/Self-learning' },
          { title: 'Positioning', topic: 'Day 3: CSS', type: 'Concept/Self-learning' },
          { title: 'Coordinates', topic: 'Day 3: CSS', type: 'Concept/Self-learning' },
          { title: 'Daily Assignment', topic: 'Day 3: CSS', type: 'Assignment/Lab' },
          { title: 'Daily Quick-test', topic: 'Day 3: CSS', type: 'Test/Quiz' },
      ]
    };

    const contentDir = path.join(process.cwd(), 'server', 'content');
    let updatedCount = 0;
    let createdCount = 0;

    for (const [moduleName, lessonsList] of Object.entries(modules)) {
        for (const lessonData of lessonsList) {
            const slug = `${moduleName}-${lessonData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
            const filePath = path.join(contentDir, moduleName, `${slug.replace(`${moduleName}-`, '')}.md`);
            
            let content = `# ${lessonData.title}\n\nThis lesson covers **${lessonData.title}** as part of the ${moduleName} curriculum.\n\n## Overview\n\nContent for ${lessonData.title} goes here.`;
            
            if (fs.existsSync(filePath)) {
                content = fs.readFileSync(filePath, 'utf-8');
            }
            
            const existingLesson = db.select().from(lessons).where(eq(lessons.slug, slug)).get();

            if (existingLesson) {
                db.update(lessons)
                    .set({ 
                        title: lessonData.title,
                        topic: lessonData.topic,
                        content: content
                    })
                    .where(eq(lessons.id, existingLesson.id))
                    .run();
                updatedCount++;
            } else {
                const newLesson = db.insert(lessons).values({
                    module: moduleName,
                    topic: lessonData.topic,
                    title: lessonData.title,
                    slug: slug,
                    content,
                    complexity: 'Beginner'
                }).returning().get();

                 db.insert(exercises).values({
                    lessonId: newLesson.id,
                    instructions: `Complete the exercise for ${lessonData.title}.`,
                    starterCode: `// Write your ${moduleName} code here\n`,
                    solutionCode: `// Solution for ${lessonData.title}`
                }).run();
                createdCount++;
            }
        }
    }

    // Add original Vue/Nuxt modules as well
    const advancedModules = {
        vue: [
            { title: 'Vue Fundamentals', topic: 'Vue Module' },
            { title: 'Reactivity', topic: 'Vue Module' },
            { title: 'Components & Props', topic: 'Vue Module' },
            { title: 'Emits & Events', topic: 'Vue Module' }
        ],
        nuxt: [
             { title: 'Nuxt Architecture', topic: 'Nuxt Module' },
             { title: 'Routing & Layouts', topic: 'Nuxt Module' },
             { title: 'Server API', topic: 'Nuxt Module' }
        ]
    }

    for (const [moduleName, lessonsList] of Object.entries(advancedModules)) {
        for (const lessonData of lessonsList) {
            const slug = `${moduleName}-${lessonData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
            const filePath = path.join(contentDir, moduleName, `${slug.replace(`${moduleName}-`, '')}.md`);

            let content = `# ${lessonData.title}\n\nAdvanced content for ${lessonData.title}.`;
             if (fs.existsSync(filePath)) {
                content = fs.readFileSync(filePath, 'utf-8');
            }
            
            const existingLesson = db.select().from(lessons).where(eq(lessons.slug, slug)).get();

            if (existingLesson) {
                 db.update(lessons)
                    .set({ 
                        title: lessonData.title,
                        topic: lessonData.topic,
                        content: content
                    })
                    .where(eq(lessons.id, existingLesson.id))
                    .run();
                 updatedCount++;
            } else {
                const newLesson = db.insert(lessons).values({
                    module: moduleName,
                    topic: lessonData.topic,
                    title: lessonData.title,
                    slug: slug,
                    content,
                    complexity: 'Intermediate'
                }).returning().get();

                 db.insert(exercises).values({
                    lessonId: newLesson.id,
                    instructions: `Exercise for ${lessonData.title}.`,
                    starterCode: `// ${moduleName} starter code`,
                    solutionCode: `// ${moduleName} solution`
                }).run();
                createdCount++;
            }
        }
    }

    console.log(`Sync complete. Created: ${createdCount}, Updated: ${updatedCount}`);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
