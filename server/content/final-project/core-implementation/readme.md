# Admin Dashboard: Implementation Specs

This guide details the technical architecture for the Platform Admin Dashboard.

## 1. Backend API (Nitro)
You need to create the following server endpoints to power your dashboard.

### A. Stats Component
- **Endpoint**: `GET /api/admin/stats`
- **Purpose**: Returns the aggregate data for the command center.
- **Example Response**:
```json
{
  "totalUsers": 142,
  "activeToday": 15,
  "averageCompletion": 68
}
```

### B. User Management
- **Endpoint**: `GET /api/admin/users`
- **Purpose**: Returns a paginated list of users.
- **Query Params**: `?page=1&limit=20&search=kane`

### C. User Data
- **Endpoint**: `GET /api/admin/users/[id]`
- **Purpose**: Returns full details for a single user, including their progress history.

---

## 2. Frontend Architecture (Nuxt)
Structure your `pages/admin` directory as follows:

- `pages/admin/index.vue`: The Command Center (KPIs + Activity Feed).
- `pages/admin/users/index.vue`: The User Search Table.
- `pages/admin/users/[id].vue`: The Student Detail View (Heatmaps/Charts).

## 3. Data Store (Pinia)
Create a store at `stores/admin.ts`:
- **State**: `users[]`, `currentStats`, `isLoading`.
- **Actions**: `fetchDashboardData()`, `fetchUser(id)`.

> [!TIP]
> Use `useFetch` with custom keys to ensure data is cached appropriately and doesn't re-fetch unnecessarily when navigating between tabs.


Today is the heavy lifting day. You will implement the core features of your dashboard.

## Objectives
1. **Dynamic Content**: Implement CRUD (Create, Read, Update, Delete) functionality for a resource (e.g., Products or Users).
2. **Data Fetching**: Connect your UI to the Nitro API routes.
3. **Interactive Charts**: Use `chart.js` or `vue-chartjs` to visualize data.
4. **Form Validation**: Build a robust form with error handling for adding new items.

## Key Feature: User Management
- List users in a table.
- Search/Filter users.
- Edit user details in a slide-over or modal.
```javascript
// composables/useProducts.ts
export const useProducts = () => {
  return useAsyncData('products', () => $fetch('/api/products'))
}
```
# Tip
Focus on making the UI feel responsive and professional using Tailwind utilities.
