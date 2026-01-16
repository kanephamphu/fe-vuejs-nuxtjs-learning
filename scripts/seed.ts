import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { eq, and } from 'drizzle-orm';
import fs from 'node:fs';
import path from 'node:path';
import { db } from '../server/db';
import { lessons, exercises, roadmaps, courses, roadmapCourses } from '../server/db/schema';
import * as schema from '../server/db/schema';

// Database setup for standalone script
const sqlite = new Database('data.db');
const db = drizzle(sqlite, { schema });

async function seed() {
  console.log('Seeding database...');
  try {
    const modules = {
      javascript: [
        { title: 'Variables and Scope', topic: 'Day 1: Javascript', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Primitive Data Types', topic: 'Day 1: Javascript', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Operators and Logic', topic: 'Day 1: Javascript', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Iterating with Loops', topic: 'Day 1: Javascript', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Functions', topic: 'Day 1: Javascript', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Functional Concepts', topic: 'Day 1: Javascript', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Concurrency', topic: 'Day 1: Javascript', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'The Event Loop', topic: 'Day 1: Javascript', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Promises & async/await', topic: 'Day 1: Javascript', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Daily Assignment', topic: 'Day 1: Javascript', type: 'Assignment/Lab', level: 'intermediate' },
        { title: 'Daily Quick-test', topic: 'Day 1: Javascript', type: 'Test/Quiz', level: 'beginner' },
      ],
      typescript: [
        { title: 'Basic Annotations', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Advanced Type Definitions', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Type Logic', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Configuration', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Object-Oriented Programming (OOP)', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning', level: 'advanced' },
        { title: 'Generics', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning', level: 'advanced' },
        { title: 'Utility Types', topic: 'Day 2: TypeScript', type: 'Concept/Self-learning', level: 'advanced' },
        { title: 'Daily Assignment', topic: 'Day 2: TypeScript', type: 'Assignment/Lab', level: 'advanced' },
        { title: 'Daily Quick-test', topic: 'Day 2: TypeScript', type: 'Test/Quiz', level: 'intermediate' },
      ],
      css: [
        { title: 'Defining Layout', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Applying Styles', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Tag Selectors', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Class Selectors', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'ID Selectors', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Colors', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Sizing', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Borders', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'The Display Property', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Positioning', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Coordinates', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Box Model', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'CSS Grid', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'advanced' },
        { title: 'Flexbox', topic: 'Day 3: CSS', type: 'Concept/Self-learning', level: 'advanced' },
        { title: 'Daily Assignment', topic: 'Day 3: CSS', type: 'Assignment/Lab', level: 'advanced' },
        { title: 'Daily Quick-test', topic: 'Day 3: CSS', type: 'Test/Quiz', level: 'intermediate' },
      ],
      vue: [
        { title: 'What is Vue & SPA', topic: 'Day 4: Vue.js Core Fundamentals', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Reactive data (ref, reactive)', topic: 'Day 4: Vue.js Core Fundamentals', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Template syntax', topic: 'Day 4: Vue.js Core Fundamentals', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Directives: v-if, v-for, v-bind, v-model, v-on', topic: 'Day 4: Vue.js Core Fundamentals', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Computed properties', topic: 'Day 4: Vue.js Core Fundamentals', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Event modifiers', topic: 'Day 4: Vue.js Core Fundamentals', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Dynamic class & style binding', topic: 'Day 4: Vue.js Core Fundamentals', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Form handling & validation', topic: 'Day 4: Vue.js Core Fundamentals', type: 'Concept/Self-learning', level: 'advanced' },
        { title: 'Create Vue project', topic: 'Day 4: Vue.js Core Fundamentals', type: 'Assignment/Lab', level: 'advanced' },
        { title: 'Components & props', topic: 'Day 5: Components & Reusability', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Emits (child -> parent)', topic: 'Day 5: Components & Reusability', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Slots', topic: 'Day 5: Components & Reusability', type: 'Concept/Self-learning', level: 'advanced' },
        { title: 'Lifecycle hooks', topic: 'Day 5: Components & Reusability', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'ref vs reactive', topic: 'Day 5: Components & Reusability', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Split Todo app', topic: 'Day 5: Components & Reusability', type: 'Assignment/Lab', level: 'advanced' },
      ],
      nuxt: [
        { title: 'What is Nuxt (SSR, SEO, SSG)', topic: 'Day 6: Nuxt.js Fundamentals', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'File-based routing', topic: 'Day 6: Nuxt.js Fundamentals', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Layouts', topic: 'Day 6: Nuxt.js Fundamentals', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Auto imports', topic: 'Day 6: Nuxt.js Fundamentals', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Dynamic routes ([id].vue)', topic: 'Day 6: Nuxt.js Fundamentals', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'definePageMeta', topic: 'Day 6: Nuxt.js Fundamentals', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Runtime config per environment', topic: 'Day 6: Nuxt.js Fundamentals', type: 'Concept/Self-learning', level: 'advanced' },
        { title: 'Create Nuxt app', topic: 'Day 6: Nuxt.js Fundamentals', type: 'Assignment/Lab', level: 'advanced' },
        { title: 'useFetch', topic: 'Day 7: Data Fetching & State', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'useAsyncData', topic: 'Day 7: Data Fetching & State', type: 'Concept/Self-learning', level: 'advanced' },
        { title: 'Error & loading states', topic: 'Day 7: Data Fetching & State', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Environment variables', topic: 'Day 7: Data Fetching & State', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Integrate Nuxt app', topic: 'Day 7: Data Fetching & State', type: 'Assignment/Lab', level: 'advanced' },
        { title: 'Nuxt CSS handling', topic: 'Day 8: Styling & UI', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Tailwind CSS', topic: 'Day 8: Styling & UI', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Assets vs public', topic: 'Day 8: Styling & UI', type: 'Concept/Self-learning', level: 'beginner' },
        { title: 'Install TailwindCSS', topic: 'Day 8: Styling & UI', type: 'Assignment/Lab', level: 'intermediate' },
        { title: 'Nuxt middleware', topic: 'Day 9: Middleware, Auth & SEO', type: 'Concept/Self-learning', level: 'advanced' },
        { title: 'Route guards', topic: 'Day 9: Middleware, Auth & SEO', type: 'Concept/Self-learning', level: 'advanced' },
        { title: 'SEO meta tags', topic: 'Day 9: Middleware, Auth & SEO', type: 'Concept/Self-learning', level: 'intermediate' },
        { title: 'Server API routes', topic: 'Day 9: Middleware, Auth & SEO', type: 'Concept/Self-learning', level: 'advanced' },
        { title: 'Create login system', topic: 'Day 9: Middleware, Auth & SEO', type: 'Assignment/Lab', level: 'advanced' },
      ],
      'final-project': [
        { title: 'Admin Dashboard Plan', topic: 'Day 10-12: FINAL PROJECT', type: 'Assignment/Lab', level: 'advanced' },
        { title: 'Core Implementation', topic: 'Day 10-12: FINAL PROJECT', type: 'Assignment/Lab', level: 'advanced' },
        { title: 'Final Review', topic: 'Day 10-12: FINAL PROJECT', type: 'Assignment/Lab', level: 'advanced' },
      ]
    };

    const roadmapConfig: Record<string, { title: string, order: number, description: string }> = {
      javascript: { title: 'JavaScript', order: 1, description: 'Master the language of the web.' },
      typescript: { title: 'TypeScript', order: 2, description: 'Type safety for scalable apps.' },
      css: { title: 'CSS Mastery', order: 3, description: 'Styling and layout fundamentals.' },
      vue: { title: 'Vue.js', order: 4, description: 'The progressive JavaScript framework.' },
      nuxt: { title: 'Nuxt.js', order: 5, description: 'The Intuitive Web Framework.' },
      'final-project': { title: 'Final Project', order: 6, description: 'Build a real-world application.' }
    };

    // We are NOT clearing data to preserve IDs, but normally you might want to conform state.
    // For now, we assume upserts.

    let createdCount = 0;
    let updatedCount = 0;

    const contentDir = path.join(process.cwd(), 'server', 'content');

    // 0. Ensure Master Roadmap exists
    const masterSlug = 'fe-master-vue-nuxt';
    let masterRoadmap = await db.select().from(roadmaps).where(eq(roadmaps.slug, masterSlug)).get();
    if (!masterRoadmap) {
      masterRoadmap = await db.insert(roadmaps).values({
        slug: masterSlug,
        title: 'FE VueJS/NuxtJS Master',
        description: 'The complete path to Frontend Mastery using Vue and Nuxt.',
        order: 0 // Top priority
      }).returning().get();
      console.log(`Created Master Roadmap: ${masterRoadmap.title}`);
    }

    let globalCourseOrder = 1;

    // 1. Iterate over defined modules (Roadmaps)
    for (const [moduleKey, lessonsList] of Object.entries(modules)) {
      const rmConfig = roadmapConfig[moduleKey] || { title: moduleKey, order: 99, description: 'Learn ' + moduleKey };

      // Upsert Specific Roadmap (e.g. JavaScript, Vue.js)
      let roadmap = await db.select().from(roadmaps).where(eq(roadmaps.slug, moduleKey)).get();
      if (!roadmap) {
        roadmap = await db.insert(roadmaps).values({
          slug: moduleKey,
          title: rmConfig.title,
          description: rmConfig.description,
          order: rmConfig.order
        }).returning().get();
        console.log(`Created Roadmap: ${rmConfig.title}`);
      } else {
        await db.update(roadmaps).set({
          title: rmConfig.title,
          description: rmConfig.description,
          order: rmConfig.order
        }).where(eq(roadmaps.id, roadmap.id)).run();
      }

      // 2. Group lessons by Topic to form Courses
      const coursesMap = new Map<string, any[]>();
      for (const l of lessonsList) {
        const topic = (l as any).topic || 'General';
        if (!coursesMap.has(topic)) {
          coursesMap.set(topic, []);
        }
        coursesMap.get(topic)?.push(l);
      }

      // 3. Upsert Courses and Link to Roadmaps
      let courseOrder = 1;

      for (const [topicTitle, topicLessons] of coursesMap.entries()) {
        const courseSlug = `${moduleKey}-${topicTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

        let course = await db.select().from(courses).where(eq(courses.slug, courseSlug)).get();

        if (!course) {
          course = await db.insert(courses).values({
            // roadmapId is gone
            title: topicTitle,
            slug: courseSlug,
            description: `Lessons for ${topicTitle}`,
            order: globalCourseOrder // Order globally or within context? We keep a default here.
          }).returning().get();
          console.log(`  > Created Course: ${topicTitle}`);
        } else {
          await db.update(courses).set({
            title: topicTitle,
          }).where(eq(courses.id, course.id)).run();
        }

        // Link to Specific Roadmap
        // Check if link exists to avoid duplicates (though we wipe db usually, upsert logic is safer)
        const linkExists = await db.select().from(roadmapCourses).where(
          and(eq(roadmapCourses.roadmapId, roadmap.id), eq(roadmapCourses.courseId, course.id))
        ).get();

        if (!linkExists) {
          await db.insert(roadmapCourses).values({
            roadmapId: roadmap.id,
            courseId: course.id,
            order: courseOrder
          }).run();
        }

        // Link to Master Roadmap
        const masterLinkExists = await db.select().from(roadmapCourses).where(
          and(eq(roadmapCourses.roadmapId, masterRoadmap.id), eq(roadmapCourses.courseId, course.id))
        ).get();

        if (!masterLinkExists) {
          await db.insert(roadmapCourses).values({
            roadmapId: masterRoadmap.id,
            courseId: course.id,
            order: globalCourseOrder
          }).run();
        }

        courseOrder++;
        globalCourseOrder++;

        // 4. Upsert Lessons
        let lessonOrder = 1;
        for (const lessonData of topicLessons) {
          const slug = `${moduleKey}-${lessonData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
          const lessonFolder = slug.replace(`${moduleKey}-`, '');
          const lessonPath = path.join(contentDir, moduleKey, lessonFolder);
          const flatFilePath = path.join(contentDir, moduleKey, `${lessonFolder}.md`);

          let content = `# ${lessonData.title}\n\nConcept overview...`;
          let practiceContent = `## Practice\n\nTry it out!`;
          let exerciseInstructions = `## Exercise\n\nComplete the challenge.`;

          if (fs.existsSync(lessonPath) && fs.lstatSync(lessonPath).isDirectory()) {
            const readmePath = path.join(lessonPath, 'readme.md');
            const practicePath = path.join(lessonPath, 'practice.md');
            const exercisePath = path.join(lessonPath, 'exercise.md');

            if (fs.existsSync(readmePath)) content = fs.readFileSync(readmePath, 'utf-8');
            if (fs.existsSync(practicePath)) practiceContent = fs.readFileSync(practicePath, 'utf-8');
            if (fs.existsSync(exercisePath)) exerciseInstructions = fs.readFileSync(exercisePath, 'utf-8');
          } else if (fs.existsSync(flatFilePath)) {
            content = fs.readFileSync(flatFilePath, 'utf-8');
          }

          const existingLesson = await db.select().from(lessons).where(eq(lessons.slug, slug)).get();

          if (existingLesson) {
            await db.update(lessons)
              .set({
                title: lessonData.title,
                courseId: course.id,
                topic: topicTitle,
                module: moduleKey,
                content: content,
                practiceContent: practiceContent,
                complexity: lessonData.level,
                order: lessonOrder
              })
              .where(eq(lessons.id, existingLesson.id))
              .run();

            // Update separate exercise table
            await db.update(exercises)
              .set({ instructions: exerciseInstructions })
              .where(eq(exercises.lessonId, existingLesson.id))
              .run();

            updatedCount++;
          } else {
            const newLesson = await db.insert(lessons).values({
              courseId: course.id,
              module: moduleKey,
              topic: topicTitle,
              title: lessonData.title,
              slug: slug,
              content,
              practiceContent,
              complexity: lessonData.level,
              order: lessonOrder
            }).returning().get();

            await db.insert(exercises).values({
              lessonId: newLesson.id,
              instructions: exerciseInstructions,
              starterCode: `// Starter code for ${lessonData.title}\n`,
              solutionCode: `// Solution for ${lessonData.title}`
            }).run();
            createdCount++;
          }
          lessonOrder++;
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
