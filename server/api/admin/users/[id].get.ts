import { db } from '../../../db';
import { users, userProgress, lessons } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // TODO: Add admin authentication check
  const id = Number(event.context.params?.id);
  if (!id) throw createError({ statusCode: 400, message: "Invalid ID" });

  // 1. Fetch User
  const user = await db.select().from(users).where(eq(users.id, id)).get();
  if (!user) throw createError({ statusCode: 404, message: "User not found" });

  // 2. Fetch Progress Joined with Lessons
  const progressRaw = await db.select({
    status: userProgress.status,
    completedAt: userProgress.updatedAt,
    lessonTitle: lessons.title,
    lessonModule: lessons.module,
    lessonSlug: lessons.slug
  })
  .from(userProgress)
  .leftJoin(lessons, eq(userProgress.lessonId, lessons.id))
  .where(eq(userProgress.userId, id))
  .all();

  // 3. Calculate Stats
  const totalCompleted = progressRaw.filter(p => p.status === 'completed').length;
  const progressMap = {
    javascript: 0,
    css: 0,
    vue: 0,
    nuxt: 0
  };

  progressRaw.forEach(p => {
    if (p.status === 'completed' && p.lessonModule) {
      // @ts-ignore
      if (progressMap[p.lessonModule] !== undefined) {
        // @ts-ignore
        progressMap[p.lessonModule]++;
      }
    }
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt
    },
    stats: {
      totalCompleted,
      progressMap
    },
    history: progressRaw
  };
});
