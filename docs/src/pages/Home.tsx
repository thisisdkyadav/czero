import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-glow-1"></div>
          <div className="hero-glow-2"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-icon">✨</span>
            <span>Design Token Driven</span>
          </div>
          <h1 className="hero-title">
            Build beautiful React apps with
            <span className="hero-title-highlight"> CZero</span>
          </h1>
          <p className="hero-subtitle">
            A lightweight, accessible component library powered by design tokens.
            <br />
            One config file. One CSS output. Infinite possibilities.
          </p>
          <div className="hero-actions">
            <Link to="/docs" className="hero-btn hero-btn-primary">
              <span>Get Started</span>
              <span className="hero-btn-icon">→</span>
            </Link>
            <Link to="/docs/components/button" className="hero-btn hero-btn-secondary">
              Browse Components
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">33+</span>
              <span className="hero-stat-label">Components</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-value">0</span>
              <span className="hero-stat-label">Runtime Dependencies</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-value">100%</span>
              <span className="hero-stat-label">Accessible</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-header">
          <h2 className="features-title">Why CZero?</h2>
          <p className="features-subtitle">Everything you need to build modern, accessible UIs</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🎨</span>
            </div>
            <h3>Design Token Driven</h3>
            <p>Control your entire design system from a single config file. Colors, spacing, typography – all in one place.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">⚡</span>
            </div>
            <h3>Zero Runtime CSS</h3>
            <p>No CSS-in-JS overhead. Compile once, ship a single lightweight CSS file. Your users will thank you.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🌙</span>
            </div>
            <h3>Dark Mode Ready</h3>
            <p>Built-in dark mode support. Just add a class and watch your entire UI adapt seamlessly.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">♿</span>
            </div>
            <h3>Accessible by Default</h3>
            <p>Built on Radix UI primitives. Keyboard navigation, screen reader support, and ARIA compliance out of the box.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">📦</span>
            </div>
            <h3>Tree Shakeable</h3>
            <p>Import only what you need. ESM and CJS builds ensure optimal bundle sizes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🔧</span>
            </div>
            <h3>Fully Customizable</h3>
            <p>Override any token to match your brand. Create custom themes without touching component code.</p>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="quickstart">
        <div className="quickstart-content">
          <h2 className="quickstart-title">Get started in seconds</h2>
          <p className="quickstart-subtitle">Install CZero and start building beautiful interfaces</p>
          <div className="quickstart-steps">
            <div className="quickstart-step">
              <div className="quickstart-step-number">1</div>
              <div className="quickstart-step-content">
                <h4>Install the package</h4>
                <pre className="quickstart-code">
                  <code>npm install czero</code>
                </pre>
              </div>
            </div>
            <div className="quickstart-step">
              <div className="quickstart-step-number">2</div>
              <div className="quickstart-step-content">
                <h4>Import styles & components</h4>
                <pre className="quickstart-code">
                  <code>{`import "czero/styles.css";
import { Button, Card } from "czero/react";`}</code>
                </pre>
              </div>
            </div>
            <div className="quickstart-step">
              <div className="quickstart-step-number">3</div>
              <div className="quickstart-step-content">
                <h4>Build something amazing</h4>
                <pre className="quickstart-code">
                  <code>{`<Card>
  <Button variant="primary">
    Let's go! 🚀
  </Button>
</Card>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component Preview Section */}
      <section className="preview">
        <div className="preview-header">
          <h2 className="preview-title">33+ Beautiful Components</h2>
          <p className="preview-subtitle">From buttons to dialogs, everything you need</p>
        </div>
        <div className="preview-grid">
          <div className="preview-item">
            <span className="preview-item-icon">🔘</span>
            <span>Buttons</span>
          </div>
          <div className="preview-item">
            <span className="preview-item-icon">📝</span>
            <span>Forms</span>
          </div>
          <div className="preview-item">
            <span className="preview-item-icon">🃏</span>
            <span>Cards</span>
          </div>
          <div className="preview-item">
            <span className="preview-item-icon">💬</span>
            <span>Dialogs</span>
          </div>
          <div className="preview-item">
            <span className="preview-item-icon">📊</span>
            <span>Tables</span>
          </div>
          <div className="preview-item">
            <span className="preview-item-icon">🔔</span>
            <span>Toasts</span>
          </div>
          <div className="preview-item">
            <span className="preview-item-icon">📑</span>
            <span>Tabs</span>
          </div>
          <div className="preview-item">
            <span className="preview-item-icon">⏳</span>
            <span>Progress</span>
          </div>
        </div>
        <Link to="/docs/components/button" className="preview-cta">
          Explore all components →
        </Link>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to build something amazing?</h2>
          <p>Start using CZero today and create beautiful, accessible React applications.</p>
          <div className="cta-actions">
            <Link to="/docs" className="hero-btn hero-btn-primary">
              Read the Docs
            </Link>
            <a 
              href="https://github.com/thisisdkyadav/czero" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero-btn hero-btn-secondary"
            >
              Star on GitHub ⭐
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
