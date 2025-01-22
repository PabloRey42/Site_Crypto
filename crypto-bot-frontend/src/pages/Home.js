import React, { useState, useEffect } from "react";
import { fetchSaves, fetchSaveDetails } from "../utils/api";
import SaveList from "../components/SaveList";
import SaveDetails from "../components/SaveDetails";

const Home = () => {
  const [saves, setSaves] = useState([]);
  const [selectedSave, setSelectedSave] = useState(null);
  const [error, setError] = useState("");

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

  const handleSelectSave = async (saveName) => {
    try {
      const save = await fetchSaveDetails(saveName);
      setSelectedSave(save);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <SaveList saves={saves} onSelect={handleSelectSave} />
      {selectedSave && <SaveDetails save={selectedSave} />}
    </div>
  );
};

export default Home;
