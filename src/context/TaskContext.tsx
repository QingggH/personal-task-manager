import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { mockTasks } from '../data/mockTasks';
import type { Task, TaskInput, TaskStatus } from '../types';

const STORAGE_KEY = 'personal-task-manager.tasks.v1';

interface TaskContextValue {
  tasks: Task[];
  addTask: (task: TaskInput) => Task;
  updateTask: (id: string, updates: Partial<TaskInput>) => Task | undefined;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

function isTaskStatus(value: unknown): value is TaskStatus {
  return value === 'pending' || value === 'completed';
}

function loadTasks(): Task[] {
  if (typeof window === 'undefined') {
    return mockTasks;
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return mockTasks;
  }

  try {
    const parsed = JSON.parse(storedValue) as Task[];

    if (Array.isArray(parsed)) {
      // Stored data may come from an older or corrupted shape, so keep only the
      // entries that still match the current Task structure before trusting them.
      const normalized = parsed.filter(
        (task): task is Task =>
          typeof task?.id === 'string' &&
          typeof task?.title === 'string' &&
          typeof task?.description === 'string' &&
          isTaskStatus(task?.status) &&
          typeof task?.createdAt === 'string' &&
          typeof task?.updatedAt === 'string',
      );

      if (parsed.length === 0) {
        return normalized;
      }

      return normalized.length > 0 ? normalized : mockTasks;
    }
  } catch {
    return mockTasks;
  }

  return mockTasks;
}

function createTaskId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const value = useMemo<TaskContextValue>(
    () => ({
      tasks,
      addTask: (task) => {
        const now = new Date().toISOString();
        const newTask: Task = {
          id: createTaskId(),
          title: task.title.trim(),
          description: task.description.trim(),
          status: task.status,
          createdAt: now,
          updatedAt: now,
        };

        setTasks((current) => [newTask, ...current]);
        return newTask;
      },
      updateTask: (id, updates) => {
        let updatedTask: Task | undefined;
        const updatedAt = new Date().toISOString();

        setTasks((current) =>
          current.map((task) => {
            if (task.id !== id) {
              return task;
            }

            updatedTask = {
              ...task,
              title: updates.title?.trim() ?? task.title,
              description: updates.description?.trim() ?? task.description,
              status: updates.status ?? task.status,
              updatedAt,
            };

            return updatedTask;
          }),
        );

        return updatedTask;
      },
      deleteTask: (id) => {
        setTasks((current) => current.filter((task) => task.id !== id));
      },
      toggleTaskStatus: (id) => {
        const updatedAt = new Date().toISOString();

        setTasks((current) =>
          current.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: task.status === 'pending' ? 'completed' : 'pending',
                  updatedAt,
                }
              : task,
          ),
        );
      },
      getTaskById: (id) => tasks.find((task) => task.id === id),
    }),
    [tasks],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }

  return context;
}
