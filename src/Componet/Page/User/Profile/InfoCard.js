import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

function InfoCard({ title, value }) {
  return (
    <Paper variant="outlined" elevation={2} sx={{ padding: "16px" }}>
      <Stack gap={1}>
        <Typography
          variant="h4"
          sx={{
            textTransform: "uppercase",
            fontSize: { xs: 12, sm: 12, md: 14 },
          }}
        >
          {title || "No title choosen"}
        </Typography>
        <Typography
          variant="body"
          sx={{ fontSize: { xs: 14, sm: 16, md: 24, fontWeight: 600 } }}
        >
          {value || "Not added yet"}
        </Typography>
      </Stack>
    </Paper>
  );
}

export default InfoCard;
