import { useMemo } from 'react';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { useTasks } from '../context/TaskContext';
import type { TaskFormValues } from '../types';

export function TaskListPage() {
  const { tasks, addTask, deleteTask, toggleTaskStatus } = useTasks();

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === 'completed').length;
    const pending = tasks.length - completed;

    return { total: tasks.length, completed, pending };
  }, [tasks]);

  function handleAddTask(values: TaskFormValues) {
    addTask(values);
  }

  return (
    <div className="page-stack">
      <section className="hero card">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Manage tasks in one place.</h2>
          <p>Use the form below to create new tasks, then edit or delete them from the list.</p>
        </div>

        <div className="stats" aria-label="Task summary">
          <div>
            <strong>{stats.total}</strong>
            <span>Total</span>
          </div>
          <div>
            <strong>{stats.pending}</strong>
            <span>Pending</span>
          </div>
          <div>
            <strong>{stats.completed}</strong>
            <span>Completed</span>
          </div>
        </div>
      </section>

      <TaskForm submitLabel="Add task" onSubmit={handleAddTask} />

      <TaskList tasks={tasks} onToggleStatus={toggleTaskStatus} onDelete={deleteTask} />
    </div>
  );
}
