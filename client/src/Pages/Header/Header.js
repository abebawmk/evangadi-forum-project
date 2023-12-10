import { useEffect } from "react";
import { useUserContext } from "../../Context/UserContext";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header({ logout }) {
  const [userData] = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user]);
  return (
    <div className="header">
      <img
        src="/evangadi-logo.png"
        alt="Evangadi logo"
        className="header__logo"
      />
      <div className="header__link">
        <Link to="" className="header__link--text clear_link">
          Home
        </Link>
        <Link to="" className="header__link--text clear_link">
          How it Works
        </Link>
        {userData.user && userData.user !== "signup" ? (
          <Link className="header__link--text clear_link" onClick={logout}>
            Log out
          </Link>
        ) : (
          <button
            className="header__link--btn"
            onClick={() => {
              navigate("/signup");
            }}
          >
            SIGN IN
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
