import React from "react";
import { Button, List, ListItem, Typography } from "@mui/material";

const SaveList = ({ saves, onSelect }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Liste des sauvegardes
      </Typography>
      <List>
        {saves.map((save, index) => (
          <ListItem key={index}>
            <Typography variant="body1">{save}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSelect(save)}
              style={{ marginLeft: "10px" }}
            >
              Détails
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SaveList;
