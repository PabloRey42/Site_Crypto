import React, { useState, useEffect } from "react";
import { fetchUserCryptos, toggleCryptoStatus } from "../utils/api";
import "./css/Settings.css"; // Assure-toi d'avoir ce fichier CSS

const Settings = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        const data = await fetchUserCryptos();
        setCryptos(data);
      } catch (err) {
        console.error("Erreur chargement cryptos:", err);
      }
    };

    loadCryptos();
  }, []);

  const handleToggle = async (crypto) => {
    try {
      await toggleCryptoStatus(crypto);
      setCryptos((prev) =>
        prev.map((c) =>
          c.symbol === crypto ? { ...c, is_active: !c.is_active } : c
        )
      );
    } catch (err) {
      console.error("Erreur changement de statut:", err);
    }
  };

  return (
    <div className="settings-container">
      <h1>Paramètres des Cryptos</h1>
      <ul className="crypto-list">
        {cryptos.map((crypto) => (
          <li key={crypto.symbol} className="crypto-item">
            <span>{crypto.symbol}</span>
            <button
              className={`toggle-btn ${crypto.is_active ? "active" : "inactive"}`}
              onClick={() => handleToggle(crypto.symbol)}
            >
              {crypto.is_active ? "✔️ Activé" : "❌ Désactivé"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Settings;
