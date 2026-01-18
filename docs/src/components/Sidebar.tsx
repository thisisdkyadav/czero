import { NavLink } from "react-router-dom";

const componentCategories = [
  {
    title: "Forms",
    components: [
      { name: "Button", path: "/docs/components/button" },
      { name: "Input", path: "/docs/components/input" },
      { name: "Textarea", path: "/docs/components/textarea" },
      { name: "Select", path: "/docs/components/select" },
      { name: "Checkbox", path: "/docs/components/checkbox" },
      { name: "Switch", path: "/docs/components/switch" },
      { name: "RadioGroup", path: "/docs/components/radio-group" },
      { name: "Label", path: "/docs/components/label" },
    ],
  },
  {
    title: "Display",
    components: [
      { name: "Card", path: "/docs/components/card" },
      { name: "Badge", path: "/docs/components/badge" },
      { name: "Tag", path: "/docs/components/tag" },
      { name: "Avatar", path: "/docs/components/avatar" },
      { name: "Separator", path: "/docs/components/separator" },
      { name: "Code", path: "/docs/components/code" },
      { name: "Kbd", path: "/docs/components/kbd" },
    ],
  },
  {
    title: "Overlay",
    components: [
      { name: "Dialog", path: "/docs/components/dialog" },
      { name: "DropdownMenu", path: "/docs/components/dropdown-menu" },
      { name: "Tooltip", path: "/docs/components/tooltip" },
    ],
  },
  {
    title: "Feedback",
    components: [
      { name: "Alert", path: "/docs/components/alert" },
      { name: "Toast", path: "/docs/components/toast" },
      { name: "Progress", path: "/docs/components/progress" },
      { name: "Skeleton", path: "/docs/components/skeleton" },
      { name: "Spinner", path: "/docs/components/spinner" },
    ],
  },
  {
    title: "Navigation",
    components: [
      { name: "Tabs", path: "/docs/components/tabs" },
      { name: "Accordion", path: "/docs/components/accordion" },
      { name: "Breadcrumb", path: "/docs/components/breadcrumb" },
    ],
  },
  {
    title: "Data",
    components: [
      { name: "Table", path: "/docs/components/table" },
    ],
  },
  {
    title: "Layout",
    components: [
      { name: "Stack", path: "/docs/components/stack" },
      { name: "Grid", path: "/docs/components/grid" },
      { name: "Container", path: "/docs/components/container" },
      { name: "AspectRatio", path: "/docs/components/aspect-ratio" },
      { name: "ScrollArea", path: "/docs/components/scroll-area" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Getting Started</div>
        <div className="sidebar-links">
          <NavLink to="/docs" end>Introduction</NavLink>
          <NavLink to="/docs/presets">Presets</NavLink>
        </div>
      </div>
      {componentCategories.map((category) => (
        <div key={category.title} className="sidebar-section">
          <div className="sidebar-title">{category.title}</div>
          <div className="sidebar-links">
            {category.components.map((c) => (
              <NavLink key={c.path} to={c.path}>
                {c.name}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
