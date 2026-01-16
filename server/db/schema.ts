import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

export const lessons = sqliteTable('lessons', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  module: text('module').notNull(), // 'vue' or 'nuxt'
  topic: text('topic').notNull(), // e.g. 'fundamentals'
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(), // Markdown content
  practiceContent: text('practice_content'), // New field for practice instructions
  complexity: text('complexity'), // 'beginner', 'intermediate', 'advanced'
});

export const exercises = sqliteTable('exercises', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  lessonId: integer('lesson_id').references(() => lessons.id).notNull(),
  instructions: text('instructions').notNull(), // This will be used for the exercise markdown
  starterCode: text('starter_code').notNull(),
  solutionCode: text('solution_code').notNull(),
});

export const userProgress = sqliteTable('user_progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  lessonId: integer('lesson_id').references(() => lessons.id).notNull(),
  status: text('status').notNull(), // 'completed', 'in_progress'
  practiceCompleted: integer('practice_completed', { mode: 'boolean' }).default(false),
  exerciseCompleted: integer('exercise_completed', { mode: 'boolean' }).default(false),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});
