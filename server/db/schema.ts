import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// New Roadmap Entity (e.g., "Vue.js", "Nuxt.js")
export const roadmaps = sqliteTable('roadmaps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  slug: text('slug').notNull().unique(),
  // useful for UI ordering (e.g. JS -> TS -> CSS -> Vue -> Nuxt)
  order: integer('order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// New Course Entity (e.g., "Fundamentals", "Components", "State Management")
export const courses = sqliteTable('courses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  // roadmapId removed - now using Many-to-Many via roadmap_courses
  title: text('title').notNull(),
  description: text('description').notNull(),
  slug: text('slug').notNull().unique(),
  // Order is now context-dependent (in roadmap_courses), but we keep a default order or remove it.
  // We'll keep it as a default/suggested order.
  order: integer('order').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Join table for Many-to-Many: Roadmap <-> Courses
export const roadmapCourses = sqliteTable('roadmap_courses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  roadmapId: integer('roadmap_id').references(() => roadmaps.id).notNull(),
  courseId: integer('course_id').references(() => courses.id).notNull(),
  order: integer('order').notNull().default(0), // Order of this course IN THIS roadmap
});

export const lessons = sqliteTable('lessons', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  courseId: integer('course_id').references(() => courses.id), // Link to Course
  module: text('module').notNull(), // Keep for legacy/backward compat for now
  topic: text('topic').notNull(), // Keep for legacy
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  practiceContent: text('practice_content'),
  complexity: text('complexity'),
  order: integer('order').notNull().default(0), // Order within the course
});

export const exercises = sqliteTable('exercises', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  lessonId: integer('lesson_id').references(() => lessons.id).notNull(),
  instructions: text('instructions').notNull(),
  starterCode: text('starter_code').notNull(),
  solutionCode: text('solution_code').notNull(),
});

export const userProgress = sqliteTable('user_progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  lessonId: integer('lesson_id').references(() => lessons.id).notNull(),
  status: text('status').notNull(),
  practiceCompleted: integer('practice_completed', { mode: 'boolean' }).default(false),
  exerciseCompleted: integer('exercise_completed', { mode: 'boolean' }).default(false),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

export const userRoadmaps = sqliteTable('user_roadmaps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id).notNull(),
  roadmapId: integer('roadmap_id').references(() => roadmaps.id).notNull(),
  enrolledAt: integer('enrolled_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});
