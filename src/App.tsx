import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TaskProvider } from './context/TaskContext';
import { TaskDetailsPage } from './pages/TaskDetailsPage';
import { TaskListPage } from './pages/TaskListPage';

export function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<TaskListPage />} />
            <Route path="/tasks/:taskId" element={<TaskDetailsPage />} />
            <Route path="/tasks/:taskId/edit" element={<TaskDetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </TaskProvider>
    </BrowserRouter>
  );
}
