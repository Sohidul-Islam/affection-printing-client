import { Close } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import CloseButton from "../Shared/CloseButton";

function ModalContainer({ title, children, onClose }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "96vw",
        height: "96vh",
        borderRadius: "10px",
        overflow: "hidden",
        // padding: "40px",
        background: theme.palette.primary.contrastText,
        padding: "0px 0px",
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            position: "sticky",
            padding: "20px 20px",
            top: "0px",
            left: 0,
            zIndex: "99",
            // flex: 0.1,
            //   background: "red",
            background: theme.palette.primary.contrastText,
          }}
        >
          <Typography variant="h3">{title}</Typography>
          <CloseButton onClick={onClose} />
        </Stack>
        <Box
          sx={{
            padding: {
              xs: "0px 12px",
              sm: "0px 16px",
              md: "0px 20px",
              lg: "0px 20px",
            },
            marginBottom: "20px",
            overflow: "hidden",
            // background: "red",
            flex: 1,
          }}
        >
          {children}
        </Box>
      </Stack>
    </Box>
  );
}

export default ModalContainer;
