import { db } from '../../db';
import { users } from '../../db/schema';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // TODO: Add authentication check
  
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const offset = (page - 1) * limit;

  // Fetch users with simple pagination
  const userList = await db.select({
    id: users.id,
    email: users.email,
    createdAt: users.createdAt
  })
  .from(users)
  .orderBy(desc(users.createdAt))
  .limit(limit)
  .offset(offset)
  .all();

  // Mock status for now
  const enrichedUsers = userList.map(u => ({
    ...u,
    status: 'active', // 'active' | 'idle' | 'completed'
    progress: Math.floor(Math.random() * 100) // Random progress for UI demo
  }));

  return {
    users: enrichedUsers,
    total: userList.length, // Should be total count in DB
    page,
    limit
  };
});
