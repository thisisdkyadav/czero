import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">
          <span className="highlight">CZero</span> UI
        </h1>
        <p className="hero-subtitle">
          A lightweight, design-token-driven React component library.
          <br />
          Built on Radix UI primitives with precompiled CSS.
        </p>
        <div className="hero-actions">
          <Link to="/getting-started" className="btn-primary">
            Get Started
          </Link>
          <Link to="/components/button" className="btn-secondary">
            View Components
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <span className="feature-icon">🎨</span>
          <h3>Design Token Driven</h3>
          <p>Entire look & feel controlled by a single config file.</p>
        </div>
        <div className="feature">
          <span className="feature-icon">⚡</span>
          <h3>Lightweight CSS</h3>
          <p>One compiled file, no runtime styles, tree-shakeable JS.</p>
        </div>
        <div className="feature">
          <span className="feature-icon">🌙</span>
          <h3>Dark Mode Ready</h3>
          <p>Add .dark class and all components adapt automatically.</p>
        </div>
        <div className="feature">
          <span className="feature-icon">♿</span>
          <h3>Accessible</h3>
          <p>Built on Radix UI primitives for keyboard and screen reader support.</p>
        </div>
      </section>
    </div>
  );
}
