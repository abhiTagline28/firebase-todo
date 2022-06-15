import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const NavBar = ({ user }) => {
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-wrapper blue">
        <Link to="/" className="brand-logo">
          Todo
        </Link>
        <ul id="nav-mobile" className="right">
          {user ? (
            <li>
              <button className="btn red" onClick={logout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
