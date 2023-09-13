import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

export function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name, wh = { sm: 40, md: 56, lg: 67 }) {
  let chracter = "";

  if (name?.split(" ").length > 1) {
    chracter = `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`;
  } else {
    chracter = `${name?.split(" ")[0][0]}`;
  }

  const finalName = chracter?.toUpperCase();

  return {
    sx: {
      bgcolor: stringToColor(name),
      width: wh,
      height: wh,
    },
    children: finalName,
  };
}

function UserAvater({
  primaryText,
  secondaryText,
  tertiaryText,
  styleForPrimaryText = {},
  styleForSecondaryText = {},
  styleForTertiaryText = {},
  onClickPrimaryText,
}) {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      gap={3}
      sx={{ width: "100%" }}
    >
      <Avatar {...stringAvatar(primaryText || "primaryText")} />
      <Stack>
        {primaryText && (
          <Typography
            variant="body"
            onClick={() => {
              if (onClickPrimaryText) {
                onClickPrimaryText();
              }
            }}
            sx={{
              ...(styleForPrimaryText || {}),
              fontSize: { sm: 12, md: 16 },
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              textTransform: "capitalize",
              color: theme.palette.primary?.main,
              cursor: "pointer",
            }}
          >
            {primaryText || "primaryText"}
          </Typography>
        )}

        {secondaryText && (
          <Typography
            variant="body3"
            sx={{
              ...(styleForSecondaryText || {}),
              fontSize: { sm: 12, md: 14 },
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            {secondaryText || "secondaryText"}
          </Typography>
        )}
        {tertiaryText && (
          <Typography
            variant="body3"
            sx={{
              ...(styleForTertiaryText || {}),
              fontSize: { sm: 12, md: 14 },
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            {tertiaryText || "tertiaryText"}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

export default UserAvater;
