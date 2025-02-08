const API_URL = process.env.REACT_APP_API_URL || "http://57.129.5.163:5000";

export const fetchSaves = async () => {
  try {
    const response = await fetch(`${API_URL}/saves`);
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des sauvegardes");
    }
    const data = await response.json();
    return data.saves;
  } catch (error) {
    console.error("Erreur API fetchSaves :", error);
    throw error;
  }
};

export const fetchSaveDetails = async (saveName) => {
  try {
    const response = await fetch(`${API_URL}/save/${saveName}`);
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des détails de la sauvegarde");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur API fetchSaveDetails :", error);
    throw error;
  }
};

export const fetchRSIData = async () => {
  try {
    const response = await fetch(`${API_URL}/rsi`);
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des données RSI");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API fetchRSIData :", error);
    throw error;
  }
};

