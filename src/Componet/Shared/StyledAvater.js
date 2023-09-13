import { Height } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

function StyledAvater({ src, title }) {
  return (
    <Stack direction={"row"} gap={"8px"} alignItems={"center"}>
      <Avatar sx={{width:"40px" ,height:"40px"}} src={src} >{title.charAt(0)}</Avatar>
      <Typography variant="body1" sx={{color:"primary.main",fontWeight:"600"}}>{title}</Typography>
    </Stack>
  );
}

export default StyledAvater;
