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

  // Calculate statistics
  const totalLessons = allLessons.length;
  const completedLessons = Object.values(progressMap).filter(status => status === 'completed').length;
  const globalPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const moduleStats = Object.keys(modules).reduce((acc, modName) => {
    const modLessons = modules[modName];
    const total = modLessons.length;
    const completed = modLessons.filter(l => progressMap[l.id] === 'completed').length;
    acc[modName] = {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
    return acc;
  }, {} as Record<string, { total: number, completed: number, percentage: number }>);

  return { 
    modules, 
    progress: progressMap,
    stats: {
      totalLessons,
      completedLessons,
      globalPercentage,
      moduleStats
    }
  };
});
