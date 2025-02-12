import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, fetchUserCryptos, addCrypto, removeCrypto } from "../utils/api";
import "./css/Settings.css";

const Settings = () => {
  const [cryptos, setCryptos] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Charge le profil utilisateur
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userData = await fetchUserProfile();
        console.log("✅ Profil utilisateur récupéré :", userData);
        setUser(userData);
      } catch (err) {
        console.error("❌ Erreur chargement profil :", err);
        navigate("/login");
      }
    };

    loadUserProfile();
  }, [navigate]);

  // 🔹 Charge les cryptos suivies une fois l'utilisateur chargé
  useEffect(() => {
    if (!user) {
      console.error("❌ Aucun utilisateur trouvé, impossible de récupérer les cryptos !");
      return;
    }

    const loadCryptos = async () => {
      try {
        console.log(`📡 Récupération des cryptos pour l'utilisateur ID: ${user.user_id}...`);
        const userCryptos = await fetchUserCryptos(user.user_id);
        console.log("✅ Cryptos récupérées :", userCryptos);
        setCryptos(userCryptos || []);
      } catch (error) {
        console.error("❌ Erreur chargement cryptos :", error);
        setError("Erreur lors du chargement des cryptos suivies.");
      }
    };

    loadCryptos();
  }, [user]);

  // 🔹 Active ou désactive une crypto
  const toggleCrypto = async (crypto) => {
    console.log(`🔄 Tentative de changement de statut pour ${crypto.symbol}...`);

    try {
      if (crypto.is_active) {
        await removeCrypto(crypto.symbol);
      } else {
        await addCrypto(crypto.symbol);
      }

      // ✅ Mise à jour de l'état local sans recharger l'API
      setCryptos((prevCryptos) =>
        prevCryptos.map((c) =>
          c.symbol === crypto.symbol ? { ...c, is_active: !c.is_active } : c
        )
      );

      console.log(`✅ Crypto ${crypto.symbol} mise à jour avec succès !`);
    } catch (err) {
      console.error(`❌ Erreur toggle crypto :`, err);
      setError("Erreur lors du changement de statut de la crypto.");
    }
  };

  return (
    <div className="settings-page">
      <h1>Paramètres des Cryptos</h1>
      {error && <p className="error-message">{error}</p>}
      {!user ? (
        <p className="error-message">Utilisateur non trouvé</p>
      ) : cryptos.length === 0 ? (
        <p>Aucune crypto suivie.</p>
      ) : (
        <ul className="crypto-list">
          {cryptos.map((crypto) => (
            <li key={crypto.symbol} className="crypto-item">
              <span>{crypto.symbol}</span>
              <button
                onClick={() => toggleCrypto(crypto)}
                style={{
                  backgroundColor: crypto.is_active ? "green" : "red",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {crypto.is_active ? "Désactiver" : "Activer"}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Retour au Dashboard
      </button>
    </div>
  );
};

export default Settings;
