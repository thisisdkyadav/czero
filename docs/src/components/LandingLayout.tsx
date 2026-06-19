import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../../../src/react/hooks/use-theme";
import SiteHeader from "./SiteHeader";
import "./LandingLayout.css";

export default function LandingLayout() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className={`landing-layout ${isDark ? "dark" : ""}`}>
      <SiteHeader />

      <main className="landing-main">
        <Outlet />
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-brand">
            <Link to="/" className="site-brand" aria-label="czero home">
              <span className="site-mark" aria-hidden="true">0</span>
              <span className="site-wordmark">czero</span>
            </Link>
            <p className="landing-footer-tagline">
              A design-token React library. Theme once — every component follows.
            </p>
          </div>

          <div className="landing-footer-cols">
            <div className="landing-footer-col">
              <span className="landing-footer-head">Documentation</span>
              <Link to="/docs">Getting started</Link>
              <Link to="/docs/components/button">Components</Link>
            </div>
            <div className="landing-footer-col">
              <span className="landing-footer-head">Resources</span>
              <a href="https://github.com/thisisdkyadav/czero" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://github.com/thisisdkyadav/czero/issues" target="_blank" rel="noopener noreferrer">Issues</a>
              <a href="https://www.npmjs.com/package/czero" target="_blank" rel="noopener noreferrer">npm</a>
            </div>
          </div>
        </div>

        <div className="landing-footer-bottom">
          <span>czero · MIT licensed</span>
          <span className="landing-footer-mono">npm i czero</span>
        </div>
      </footer>
    </div>
  );
}
