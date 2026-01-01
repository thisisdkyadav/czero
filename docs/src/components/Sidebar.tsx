import { NavLink } from "react-router-dom";

const components = [
  { name: "Button", path: "/components/button" },
  { name: "Input", path: "/components/input" },
  { name: "Card", path: "/components/card" },
  { name: "Badge", path: "/components/badge" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Getting Started</div>
        <div className="sidebar-links">
          <NavLink to="/getting-started">Introduction</NavLink>
        </div>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-title">Components</div>
        <div className="sidebar-links">
          {components.map((c) => (
            <NavLink key={c.path} to={c.path}>
              {c.name}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
}
