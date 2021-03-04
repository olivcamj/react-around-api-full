import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ text, link, loggedIn, onSignOut }) {
  const userLinks = () => {
    return (
      <ul className="header__nav">
        <li className="header__link">{`${text}`}</li>
        <li className="header__link" onClick={onSignOut}>
          Log out
        </li>
      </ul>
    );
  };
  const DefaultNav = () => {
    return (
      <div className="header__nav">
        <Link className="header__link" to={{pathname:`${link}`}}>
          {text}
        </Link>
      </div>
    );
  };
  return (
    <header className="header section">
      <img src={logo} alt="Around the U.S." className="header__logo" />
      {loggedIn ? userLinks() : DefaultNav() }
    </header>
  );
}

export default Header;
