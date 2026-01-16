import { verifyToken } from '~/server/utils/jwt';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');
  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      // Robust check: verify user still exists in DB
      const user = await db.select().from(users).where(eq(users.id, payload.id)).get();
      if (user) {
        event.context.user = payload;
      } else {
        // Clear invalid cookie
        deleteCookie(event, 'auth_token');
      }
    }
  }
});
