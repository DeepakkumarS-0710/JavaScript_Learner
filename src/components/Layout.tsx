import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { lessons } from '../data/curriculum';

export function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { completed } = useProgress();
  const progress = Math.round((completed.length / lessons.length) * 100);

  return (
    <div className="layout">
      <aside className="sidebar">
        <NavLink className="brand" to="/" aria-label="Frontend Learning Lab home">
          <span className="brand-mark">F</span><span>Frontend<span className="brand-light">Lab</span></span>
        </NavLink>
        <div className="sidebar-label">LEARN</div>
        <nav className="side-nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>⌂</span> Overview</NavLink>
          <NavLink to="/curriculum" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>▤</span> Curriculum <small>27</small></NavLink>
          <NavLink to="/practice" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>⌘</span> Practice lab</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span>ⓘ</span> About this project</NavLink>
        </nav>
        <div className="sidebar-progress">
          <div className="sidebar-label">YOUR PROGRESS</div>
          <div className="progress-meta"><span>{completed.length} of {lessons.length} complete</span><strong>{progress}%</strong></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <p>Small steps add up. Keep going.</p>
        </div>
        <div className="sidebar-bottom">
          <a className="guide-link" href="/STUDY_GUIDE.md" target="_blank" rel="noreferrer"><span>↗</span> Open study guide</a>
          <button className="theme-toggle" onClick={toggleTheme} type="button"><span>{theme === 'light' ? '☾' : '☀'}</span> {theme === 'light' ? 'Dark mode' : 'Light mode'}</button>
          <div className="profile-row"><span className="avatar">DL</span><div><strong>Learner</strong><small>Building fundamentals</small></div><span className="profile-dots">•••</span></div>
        </div>
      </aside>
      <main className="main-content"><Outlet /></main>
    </div>
  );
}
