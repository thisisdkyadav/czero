import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`layout ${darkMode ? "dark" : ""}`}>
      <header className="header">
        <NavLink to="/" className="logo">
          <span className="logo-text">CZero</span>
        </NavLink>
        <nav className="header-nav">
          <NavLink to="/getting-started">Docs</NavLink>
          <NavLink to="/components/button">Components</NavLink>
        </nav>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
