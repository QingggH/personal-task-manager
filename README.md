# Personal Task Manager

A small React + TypeScript task manager for internship take-home review.

## Features

- Task list with hardcoded starter data
- Add new tasks
- Edit title, description, and status
- Delete tasks
- React Router navigation between list and details pages
- LocalStorage persistence
- Responsive layout

## Stack

- React 18
- TypeScript
- React Router v6
- Vite

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

- `src/App.tsx` app shell and routes
- `src/context/TaskContext.tsx` task state and persistence
- `src/pages/TaskListPage.tsx` list page
- `src/pages/TaskDetailsPage.tsx` details/edit page
- `src/components/TaskForm.tsx` reusable form
- `src/components/TaskList.tsx` list rendering

## Notes

- Initial data comes from `src/data/mockTasks.ts`
- The app falls back to mock data if localStorage is empty or invalid
- Editing happens on the details route so list and details pages both exist

## Git Workflow Suggestion

- `main` for stable code
- `feature/add-task`
- `feature/edit-task`
- `feature/delete-task`

For the submission checklist, create GitHub issues and open PRs from feature branches into `main`.
