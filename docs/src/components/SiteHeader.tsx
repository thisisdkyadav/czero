import { NavLink, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./SiteHeader.css";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-brand" aria-label="czero home">
          <span className="site-mark" aria-hidden="true">0</span>
          <span className="site-wordmark">czero</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <NavLink to="/docs" className="site-nav-link" end>Docs</NavLink>
          <NavLink to="/docs/components/button" className="site-nav-link">Components</NavLink>
          <a
            href="https://github.com/thisisdkyadav/czero"
            target="_blank"
            rel="noopener noreferrer"
            className="site-nav-link"
          >
            GitHub
          </a>
        </nav>

        <div className="site-header-actions">
          <span className="site-version">v0.4.6</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
