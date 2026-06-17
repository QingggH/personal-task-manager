import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { TaskFormValues, TaskStatus } from '../types';

interface TaskFormProps {
  initialValues?: TaskFormValues;
  submitLabel: string;
  onSubmit: (values: TaskFormValues) => void;
  onCancel?: () => void;
}

const emptyValues: TaskFormValues = {
  title: '',
  description: '',
  status: 'pending',
};

export function TaskForm({ initialValues, submitLabel, onSubmit, onCancel }: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(initialValues ?? emptyValues);
  const [error, setError] = useState('');

  useEffect(() => {
    setValues(initialValues ?? emptyValues);
  }, [initialValues]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!values.title.trim()) {
      setError('Title is required.');
      return;
    }

    if (!values.description.trim()) {
      setError('Description is required.');
      return;
    }

    setError('');
    onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status,
    });

    if (!initialValues) {
      setValues(emptyValues);
    }
  }

  function updateField<K extends keyof TaskFormValues>(field: K, value: TaskFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{submitLabel}</h2>
        <p>Fill in the task details below.</p>
      </div>

      <label className="field">
        <span>Title</span>
        <input
          type="text"
          value={values.title}
          onChange={(event) => updateField('title', event.target.value)}
          placeholder="Write the task title"
          aria-invalid={Boolean(error)}
        />
      </label>

      <label className="field">
        <span>Description</span>
        <textarea
          value={values.description}
          onChange={(event) => updateField('description', event.target.value)}
          placeholder="Add a short description"
          rows={4}
          aria-invalid={Boolean(error)}
        />
      </label>

      <label className="field">
        <span>Status</span>
        <select
          value={values.status}
          onChange={(event) => updateField('status', event.target.value as TaskStatus)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="actions">
        <button className="primary" type="submit">
          {submitLabel}
        </button>
        {onCancel ? (
          <button className="secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
