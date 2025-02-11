import React, { useState, useEffect } from "react";
import { fetchSaves, fetchSaveDetails, fetchRSIData, fetchUserProfile } from "../utils/api";
import SaveList from "../components/SaveList";
import SaveDetails from "../components/SaveDetails";
import { useNavigate } from "react-router-dom";
import "./css/Dashboard.css"; // Import du CSS

const Dashboard = () => {
  const [saves, setSaves] = useState([]); // Liste des sauvegardes
  const [selectedSave, setSelectedSave] = useState(null); // Détails de la sauvegarde sélectionnée
  const [rsiData, setRsiData] = useState([]); // Données RSI des cryptos
  const [error, setError] = useState(""); // Gestion des erreurs
  const [user, setUser] = useState(null); // Informations de l'utilisateur
  const navigate = useNavigate();

  // Vérifie l'authentification et charge les données
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await fetchUserProfile();
        console.log("Profil utilisateur :", userData);
        setUser(userData);
      } catch (err) {
        navigate("/login");
      }
    };

    checkAuth();
    loadSaves();
    loadRSIData();
  }, []);

  // Charge la liste des sauvegardes
  const loadSaves = async () => {
    try {
      const data = await fetchSaves();
      setSaves(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Charge les détails d'une sauvegarde spécifique
  const handleSelectSave = async (saveName) => {
    try {
      const save = await fetchSaveDetails(saveName);
      setSelectedSave(save);
    } catch (err) {
      setError(err.message);
    }
  };

  // Charge les données RSI des cryptos
  const loadRSIData = async () => {
    try {
      const data = await fetchRSIData();
      const formattedData = Object.keys(data).map((key) => ({
        symbol: key,
        ...data[key],
      }));
      setRsiData(formattedData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="dashboard">
      {error && <p className="error-message">{error}</p>}

      {/* En-tête du Dashboard */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Tableau de Bord</h1>
          {user && (
            <p className="welcome-text">
              Bienvenue, {user.name} {user.surname} 👋
              <br />
              <span className="user-role">Rôle : {user.role}</span>
            </p>
          )}
        </div>

        <button className="settings-btn" onClick={() => navigate("/settings")}>
          ⚙️ Settings
        </button>
      </header>

      <div className="dashboard-content">
        {/* Liste des sauvegardes */}
        <div className="dashboard-section">
          <h2>Mes Sauvegardes</h2>
          <SaveList saves={saves} onSelect={handleSelectSave} />
        </div>

        {/* Détails de la sauvegarde sélectionnée */}
        {selectedSave && (
          <div className="dashboard-section save-details">
            <h2>Détails de la Sauvegarde</h2>
            <SaveDetails save={selectedSave} />
          </div>
        )}

        {/* Tableau RSI */}
        <div className="dashboard-section">
          <h2>Données RSI des Cryptos</h2>
          <div className="rsi-container">
            {rsiData.length > 0 ? (
              <table className="rsi-table">
                <thead>
                  <tr>
                    <th>Symbole</th>
                    <th>RSI</th>
                    <th>Prix de clôture</th>
                    <th>Dernière mise à jour</th>
                  </tr>
                </thead>
                <tbody>
                  {rsiData.map((crypto) => (
                    <tr key={crypto.symbol}>
                      <td>{crypto.symbol}</td>
                      <td>{crypto.RSI ? crypto.RSI.toFixed(2) : "Non calculé"}</td>
                      <td>{crypto.close ? crypto.close.toFixed(2) : "Non disponible"}</td>
                      <td>{crypto.timestamp || "Non disponible"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">Aucune donnée RSI disponible.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
