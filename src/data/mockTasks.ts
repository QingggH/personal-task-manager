import type { Task } from '../types';

const now = new Date();

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Plan weekly review',
    description: 'Check progress, prioritize blockers, and set goals for the next five days.',
    status: 'pending',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 'task-2',
    title: 'Submit internship assignment',
    description: 'Polish the UI, verify routing, and prepare README instructions.',
    status: 'completed',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Follow up on peer review',
    description: 'Leave helpful feedback on at least one teammate branch before the deadline.',
    status: 'pending',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 10).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 10).toISOString(),
  },
];
