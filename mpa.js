import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>
      <h1>🏠 Home Page</h1>
      <p>Welcome to the Multi-Page SPA built using React Router.</p>
    </div>
  );
}

function About() {
  return (
    <div style={styles.page}>
      <h1>ℹ About Page</h1>
      <p>This application demonstrates multi-page navigation without reload.</p>
    </div>
  );
}

function Contact() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <h1>📞 Contact Page</h1>
      <p>Click the button below to go back programmatically.</p>
      <button style={styles.button} onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
}

function NotFound() {
  return (
    <div style={styles.page}>
      <h1>404 ❌</h1>
      <p>Page Not Found</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={styles.navbar}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "15px",
    backgroundColor: "#222",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  page: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "15px",
  },
};

export default App;
