import { Close } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import CloseButton from "../Shared/CloseButton";

function SideBarContainer({ title, onClose, children }) {
  const theme = useTheme();
  return (
    <Box sx={{ width: "300px", padding: "0px 0px" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          position: "sticky",
          padding: "20px 10px",
          top: "0px",
          left: 0,
          zIndex: "99",
          background: theme.palette.primary.contrastText,
        }}
      >
        <Typography variant="h5">{title}</Typography>
        <CloseButton onClick={onClose} />
      </Stack>
      <Box sx={{ padding: "0px 20px" }}>{children}</Box>
    </Box>
  );
}

export default SideBarContainer;
