# VueJS & NuxtJS Learning Platform

A full-stack learning platform to help learners progress from **Frontend** to **Backend** using **Vue 3, Nuxt 3, TailwindCSS, Drizzle ORM, and SQLite**.

## Prerequisites
- Node.js 20.19.4+
- npm

## Setup & Installation

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Create a `.env` file in the root if you want to override defaults (optional for this setup as we use defaults in config).
    ```env
    JWT_SECRET=supersecretkey
    ```

3.  **Database Setup**
    Push the schema to the local SQLite database.
    ```bash
    npx drizzle-kit push
    ```

4.  **Seed Data**
    After starting the server, visit: `http://localhost:3000/api/seed` to populate the database with initial lessons.

## Running the Application

Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000`.

## Features
- **Authentication**: Register and Login using JWT.
- **Learning Modules**: Browse Vue and Nuxt curriculum.
- **Progress Tracking**: visual indicators of completed lessons.
- **Interactive Lessons**: Read definitions, see code, and mark exercises as done.

## Tech Stack
- **Nuxt 3**: Full stack framework.
- **TailwindCSS**: Styling.
- **Pinia**: State Management.
- **Drizzle ORM**: Database interaction.
- **SQLite**: Local database.
