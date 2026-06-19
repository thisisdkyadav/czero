import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import Sidebar from "./Sidebar";
import ThemeCustomizer from "./ThemeCustomizer";
import "./DocsLayout.css";

/** Track a media-query match (the rail only docks when there's room for it). */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

export default function DocsLayout() {
  const wide = useMediaQuery("(min-width: 1280px)");
  const [collapsed, setCollapsed] = useState(false); // user hid the docked rail
  const [drawerOpen, setDrawerOpen] = useState(false); // narrow-screen drawer

  const docked = wide && !collapsed;

  // Pill → re-dock on wide, open drawer on narrow.
  const handleOpen = () => (wide ? setCollapsed(false) : setDrawerOpen(true));
  // Header button → collapse the rail on wide, close the drawer on narrow.
  const handleClose = () => (wide ? setCollapsed(true) : setDrawerOpen(false));

  return (
    <div className={`docs-layout ${docked ? "rail-docked" : ""}`}>
      <SiteHeader />
      <div className="docs-container">
        <Sidebar />
        <main className="docs-content">
          <Outlet />
        </main>
      </div>
      <ThemeCustomizer docked={docked} open={drawerOpen} onOpen={handleOpen} onClose={handleClose} />
    </div>
  );
}
