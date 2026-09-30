import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">

      <div className="header-logo">
        <Link to="/">
          AI INTERVIEWER
        </Link>
      </div>

      <nav className="header-nav">

        <Link to="/">
          Home
        </Link>

        <Link to="/setup">
          Start Interview
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/history">
          History
        </Link>

      </nav>

    </header>
  );
}

export default Header;