const API_URL = process.env.REACT_APP_API_URL || "https://bot.crypteau.fr:5000";

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

export const fetchUserProfile = async () => {
  const response = await fetch("https://bot.crypteau.fr:5000/api/user/profile", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Utilisateur non authentifié");
  }

  const data = await response.json();
  console.log("User data:", data); // 🔥 Ajoute ce log pour voir la réponse de l’API
  return data;
};

export const fetchUserCryptos = async () => {
  const response = await fetch("https://bot.crypteau.fr:5000/api/user/cryptos", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des cryptos");
  }

  return response.json();
};

export const toggleCryptoStatus = async (crypto) => {
  const response = await fetch("https://bot.crypteau.fr:5000/api/user/cryptos/toggle", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ crypto }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors du changement de statut");
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

