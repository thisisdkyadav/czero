import { Outlet, NavLink, Link } from "react-router-dom";
import { useTheme } from "../../../src/react/hooks/use-theme";
import "./LandingLayout.css";

export default function LandingLayout() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className={`landing-layout ${isDark ? "dark" : ""}`}>
      <header className="landing-header">
        <div className="landing-header-inner">
          <NavLink to="/" className="landing-logo">
            <span className="landing-logo-icon">◇</span>
            <span className="landing-logo-text">CZero</span>
          </NavLink>
          <nav className="landing-nav">
            <NavLink to="/docs" className="landing-nav-link">Docs</NavLink>
            <NavLink to="/docs/components/button" className="landing-nav-link">Components</NavLink>
            <a 
              href="https://github.com/thisisdkyadav/czero" 
              target="_blank" 
              rel="noopener noreferrer"
              className="landing-nav-link"
            >
              GitHub
            </a>
          </nav>
          <button className="landing-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </header>
      
      <main className="landing-main">
        <Outlet />
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-brand">
            <span className="landing-logo-icon">◇</span>
            <span className="landing-logo-text">CZero</span>
            <p className="landing-footer-tagline">Design-token-driven React components</p>
          </div>
          <div className="landing-footer-links">
            <div className="landing-footer-section">
              <h4>Documentation</h4>
              <Link to="/docs">Getting Started</Link>
              <Link to="/docs/components/button">Components</Link>
            </div>
            <div className="landing-footer-section">
              <h4>Resources</h4>
              <a href="https://github.com/thisisdkyadav/czero" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://github.com/thisisdkyadav/czero/issues" target="_blank" rel="noopener noreferrer">Issues</a>
            </div>
          </div>
        </div>
        <div className="landing-footer-bottom">
          <p>Built with ❤️ using CZero components</p>
        </div>
      </footer>
    </div>
  );
}

