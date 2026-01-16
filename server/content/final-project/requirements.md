# Final Project: The Platform Admin Dashboard

**Goal**: Build a data-driven "Command Center" to manage users and view their learning progress on this platform.

## 1. Technical Requirements
- **Framework**: Nuxt 3 (SSR Mode)
- **Styling**: Tailwind CSS (Must include Dark Mode)
- **State**: Pinia (Store user data and stats)
- **Backend**: Nitro API Routes (`server/api/*`)

---

## 2. Required Features

### A. Dashboard Home (`/admin`)
- **KPI Cards**: Show Total Users, Active Users (Mock), and Average Completion Rate.
- **Activity Feed**: A list showing the 5 most recent completed lessons.

### B. User Management (`/admin/users`)
- **Data Table**: Display ID, Email, Join Date, Status, and Progress Bar.
- **Pagination**: Support paging (e.g., 20 users per page).
- **Search**: Filter users by email or ID.

### C. Student Details (`/admin/users/[id]`)
- **Profile Header**: User avatar (initials) and metadata.
- **Progress Visuals**:
    - A heatmap or bar chart showing lessons completed per module (JS, CSS, Vue, Nuxt).
- **Lesson History**: A timeline of all lessons this user has finished.

---

## 3. API Specifications
You must implement the following endpoints in `server/api/admin/`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/stats` | Returns `{ totalUsers, activeToday, avgCompletion }` |
| `GET` | `/users` | Returns `{ users: [], total, page }`. Supports `?page=&search=` |
| `GET` | `/users/:id` | Returns header info, stats, and full lesson history for a user. |

---

## 4. Acceptance Criteria
- [ ] The dashboard has a dedicated layout (Sidebar navigation).
- [ ] User list is paginated (not loading all 1000 users at once).
- [ ] Clicking a user navigates to their dynamic profile page.
- [ ] Interface is fully responsive (mobile-friendly).
