import { db } from '~/server/db';
import { userProgress, lessons } from '~/server/db/schema';
import { eq, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({ 
      statusCode: 401, 
      statusMessage: 'Unauthorized. Your session might have expired. Please log in again.' 
    });
  }

  const body = await readBody(event);
  const { lessonId: rawLessonId, type } = body;
  const lessonId = Number(rawLessonId);

  if (!lessonId || !type) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
  }

  // 1. Verify Lesson exists
  const lesson = await db.select().from(lessons).where(eq(lessons.id, lessonId)).get();
  if (!lesson) {
    throw createError({ statusCode: 404, statusMessage: `Lesson with ID ${lessonId} not found.` });
  }

  console.log(`[Progress] User: ${user.id}, Lesson: ${lessonId}, Type: ${type}`);

  const existingRecords = await db.select().from(userProgress)
    .where(and(eq(userProgress.userId, user.id), eq(userProgress.lessonId, lessonId)))
    .all();

  const existing = existingRecords[0];
  console.log(`[Progress] Found ${existingRecords.length} records. Using first:`, existing);

  if (existing) {
    const isExerciseDone = type === 'exercise' || !!existing.exerciseCompleted;
    const status = isExerciseDone ? 'completed' : 'in_progress';
    
    const update: any = { 
      updatedAt: new Date(),
      status
    };
    if (type === 'practice') update.practiceCompleted = true;
    if (type === 'exercise') update.exerciseCompleted = true;
    
    console.log('[Progress] Updating record with:', update);

    await db.update(userProgress)
      .set(update)
      .where(eq(userProgress.id, existing.id))
      .run();
      
    // Cleanup: If there were duplicates, delete the others to prevent future issues
    if (existingRecords.length > 1) {
      console.warn(`[Progress] Cleaning up ${existingRecords.length - 1} duplicate records for user ${user.id} lesson ${lessonId}`);
      for (let i = 1; i < existingRecords.length; i++) {
        await db.delete(userProgress).where(eq(userProgress.id, existingRecords[i].id)).run();
      }
    }
  } else {
    const isPracticeDone = type === 'practice';
    const isExerciseDone = type === 'exercise';
    const status = isExerciseDone ? 'completed' : 'in_progress';
    
    console.log(`[Progress] Inserting new record. Status: ${status}`);
    
    try {
      await db.insert(userProgress)
        .values({ 
          userId: user.id, 
          lessonId, 
          status,
          practiceCompleted: isPracticeDone,
          exerciseCompleted: isExerciseDone,
          updatedAt: new Date()
        })
        .run();
    } catch (err: any) {
      console.error(`[Progress Update Error] userId=${user.id}, lessonId=${lessonId}`, err.message);
      throw createError({ 
        statusCode: 400, 
        statusMessage: `Database error: ${err.message}. Please try logging out and in again.` 
      });
    }
  }

  return { success: true };
});
