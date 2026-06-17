import { useMemo, useState } from 'react';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { useTasks } from '../context/TaskContext';
import type { TaskFormValues } from '../types';

export function TaskListPage() {
  const { tasks, addTask, deleteTask, toggleTaskStatus } = useTasks();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [pendingTask, setPendingTask] = useState<TaskFormValues | null>(null);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === 'completed').length;
    const pending = tasks.length - completed;

    return { total: tasks.length, completed, pending };
  }, [tasks]);

  function handleAddTask(values: TaskFormValues) {
    setPendingTask(values);
  }

  function handleShowForm() {
    setIsFormVisible(true);
  }

  function handleConfirmAddTask() {
    if (!pendingTask) {
      return;
    }

    addTask(pendingTask);
    setPendingTask(null);
    setIsFormVisible(false);
  }

  function handleCancelAddTask() {
    setPendingTask(null);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="page-stack">
      <section className="hero card">
        <div className="hero-left">
          <p className="eyebrow">Overview</p>
          <h2>Manage tasks in one place.</h2>
          {!isFormVisible ? (
            <button className="primary hero-cta" type="button" onClick={handleShowForm}>
              Add a new task
            </button>
          ) : null}
        </div>

        <div className="hero-right" aria-label="Task summary">
          <div className="stats">
            <span className="badge stats-badge stats-badge--total">
              <span className="stats-label">
                <span className="stats-dot" aria-hidden="true"></span>Total
              </span>
              <strong className="stats-value">{stats.total}</strong>
            </span>
            <span className="badge stats-badge stats-badge--pending">
              <span className="stats-label">
                <span className="stats-dot" aria-hidden="true"></span>Pending
              </span>
              <strong className="stats-value">{stats.pending}</strong>
            </span>
            <span className="badge stats-badge stats-badge--completed">
              <span className="stats-label">
                <span className="stats-dot" aria-hidden="true"></span>Completed
              </span>
              <strong className="stats-value">{stats.completed}</strong>
            </span>
          </div>
        </div>
      </section>

      {isFormVisible ? (
        <TaskForm
          submitLabel="Add task"
          onSubmit={handleAddTask}
          onCancel={() => setIsFormVisible(false)}
          inlineSubmitInStatusRow
          resetAfterSubmit={false}
        />
      ) : null}

      {pendingTask ? (
        <div className="confirm-overlay" role="presentation">
          <div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
            <p className="eyebrow">Confirm</p>
            <h2 id="confirm-title">Add this new task?</h2>
            <p>
              {pendingTask.title
                ? `This will add "${pendingTask.title}" to your task list.`
                : 'This will add the new task to your task list.'}
            </p>

            <div className="confirm-actions">
              <button className="primary" type="button" onClick={handleConfirmAddTask}>
                Confirm
              </button>
              <button className="secondary confirm-cancel" type="button" onClick={handleCancelAddTask}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <TaskList tasks={tasks} onToggleStatus={toggleTaskStatus} onDelete={deleteTask} />

      <button className="secondary back-to-top" type="button" onClick={scrollToTop} aria-label="Back to top">
        ↑
      </button>
    </div>
  );
}
