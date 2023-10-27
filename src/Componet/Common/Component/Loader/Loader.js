import { Box, Stack } from "@mui/material";
import React from "react";

import loader from "../../../../assets/loader.gif";
import LoaderText from "./LoaderText";

function Loader() {
  return (
    <Stack
      height='80vh'
      alignItems='center'
      alignContent={"center"}
      justifyContent='center'
    >
      <Stack
        sx={{
          position: "relative",
          left: 0,
          height: "100%",
          backgroundColor: "red",
        }}
      >
        <img
          src={loader}
          alt='Loading'
          style={{
            width: "250px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, 0%)",
          }}
        >
          <LoaderText />
        </Box>
      </Stack>
    </Stack>
  );
}

export default Loader;
