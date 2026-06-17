import { Link, Navigate, useMatch, useNavigate, useParams } from 'react-router-dom';
import { TaskForm } from '../components/TaskForm';
import { useTasks } from '../context/TaskContext';
import type { TaskFormValues } from '../types';

export function TaskDetailsPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(useMatch('/tasks/:taskId/edit'));
  const { getTaskById, updateTask, deleteTask } = useTasks();

  if (!taskId) {
    return <Navigate to="/" replace />;
  }

  const existingTask = getTaskById(taskId);

  if (!existingTask) {
    return (
      <section className="card empty-state">
        <h2>Task not found</h2>
        <p>The task you requested may have been deleted.</p>
        <Link className="primary inline" to="/">
          Back to tasks
        </Link>
      </section>
    );
  }

  // Past the guard above the task is guaranteed to exist; aliasing it to a
  // constant keeps the narrowed (non-undefined) type inside the handlers below.
  const task = existingTask;

  function handleUpdate(values: TaskFormValues) {
    updateTask(task.id, values);
    navigate(`/tasks/${task.id}`);
  }

  function handleDelete() {
    deleteTask(task.id);
    navigate('/');
  }

  return (
    <div className="page-stack">
      <section className="card detail-card">
        <div className="detail-card__header">
          <div className="detail-card__content">
            <p className={`badge ${task.status}`}>{task.status}</p>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </div>

          <div className="detail-meta">
            <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
            <span>Updated: {new Date(task.updatedAt).toLocaleString()}</span>
          </div>
        </div>

        <div className="detail-card__actions">
          <Link className="secondary" to={`/tasks/${task.id}/edit`}>
            Edit
          </Link>
          <button className="danger" type="button" onClick={handleDelete}>
            Delete task
          </button>
          <Link className="secondary" to="/">
            Back to list
          </Link>
        </div>
      </section>

      {isEditMode ? (
        <TaskForm
          submitLabel="Save changes"
          initialValues={{
            title: task.title,
            description: task.description,
            status: task.status,
          }}
          onSubmit={handleUpdate}
          onCancel={() => navigate(`/tasks/${task.id}`)}
        />
      ) : null}
    </div>
  );
}
