import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2L2 8l12 6 12-6-12-6zM2 20l12 6 12-6M2 14l12 6 12-6"
              stroke="#FF6B2B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>MEMORA</span>
        </div>
        <nav className="landing-nav">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
          <Link to="/login" className="nav-login">
            Log In
          </Link>
          <Link to="/signup" className="btn-signup-nav">
            SIGN UP
          </Link>
        </nav>
      </header>

      <main className="landing-hero">
        <h1>
          FORGE YOUR MEMORY.
          <br />
          DUEL WITH WORDS.
        </h1>

        <div className="hero-card">
          <div className="card-badge">VOCABULARY CHALLENGE</div>
          <p className="card-word">
            WORD: "<strong>AMELIORATE</strong>"
          </p>
          <p className="card-def">
            DEF: "<strong>TO MAKE BETTER</strong>"
          </p>
        </div>

        <p className="hero-subtitle">
          Turn rote learning into real-time battles.
        </p>

        <div className="hero-actions">
          <Link to="/signup" className="btn-primary">
            Get Started
          </Link>
          <a href="#about" className="btn-secondary">
            Learn More
          </a>
        </div>
      </main>

      <footer className="landing-footer">
        <Link to="/login">Log In</Link>
        <a href="#pricing">Pricing</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </footer>
    </div>
  );
}
