import { Link, NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Personal Task Manager</p>
          <h1>Track work. Edit fast. Stay organized.</h1>
        </div>
        <nav aria-label="Primary" className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Tasks
          </NavLink>
        </nav>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <Link to="/">Built with React, TypeScript, and React Router</Link>
      </footer>
    </div>
  );
}
