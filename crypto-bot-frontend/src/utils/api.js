const API_URL = process.env.REACT_APP_API_URL || "https://bot.crypteau.fr:5000";

// 🔹 Récupère le token JWT stocké dans les cookies
const getAuthToken = () => {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1];
};

// 🔹 Récupère le profil utilisateur
export const fetchUserProfile = async () => {
  try {
    const response = await fetch(`${API_URL}/api/user/profile`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`
      }
    });

    if (!response.ok) throw new Error("Utilisateur non authentifié");

    const data = await response.json();
    console.log("✅ User data:", data);
    return data;
  } catch (error) {
    console.error("❌ Erreur API fetchUserProfile :", error);
    throw error;
  }
};

// 🔹 Récupère les cryptos suivies avec leur statut `is_active`
export const fetchUserCryptos = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/user/cryptos/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}`
      }
    });

    if (!response.ok) throw new Error("Erreur lors de la récupération des cryptos");

    const data = await response.json();
    console.log("✅ Cryptos récupérées :", data);
    return data.cryptos || []; // Assure que l'on récupère toujours un tableau
  } catch (error) {
    console.error("❌ Erreur API fetchUserCryptos :", error);
    throw error;
  }
};

// 🔹 Active une crypto (Ajout)
export const addCrypto = async (cryptoSymbol) => {
  try {
    const response = await fetch(`${API_URL}/profile/cryptos/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ crypto: cryptoSymbol })
    });

    if (!response.ok) throw new Error("Erreur lors de l'ajout de la crypto");

    console.log(`✅ Crypto ${cryptoSymbol} activée avec succès !`);
  } catch (error) {
    console.error("❌ Erreur API addCrypto :", error);
    throw error;
  }
};

// 🔹 Désactive une crypto (Suppression)
export const removeCrypto = async (cryptoSymbol) => {
  try {
    const response = await fetch(`${API_URL}/profile/cryptos/remove`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ crypto: cryptoSymbol })
    });

    if (!response.ok) throw new Error("Erreur lors de la suppression de la crypto");

    console.log(`✅ Crypto ${cryptoSymbol} désactivée avec succès !`);
  } catch (error) {
    console.error("❌ Erreur API removeCrypto :", error);
    throw error;
  }
};

// 🔹 Récupère les sauvegardes disponibles
export const fetchSaves = async () => {
  try {
    const response = await fetch(`${API_URL}/saves`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`
      }
    });

    if (!response.ok) throw new Error("Erreur lors du chargement des sauvegardes");

    const data = await response.json();
    console.log("✅ Sauvegardes récupérées :", data);
    return data.saves || [];
  } catch (error) {
    console.error("❌ Erreur API fetchSaves :", error);
    throw error;
  }
};

// 🔹 Récupère les détails d’une sauvegarde spécifique
export const fetchSaveDetails = async (saveName) => {
  try {
    const response = await fetch(`${API_URL}/save/${saveName}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`
      }
    });

    if (!response.ok) throw new Error("Erreur lors du chargement des détails de la sauvegarde");

    const data = await response.json();
    console.log("✅ Détails de la sauvegarde :", data);
    return data;
  } catch (error) {
    console.error("❌ Erreur API fetchSaveDetails :", error);
    throw error;
  }
};

// 🔹 Récupère les données RSI
export const fetchRSIData = async () => {
  try {
    const response = await fetch(`${API_URL}/rsi`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${getAuthToken()}`
      }
    });

    if (!response.ok) throw new Error("Erreur lors du chargement des données RSI");

    const data = await response.json();
    console.log("✅ Données RSI reçues :", data);
    return data;
  } catch (error) {
    console.error("❌ Erreur API fetchRSIData :", error);
    throw error;
  }
};
