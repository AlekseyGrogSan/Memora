import { useAuth } from "../AuthContext";
import "./DashboardPage.css";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2L2 8l12 6 12-6-12-6zM2 20l12 6 12-6M2 14l12 6 12-6"
              stroke="#FF6B2B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>MEMORA</span>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <span className="nav-icon">📊</span>
            Dashboard
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📚</span>
            My Courses
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">🔧</span>
            Module Forge
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📝</span>
            Training
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⚔️</span>
            PvP Arena
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a href="#" className="nav-item">
            <span className="nav-icon">👤</span>
            Profile
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⚙️</span>
            Settings
          </a>
          <button onClick={logout} className="nav-item logout-btn">
            <span className="nav-icon">🚪</span>
            Log Out
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="user-avatar">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#2a2d3a" />
              <circle cx="20" cy="16" r="7" fill="#6b7280" />
              <path
                d="M6 36c0-8 6-14 14-14s14 6 14 14"
                fill="#6b7280"
              />
            </svg>
          </div>
          <div>
            <h1 className="welcome-title">
              Welcome, {user?.full_name}!
            </h1>
            <p className="welcome-subtitle">Your journey begins here.</p>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="23" stroke="#374151" strokeWidth="2" />
                <path
                  d="M24 14v10M24 28v2M16 20h16"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2>No Courses or Modules Yet</h2>
            <button className="btn-create">Create Your First Module</button>
            <p className="empty-hint">
              Get started by building your deck of knowledge.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
