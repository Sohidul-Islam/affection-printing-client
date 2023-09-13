import { Stack, Typography } from "@mui/material";
import React from "react";

function ErrorPage() {
  return (
    <Stack
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      alignContent={"center"}
      alignItems={"center"}
    >
      <Typography variant="h2">404 Page</Typography>
      <Typography variant="h4">This page is not found</Typography>
    </Stack>
  );
}

export default ErrorPage;
