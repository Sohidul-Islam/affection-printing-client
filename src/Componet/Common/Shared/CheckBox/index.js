import { Box, Checkbox, Stack, Typography } from "@mui/material";
import React from "react";

function StyledCheckBox({ checked, onChange, label, sx, ...props }) {
  return (
    <Box>
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <Checkbox
          sx={{ ...(sx || {}) }}
          {...props}
          checked={checked}
          onChange={onChange}
        />
        <Typography variant="h5">{label}</Typography>
      </Stack>
    </Box>
  );
}

export default StyledCheckBox;
