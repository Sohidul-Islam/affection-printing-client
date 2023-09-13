import { Menu } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";

import React from "react";
import LoginRegistration from "./LoginRegistration";
// import logosm from '../../../../assets/Image/logo sm.svg'

function TopBar({ setOpen }) {
  return (
    <Box sx={{ padding: { xs: "8px 20px", lg: "8px 40px" }, boxShadow: 3 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <Stack direction="row" alignContent="center" gap={3}>
          {/* <img alt="logo" src={logosm}/> */}
          <IconButton onClick={() => setOpen(true)}>
            <Menu />
          </IconButton>
        </Stack>

        <LoginRegistration />
      </Stack>
    </Box>
  );
}

export default TopBar;
