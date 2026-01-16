
import fs from 'node:fs';
import path from 'node:path';

// Define Data (Mirrors seed.ts)
const roadmapConfig: Record<string, any> = {
    javascript: { title: 'JavaScript', order: 1, description: 'Master the language of the web.' },
    typescript: { title: 'TypeScript', order: 2, description: 'Type safety for scalable apps.' },
    css: { title: 'CSS Mastery', order: 3, description: 'Styling and layout fundamentals.' },
    vue: { title: 'Vue.js', order: 4, description: 'The progressive JavaScript framework.' },
    nuxt: { title: 'Nuxt.js', order: 5, description: 'The Intuitive Web Framework.' },
    'final-project': { title: 'Final Project', order: 6, description: 'Build a real-world application.' }
};

const modules: Record<string, any[]> = {
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

function escapeSql(str: string | undefined): string {
    if (!str) return "''";
    return `'${str.replace(/'/g, "''")}'`;
}

console.log("BEGIN TRANSACTION;");

const contentDir = path.join(process.cwd(), 'server', 'content');

for (const [moduleKey, lessonsList] of Object.entries(modules)) {
    const rmConfig = roadmapConfig[moduleKey] || { title: moduleKey, order: 99, description: 'Learn ' + moduleKey };

    // Roadmap
    console.log(`
    INSERT INTO roadmaps (slug, title, description, 'order', created_at) 
    VALUES (${escapeSql(moduleKey)}, ${escapeSql(rmConfig.title)}, ${escapeSql(rmConfig.description)}, ${rmConfig.order}, CURRENT_TIMESTAMP)
    ON CONFLICT(slug) DO UPDATE SET 
      title=excluded.title, 
      description=excluded.description, 
      'order'=excluded.'order';
  `);

    // Group by topic
    const coursesMap = new Map<string, any[]>();
    for (const l of lessonsList) {
        const topic = (l as any).topic || 'General';
        if (!coursesMap.has(topic)) coursesMap.set(topic, []);
        coursesMap.get(topic)?.push(l);
    }

    let courseOrder = 1;
    for (const [topicTitle, topicLessons] of coursesMap.entries()) {
        const courseSlug = `${moduleKey}-${topicTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

        // Course
        console.log(`
      INSERT INTO courses (roadmap_id, slug, title, description, 'order', created_at)
      VALUES (
        (SELECT id FROM roadmaps WHERE slug=${escapeSql(moduleKey)}),
        ${escapeSql(courseSlug)},
        ${escapeSql(topicTitle)},
        ${escapeSql(`Lessons for ${topicTitle}`)},
        ${courseOrder},
        CURRENT_TIMESTAMP
      )
      ON CONFLICT(slug) DO UPDATE SET
        title=excluded.title,
        'order'=excluded.'order',
        roadmap_id=excluded.roadmap_id;
    `);

        courseOrder++;

        let lessonOrder = 1;
        for (const lessonData of topicLessons) {
            const slug = `${moduleKey}-${lessonData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
            const lessonFolder = slug.replace(`${moduleKey}-`, '');
            const lessonPath = path.join(contentDir, moduleKey, lessonFolder);
            const flatFilePath = path.join(contentDir, moduleKey, `${lessonFolder}.md`);

            let content = `# ${lessonData.title}\n\nConcept overview...`;
            let practiceContent = `## Practice\n\nTry it out!`;
            let exerciseInstructions = `## Exercise\n\nComplete the challenge.`;

            // Simplified file reading (sync)
            try {
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
            } catch (e) {
                // ignore read errors
            }

            // Lesson
            console.log(`
        INSERT INTO lessons (course_id, module, topic, title, slug, content, practice_content, complexity, 'order')
        VALUES (
          (SELECT id FROM courses WHERE slug=${escapeSql(courseSlug)}),
          ${escapeSql(moduleKey)},
          ${escapeSql(topicTitle)},
          ${escapeSql(lessonData.title)},
          ${escapeSql(slug)},
          ${escapeSql(content)},
          ${escapeSql(practiceContent)},
          ${escapeSql(lessonData.level)},
          ${lessonOrder}
        )
        ON CONFLICT(slug) DO UPDATE SET
          title=excluded.title,
          course_id=excluded.course_id,
          content=excluded.content,
          practice_content=excluded.practice_content,
          complexity=excluded.complexity,
          'order'=excluded.'order';
      `);

            // Exercise
            // We need lesson_id, which we can get via scalar subquery
            const starterCode = `// Starter code for ${lessonData.title}\n`;
            const solutionCode = `// Solution for ${lessonData.title}`;

            console.log(`
        DELETE FROM exercises WHERE lesson_id=(SELECT id FROM lessons WHERE slug=${escapeSql(slug)});
        INSERT INTO exercises (lesson_id, instructions, starter_code, solution_code)
        VALUES (
          (SELECT id FROM lessons WHERE slug=${escapeSql(slug)}),
          ${escapeSql(exerciseInstructions)},
          ${escapeSql(starterCode)},
          ${escapeSql(solutionCode)}
        );
      `);

            lessonOrder++;
        }
    }
}

console.log("COMMIT;");
