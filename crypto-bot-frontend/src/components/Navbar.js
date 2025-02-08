import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <ul className="flex justify-between">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/login">Connexion</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
