import React from "react";

const SaveDetails = ({ save }) => {
  return (
    <div>
      <h2>Détails de la sauvegarde : {save.name}</h2>
      <pre
        style={{
          backgroundColor: "#f4f4f4",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {JSON.stringify(save, null, 2)}
      </pre>
    </div>
  );
};

export default SaveDetails;
