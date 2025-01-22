import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Home />
      </div>
    </div>
  );
};

export default App;
