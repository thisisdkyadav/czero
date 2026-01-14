import { NavLink } from "react-router-dom";

const components = [
  { name: "Button", path: "/components/button" },
  { name: "Input", path: "/components/input" },
  { name: "Textarea", path: "/components/textarea" },
  { name: "Checkbox", path: "/components/checkbox" },
  { name: "Switch", path: "/components/switch" },
  { name: "Card", path: "/components/card" },
  { name: "Badge", path: "/components/badge" },
  { name: "Avatar", path: "/components/avatar" },
  { name: "Separator", path: "/components/separator" },
  { name: "Alert", path: "/components/alert" },
  { name: "Tooltip", path: "/components/tooltip" },
  { name: "Progress", path: "/components/progress" },
  { name: "Skeleton", path: "/components/skeleton" },
  { name: "Tabs", path: "/components/tabs" },
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
