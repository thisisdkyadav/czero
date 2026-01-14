import { NavLink } from "react-router-dom";

const components = [
  { name: "Button", path: "/components/button" },
  { name: "Input", path: "/components/input" },
  { name: "Textarea", path: "/components/textarea" },
  { name: "Select", path: "/components/select" },
  { name: "Checkbox", path: "/components/checkbox" },
  { name: "Switch", path: "/components/switch" },
  { name: "RadioGroup", path: "/components/radio-group" },
  { name: "Label", path: "/components/label" },
  { name: "Card", path: "/components/card" },
  { name: "Badge", path: "/components/badge" },
  { name: "Avatar", path: "/components/avatar" },
  { name: "Separator", path: "/components/separator" },
  { name: "Alert", path: "/components/alert" },
  { name: "Dialog", path: "/components/dialog" },
  { name: "Tooltip", path: "/components/tooltip" },
  { name: "Progress", path: "/components/progress" },
  { name: "Skeleton", path: "/components/skeleton" },
  { name: "Spinner", path: "/components/spinner" },
  { name: "Tabs", path: "/components/tabs" },
  { name: "Accordion", path: "/components/accordion" },
  { name: "Table", path: "/components/table" },
  { name: "Breadcrumb", path: "/components/breadcrumb" },
  { name: "Stack", path: "/components/stack" },
  { name: "Grid", path: "/components/grid" },
  { name: "Container", path: "/components/container" },
  { name: "AspectRatio", path: "/components/aspect-ratio" },
  { name: "ScrollArea", path: "/components/scroll-area" },
  { name: "Code", path: "/components/code" },
  { name: "Kbd", path: "/components/kbd" },
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
