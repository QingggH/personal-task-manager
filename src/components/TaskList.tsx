import { Link } from 'react-router-dom';
import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggleStatus, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <section className="card empty-state" aria-live="polite">
        <h2>No tasks yet</h2>
        <p>Add your first task to start tracking work.</p>
      </section>
    );
  }

  return (
    <section className="task-grid" aria-label="Task list">
      {tasks.map((task) => (
        <article className="card task-card" key={task.id}>
          <div className="task-card__header">
            <div>
              <p className={`badge ${task.status}`}>{task.status}</p>
              <h2>{task.title}</h2>
            </div>
            <Link className="text-link" to={`/tasks/${task.id}`}>
              View details
            </Link>
          </div>

          <p className="task-card__description">{task.description}</p>

          <div className="task-card__actions">
            <button className="secondary" type="button" onClick={() => onToggleStatus(task.id)}>
              Mark as {task.status === 'pending' ? 'completed' : 'pending'}
            </button>
            <Link className="secondary" to={`/tasks/${task.id}/edit`}>
              Edit
            </Link>
            <button className="danger" type="button" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
