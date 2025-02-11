import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../utils/api"; // Assure-toi que cette fonction récupère le rôle
import "./css/Navbar.css"; // Import du CSS

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUserProfile();
        setUser(userData);
      } catch (err) {
        setUser(null);
      }
    };

    getUser();
  }, []);

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><Link to="/dashboard">Accueil</Link></li>
        {user ? (
          <>
            {user.role === "admin" && <li><Link to="/admin">Admin</Link></li>}
            <li>
              <Link to="/profile" className="profile-btn">👤 Profil</Link>
            </li>
          </>
        ) : (
          <li><Link to="/login">Connexion</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
