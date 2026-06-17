import { useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { TaskFormValues, TaskStatus } from '../types';

interface TaskFormProps {
  initialValues?: TaskFormValues;
  submitLabel: string;
  onSubmit: (values: TaskFormValues) => void;
  onCancel?: () => void;
  inlineSubmitInStatusRow?: boolean;
  confirmBeforeSubmit?: (values: TaskFormValues) => boolean;
  resetAfterSubmit?: boolean;
}

const emptyValues: TaskFormValues = {
  title: '',
  description: '',
  status: 'pending',
};

export function TaskForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
  inlineSubmitInStatusRow = false,
  confirmBeforeSubmit,
  resetAfterSubmit = true,
}: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(initialValues ?? emptyValues);
  const [error, setError] = useState('');
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const statusMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setValues(initialValues ?? emptyValues);
  }, [initialValues]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (statusMenuRef.current && !statusMenuRef.current.contains(event.target as Node)) {
        setStatusMenuOpen(false);
      }
    }

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        setStatusMenuOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape as unknown as EventListener);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape as unknown as EventListener);
    };
  }, []);

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
    const nextValues = {
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status,
    };

    if (confirmBeforeSubmit && !confirmBeforeSubmit(nextValues)) {
      return;
    }

    onSubmit(nextValues);

    if (!initialValues && resetAfterSubmit) {
      setValues(emptyValues);
    }
  }

  function updateField<K extends keyof TaskFormValues>(field: K, value: TaskFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function selectStatus(status: TaskStatus) {
    updateField('status', status);
    setStatusMenuOpen(false);
  }

  function handleStatusTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setStatusMenuOpen((current) => !current);
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{submitLabel}</h2>
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

      <div className="field field--status">
        <span>Status</span>
        <div className="status-row">
          <div className="status-picker" ref={statusMenuRef}>
            <button
              className={`status-trigger badge ${values.status}`}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={statusMenuOpen}
              onClick={() => setStatusMenuOpen((current) => !current)}
              onKeyDown={handleStatusTriggerKeyDown}
            >
              <span>{values.status === 'pending' ? 'Pending' : 'Completed'}</span>
              <span className="status-trigger__chevron" aria-hidden="true">
                ▾
              </span>
            </button>

            {statusMenuOpen ? (
              <div className="status-menu" role="listbox" aria-label="Task status">
                <button
                  type="button"
                  className={`status-option ${values.status === 'pending' ? 'active' : ''}`}
                  onClick={() => selectStatus('pending')}
                >
                  <span className="status-dot pending" aria-hidden="true" />
                  Pending
                </button>
                <button
                  type="button"
                  className={`status-option ${values.status === 'completed' ? 'active' : ''}`}
                  onClick={() => selectStatus('completed')}
                >
                  <span className="status-dot completed" aria-hidden="true" />
                  Completed
                </button>
              </div>
            ) : null}
          </div>

          {inlineSubmitInStatusRow ? (
            <div className="status-actions">
              <button className="primary status-submit" type="submit">
                {submitLabel}
              </button>
              {onCancel ? (
                <button className="secondary status-cancel" type="button" onClick={onCancel}>
                  Cancel
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}

      {!inlineSubmitInStatusRow ? (
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
      ) : null}
    </form>
  );
}
