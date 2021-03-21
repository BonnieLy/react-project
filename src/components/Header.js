import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import firebase from "../config/firebase";
import AppContext from "../store/AppContext";

export default function Header() {
  const [isLoggedIn] = useContext(AppContext);

  function onLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="bg-gray-900 text-white p-5 flex justify-between">
      <ul className="flex">
        <li className="mr-5">
          <NavLink to="/" activeClassName="underline" exact>
            Home
          </NavLink>
        </li>
        <li className="mr-5">
          <NavLink to="/gallery" activeClassName="underline" exact>
            Gallery
          </NavLink>
        </li>
      </ul>

      <ul className="flex">
        <li className="mr-5">
          {isLoggedIn ? (
            <button onClick={onLogout}>Logout</button>
          ) : (
            <NavLink to="/login" activeClassName="underline" exact>
              Login
            </NavLink>
          )}
        </li>
        {!isLoggedIn && (
          <li className="mr-5">
            <NavLink to="/register" activeClassName="underline" exact>
              Register
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
