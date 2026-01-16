import { db } from '~/server/db';
import { lessons, userProgress } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  
  const allLessons = await db.select().from(lessons).all();
  
  // Group lessons by module dynamically
  const modules = allLessons.reduce((groups, lesson) => {
    const mod = lesson.module;
    if (!groups[mod]) {
      groups[mod] = [];
    }
    groups[mod].push(lesson);
    return groups;
  }, {} as Record<string, typeof allLessons>);

  let progressMap: Record<number, string> = {};
  if (user) {
    const progress = await db.select().from(userProgress).where(eq(userProgress.userId, user.id)).all();
    progressMap = progress.reduce((acc, p) => ({ ...acc, [p.lessonId]: p.status }), {});
  }

  return { modules, progress: progressMap };
});
