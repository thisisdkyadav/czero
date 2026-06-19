import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import Sidebar from "./Sidebar";
import ThemeCustomizer from "./ThemeCustomizer";
import "./DocsLayout.css";

export default function DocsLayout() {
  return (
    <div className="docs-layout">
      <SiteHeader />
      <div className="docs-container">
        <Sidebar />
        <main className="docs-content">
          <Outlet />
        </main>
      </div>
      <ThemeCustomizer />
    </div>
  );
}
