import React, { useState, useEffect } from "react";
import { fetchSaves, fetchSaveDetails, fetchRSIData } from "../utils/api";
import SaveList from "../components/SaveList";
import SaveDetails from "../components/SaveDetails";
import PortfolioChart from "../components/PortfolioChart";


const Home = () => {
  const [saves, setSaves] = useState([]); // Liste des sauvegardes
  const [selectedSave, setSelectedSave] = useState(null); // Détails de la sauvegarde sélectionnée
  const [rsiData, setRsiData] = useState([]); // Données RSI des cryptos
  const [sorted, setSorted] = useState(false); // État trié ou non
  const [error, setError] = useState(""); // Gestion des erreurs

  // Charger la liste des sauvegardes à l'initialisation
  useEffect(() => {
    const loadSaves = async () => {
      try {
        const data = await fetchSaves();
        setSaves(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadSaves();
  }, []);

  // Charger les détails d'une sauvegarde spécifique
  const handleSelectSave = async (saveName) => {
    try {
      const save = await fetchSaveDetails(saveName);
      setSelectedSave(save);
    } catch (err) {
      setError(err.message);
    }
  };

  // Charger les données RSI depuis l'API
  const handleFetchRSIData = async () => {
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

  // Trier les cryptos par RSI (du plus élevé au plus bas)
  const handleSortRSI = () => {
    const sortedData = [...rsiData].sort((a, b) => b.RSI - a.RSI);
    setRsiData(sortedData);
    setSorted(true);
  };

  // Réinitialiser le tri et recharger les données RSI
  const handleResetRSI = async () => {
    await handleFetchRSIData();
    setSorted(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-5">
      🍆 Alexandre suce ma bite
      </h1>

      {/* Afficher un message d'erreur si nécessaire */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* Liste des sauvegardes */}
      <SaveList saves={saves} onSelect={handleSelectSave} />
      
      {/* Détails de la sauvegarde sélectionnée */}
      {selectedSave && (
        <div>
          <SaveDetails save={selectedSave} />
          <PortfolioChart portfolio={selectedSave.portfolio} />
        </div>
      )}
      {/* Section des données RSI */}
      <div style={{ marginTop: "20px" }}>
        <h2>Données RSI des Cryptos</h2>
        <button
          onClick={handleFetchRSIData}
          style={{
            marginRight: "10px",
            padding: "10px 15px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Charger les données RSI
        </button>
        <button
          onClick={handleSortRSI}
          style={{
            marginRight: "10px",
            padding: "10px 15px",
            backgroundColor: sorted ? "#6c757d" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: sorted ? "not-allowed" : "pointer",
          }}
          disabled={sorted}
        >
          Trier par RSI
        </button>
        {sorted && (
          <button
            onClick={handleResetRSI}
            style={{
              padding: "10px 15px",
              backgroundColor: "#ffc107",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Réinitialiser
          </button>
        )}
        
        {/* Tableau des cryptos et leurs RSI */}
        <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>Symbole</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Prix de clôture</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>RSI</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Dernière mise à jour</th>
            </tr>
          </thead>
          <tbody>
            {rsiData.map((crypto) => (
              <tr key={crypto.symbol}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{crypto.symbol}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {crypto.close ? crypto.close.toFixed(2) : "Non disponible"}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {crypto.RSI ? crypto.RSI.toFixed(2) : "Non calculé"}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{crypto.timestamp || "Non disponible"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
