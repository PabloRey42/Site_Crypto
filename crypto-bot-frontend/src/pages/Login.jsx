import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css"; // Import du style

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://bot.crypteau.fr:5000/login", {  // 🔥 Assure-toi que l'API tourne sur HTTPS sans port spécifique
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"  // 🚀 Important : envoie les cookies avec la requête
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Échec de la connexion");
      }

      // ✅ Pas besoin de stocker le token, il est dans le cookie HTTP-Only !
      navigate("/dashboard");  // 🔄 Redirection après connexion
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
