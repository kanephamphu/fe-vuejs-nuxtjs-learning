import { verifyToken } from '~/server/utils/jwt';
import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import { eq } from 'drizzle-orm';
import { getRequestPath } from 'h3';

export default defineEventHandler(async (event) => {
  const path = getRequestPath(event);
  
  // Skip auth checks for login/register to avoid session clearing during auth flow
  if (path.includes('/api/auth/login') || path.includes('/api/auth/register')) {
    return;
  }

  const token = getCookie(event, 'auth_token');
  
  if (!token) return;

  try {
    const payload = verifyToken(token) as any;
    if (!payload || !payload.id) {
      deleteCookie(event, 'auth_token', { path: '/' });
      return;
    }

    // Check if user still exists
    const user = await db.select().from(users).where(eq(users.id, payload.id)).get();
    
    if (user) {
      event.context.user = { id: user.id, email: user.email };
    } else {
      console.warn(`[Auth Middleware] User ${payload.id} not found. Clearing cookie.`);
      deleteCookie(event, 'auth_token', { path: '/' });
    }
  } catch (error) {
    console.error('[Auth Middleware] Verification error:', error);
  }
});
