import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        {isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />}
      </div>
    </div>
  );
};

export default App;
