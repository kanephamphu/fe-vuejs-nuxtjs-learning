import { db } from '~/server/db';
import { roadmaps, courses, lessons, userProgress, userRoadmaps, roadmapCourses } from '~/server/db/schema';
import { eq, asc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const user = event.context.user;

    // Fetch Data
    const allRoadmaps = await db.select().from(roadmaps).orderBy(asc(roadmaps.order)).all();
    const allCourses = await db.select().from(courses).all(); // Order handled by map from roadmapCourses
    const allLessons = await db.select().from(lessons).orderBy(asc(lessons.order)).all();
    const allRoadmapCourses = await db.select().from(roadmapCourses).orderBy(asc(roadmapCourses.order)).all();

    // Get User Progress & Enrollment
    let progressMap: Record<number, string> = {};
    let enrolledRoadmapIds: number[] = [];

    if (user) {
        const progress = await db.select().from(userProgress).where(eq(userProgress.userId, user.id)).all();
        progressMap = progress.reduce((acc, p) => ({ ...acc, [p.lessonId]: p.status }), {});

        const enrollments = await db.select().from(userRoadmaps).where(eq(userRoadmaps.userId, user.id)).all();
        enrolledRoadmapIds = enrollments.map(e => e.roadmapId);
    }

    // Build Hierarchy & Stats
    const result = allRoadmaps.map(rm => {
        // Find courses linked to this roadmap
        const linkedRc = allRoadmapCourses.filter(rc => rc.roadmapId === rm.id);

        // Map to actual course objects
        const rmCourses = linkedRc.map(rc => {
            const course = allCourses.find(c => c.id === rc.courseId);
            if (!course) return null;
            // Inject local order from the link if needed, keeping it simple for now
            return course;
        }).filter((c): c is typeof allCourses[0] => c !== null);

        // Process Courses
        const coursesWithLessons = rmCourses.map(c => {
            const cLessons = allLessons.filter(l => l.courseId === c.id);

            // Course Stats
            const total = cLessons.length;
            const completed = cLessons.filter(l => progressMap[l.id] === 'completed').length;

            return {
                ...c,
                lessons: cLessons,
                stats: {
                    total,
                    completed,
                    percentage: total > 0 ? Math.round((completed / total) * 100) : 0
                }
            };
        });

        // Roadmap Stats
        // Allow computing stats even if lessons are nested
        const allRmLessons = coursesWithLessons.flatMap(c => c.lessons);
        const total = allRmLessons.length;
        const completed = allRmLessons.filter(l => progressMap[l.id] === 'completed').length;

        return {
            ...rm,
            isEnrolled: enrolledRoadmapIds.includes(rm.id),
            courses: coursesWithLessons,
            stats: {
                total,
                completed,
                percentage: total > 0 ? Math.round((completed / total) * 100) : 0
            }
        };
    });

    return { roadmaps: result };
});
