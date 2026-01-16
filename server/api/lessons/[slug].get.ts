import { db } from '~/server/db';
import { lessons, exercises, userProgress, roadmaps, courses, roadmapCourses } from '~/server/db/schema';
import { eq, and, asc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug required' });
  }

  const lesson = await db.select().from(lessons).where(eq(lessons.slug, slug)).get();

  if (!lesson) {
    throw createError({ statusCode: 404, statusMessage: 'Lesson not found' });
  }

  const exercise = await db.select().from(exercises).where(eq(exercises.lessonId, lesson.id)).get();

  const user = event.context.user;
  let progress = null;
  if (user) {
    progress = await db.select().from(userProgress)
      .where(and(eq(userProgress.userId, user.id), eq(userProgress.lessonId, lesson.id)))
      .get();
  }

  const query = getQuery(event);
  const roadmapSlug = query.roadmap as string;

  let nextLesson = null;
  let prevLesson = null;

  // Calculate Next/Prev Lesson if roadmap context is provided
  if (roadmapSlug) {
    // 1. Get Roadmap
    const roadmap = await db.select().from(roadmaps).where(eq(roadmaps.slug, roadmapSlug)).get();

    if (roadmap) {
      // 2. Get Ordered Courses for this Roadmap
      const linkedCourses = await db.select()
        .from(roadmapCourses)
        .where(eq(roadmapCourses.roadmapId, roadmap.id))
        .orderBy(asc(roadmapCourses.order))
        .all();

      // 3. Get All Lessons for these courses (in order)
      // We fetch all lessons and sort them by course order then lesson order
      // Optimization: This could be a complex join, but for simplicity we'll fetch and sort in memory or simple loops
      // A better approach for scale:
      /*
         SELECT l.* FROM lessons l
         JOIN courses c ON l.course_id = c.id
         JOIN roadmap_courses rc ON c.id = rc.course_id
         WHERE rc.roadmap_id = ?
         ORDER BY rc.order ASC, l.order ASC
      */
      // Drizzle query builder approach:

      // Let's reuse the logic from roadmaps.get.ts but cleaner or just use raw query for speed/simplicity?
      // Check if we can do it with query builder easily.
      // We can iterate the ordered courses and fetch lessons for each.

      const allOrderedLessons = [];
      for (const rc of linkedCourses) {
        const courseLessons = await db.select().from(lessons)
          .where(eq(lessons.courseId, rc.courseId))
          .orderBy(asc(lessons.order))
          .all();
        allOrderedLessons.push(...courseLessons);
      }

      // 4. Find current lesson index
      const currentIndex = allOrderedLessons.findIndex(l => l.id === lesson.id);

      if (currentIndex !== -1) {
        // Next Lesson
        if (currentIndex < allOrderedLessons.length - 1) {
          const next = allOrderedLessons[currentIndex + 1];
          nextLesson = {
            slug: next.slug,
            title: next.title,
            module: roadmapSlug // In the context of this roadmap, the module param for URL is the roadmap slug
          };
        }
        // Prev Lesson
        if (currentIndex > 0) {
          const prev = allOrderedLessons[currentIndex - 1];
          prevLesson = {
            slug: prev.slug,
            title: prev.title,
            module: roadmapSlug
          };
        }
      }
    }
  }

  return { ...lesson, exercise, progress, nextLesson, prevLesson };
});
