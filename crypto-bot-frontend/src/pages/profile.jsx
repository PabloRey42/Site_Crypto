import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../utils/api";
import "./css/Profile.css"; // Assure-toi d’avoir ce fichier CSS

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUserProfile();
        setUser(userData);
      } catch (err) {
        navigate("/login"); // Redirige vers login si l'utilisateur n'est pas connecté
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("https://bot.crypteau.fr:5000/logout", {
        method: "POST",
        credentials: "include"
      });
  
      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
    }
  };

  return (
    <div className="profile-container">
      <h1>Mon Profil</h1>
      {user ? (
        <div className="profile-details">
          <p><strong>Nom :</strong> {user.name}</p>
          <p><strong>Prénom :</strong> {user.surname}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Rôle :</strong> {user.role}</p>

          <div className="profile-actions">
            <button onClick={() => navigate("/dashboard")} className="dashboard-btn">
              Retour au Dashboard
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </div>
        </div>
      ) : (
        <p>Chargement des informations...</p>
      )}
    </div>
  );
};

export default Profile;
