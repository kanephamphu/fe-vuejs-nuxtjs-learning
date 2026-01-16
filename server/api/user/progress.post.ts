import { db } from '~/server/db';
import { userProgress } from '~/server/db/schema';
import { eq, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const body = await readBody(event);
  const { lessonId, type } = body;

  if (!lessonId || !type) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
  }

  const existing = await db.select().from(userProgress)
    .where(and(eq(userProgress.userId, user.id), eq(userProgress.lessonId, lessonId)))
    .get();

  const update: any = { updatedAt: new Date() };
  if (type === 'practice') update.practiceCompleted = true;
  if (type === 'exercise') update.exerciseCompleted = true;

  if (existing) {
    const isPracticeDone = type === 'practice' || existing.practiceCompleted;
    const isExerciseDone = type === 'exercise' || existing.exerciseCompleted;
    
    if (isPracticeDone && isExerciseDone) {
      update.status = 'completed';
    }

    await db.update(userProgress)
      .set(update)
      .where(eq(userProgress.id, existing.id))
      .run();
  } else {
    const isPracticeDone = type === 'practice';
    const isExerciseDone = type === 'exercise';
    
    console.log(`[Progress Update] Inserting new record: userId=${user.id}, lessonId=${lessonId}`);
    
    try {
      await db.insert(userProgress)
        .values({ 
          userId: user.id, 
          lessonId, 
          status: isPracticeDone && isExerciseDone ? 'completed' : 'in_progress',
          practiceCompleted: isPracticeDone,
          exerciseCompleted: isExerciseDone
        })
        .run();
    } catch (err: any) {
      console.error(`[Progress Update Error] FK Failure: userId=${user.id}, lessonId=${lessonId}`, err.message);
      throw createError({ 
        statusCode: 400, 
        statusMessage: `Database error: ${err.message}. Your session might be stale. Please log out and log in again.` 
      });
    }
  }

  return { success: true };
});
