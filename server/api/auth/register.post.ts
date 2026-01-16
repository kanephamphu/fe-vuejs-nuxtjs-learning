import { db } from '~/server/db';
import { users } from '~/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { signToken } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password required' });
  }

  const existingUser = await db.select().from(users).where(eq(users.email, email)).get();
  
  if (existingUser) {
    throw createError({ statusCode: 409, statusMessage: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await db.insert(users).values({
    email,
    password: passwordHash,
  }).returning().get();

  const token = signToken({ id: newUser.id, email: newUser.email });
  
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return {
    user: {
      id: newUser.id,
      email: newUser.email,
    }
  };
});
