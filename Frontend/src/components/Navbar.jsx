import "./Navbar.css";
import LiveClock from "./LiveClock";

function Navbar() {

  return (

    <nav className="navbar">

      <div className="navbar-logo">

        <div className="logo-circle">
          ⏰
        </div>

        <div>

          <h2 >Deadline Guardian</h2>

          <span>AI Productivity Assistant</span>

        </div>

      </div>

      <ul className="navbar-links">

        <li><a href="/">Home</a></li>

        <li><a href="#features">Features</a></li>

        <li><a href="#task-form">Planner</a></li>

      </ul>

      <LiveClock/>

    </nav>

  );

}

export default Navbar;