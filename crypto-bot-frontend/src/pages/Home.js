import React, { useState, useEffect } from "react";
import { fetchSaves, fetchSaveDetails, fetchRSIData } from "../utils/api";
import SaveList from "../components/SaveList";
import SaveDetails from "../components/SaveDetails";

const Home = () => {
  const [saves, setSaves] = useState([]); // Liste des sauvegardes
  const [selectedSave, setSelectedSave] = useState(null); // Détails de la sauvegarde sélectionnée
  const [rsiData, setRsiData] = useState([]); // Données RSI des cryptos
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
  const loadRSIData = async () => {
    try {
      const data = await fetchRSIData();
      // Supposons que data soit un objet avec des clés comme le symbole de la crypto.
      // Par exemple : { "BTC/USDT": { RSI: 45.2, timestamp: "2023-02-01T12:00:00Z", close: 31000 }, ... }
      const formattedData = Object.keys(data).map((key) => ({
        symbol: key,
        ...data[key],
      }));
      setRsiData(formattedData);
    } catch (err) {
      setError(err.message);
    }
  };

  // Charger les données RSI dès le chargement de la page
  useEffect(() => {
    loadRSIData();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* Liste des sauvegardes */}
      <SaveList saves={saves} onSelect={handleSelectSave} />
      
      {/* Détails de la sauvegarde sélectionnée */}
      {selectedSave && (
        <div>
          <SaveDetails save={selectedSave} />
          {/* Si ton objet "selectedSave" contient un portefeuille, tu peux aussi afficher un graphique ici */}
        </div>
      )}

      {/* Section pour afficher le tableau des données RSI */}
      <div style={{ marginTop: "20px" }}>
        <h2>Données RSI des Cryptos</h2>
        {rsiData.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>Symbole</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>RSI</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Prix de clôture</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Dernière mise à jour</th>
              </tr>
            </thead>
            <tbody>
              {rsiData.map((crypto) => (
                <tr key={crypto.symbol}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{crypto.symbol}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {crypto.RSI ? crypto.RSI.toFixed(2) : "Non calculé"}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {crypto.close ? crypto.close.toFixed(2) : "Non disponible"}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {crypto.timestamp || "Non disponible"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: "gray" }}>Aucune donnée RSI disponible.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
