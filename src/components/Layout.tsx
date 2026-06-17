import { Link, NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="shell">
      <header className="topbar">
        <Link className="eyebrow brand-link" to="/">
          Personal Task Manager
        </Link>
        <nav aria-label="Primary" className="nav">
          <NavLink
            to="/"
            end
            aria-label="Home"
            className={({ isActive }) => (isActive ? 'nav-link active nav-link--icon' : 'nav-link nav-link--icon')}
          >
            <span className="home-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img" focusable="false">
                <path d="M12 3.2 3 10.6v9.2h6.2v-6.1h5.6v6.1H21v-9.2L12 3.2Z" />
              </svg>
            </span>
          </NavLink>
        </nav>
      </header>

      <main className="main">{children}</main>
    </div>
  );
}
