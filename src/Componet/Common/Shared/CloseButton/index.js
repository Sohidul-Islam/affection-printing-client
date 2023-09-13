import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

function CloseButton({ onClick }) {
  return (
    <IconButton onClick={onClick}>
      <Close />
    </IconButton>
  );
}

export default CloseButton;
