import "./Footer.css";

function Footer() {

  return (

    <footer className="footer" id="about">

      <div className="footer-content">

        <h2>

          ⏰ Deadline Guardian AI

        </h2>

        <p>

          Your intelligent productivity companion that creates smart schedules,
          tracks progress and helps you never miss another deadline.

        </p>

        {/* <div className="footer-links">

          <a href="/">Home</a>

          <a href="#features">Features</a>

          <a href="https://github.com">
            GitHub
          </a>

        </div> */}

        <hr />

        <p className="copyright">

          © 2026 Deadline Guardian AI • Built with React + Node + Gemini AI

        </p>

      </div>

    </footer>

  );

}

export default Footer;