import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./DocsLayout.css";

export default function DocsLayout() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`docs-layout ${darkMode ? "dark" : ""}`}>
      <header className="docs-header">
        <div className="docs-header-inner">
          <NavLink to="/" className="docs-logo">
            <span className="docs-logo-icon">◇</span>
            <span className="docs-logo-text">CZero</span>
          </NavLink>
          <nav className="docs-nav">
            <NavLink to="/docs" end className="docs-nav-link">Docs</NavLink>
            <NavLink to="/docs/components/button" className="docs-nav-link">Components</NavLink>
            <a 
              href="https://github.com/thisisdkyadav/czero" 
              target="_blank" 
              rel="noopener noreferrer"
              className="docs-nav-link"
            >
              GitHub
            </a>
          </nav>
          <button className="docs-theme-toggle" onClick={toggleDarkMode} aria-label="Toggle theme">
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>
      <div className="docs-container">
        <Sidebar />
        <main className="docs-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
