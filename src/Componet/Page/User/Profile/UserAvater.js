import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import { stringAvatar } from "../../Customers/UserAvater";

export default function UserAvater({ name, imageUrl, id, idStyle, nameStyle }) {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      gap={3}
      sx={{ width: "100%" }}
    >
      <Avatar
        {...stringAvatar(name || "primaryText", { sm: 60, md: 80 })}
        src={imageUrl}
      />
      <Stack>
        {name && (
          <Typography
            variant="body"
            sx={{
              ...(nameStyle || {}),
              fontSize: { sm: 16, md: 24 },
              fontWeight: 600,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              textTransform: "capitalize",

              cursor: "pointer",
            }}
          >
            {name || "primaryText"}
          </Typography>
        )}
        {id && (
          <Typography
            variant="body3"
            sx={{
              ...(idStyle || {}),
              fontSize: { sm: 12, md: 16 },
              fontWeight: 400,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              textTransform: "capitalize",

              cursor: "pointer",
            }}
          >
            {id || "id"}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
