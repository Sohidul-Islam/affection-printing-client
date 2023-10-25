import { Box, IconButton, Stack, useTheme } from "@mui/material";
import React from "react";
import StyledInputForm from "../../../Common/Shared/StyledInputForm";
import { Cancel } from "@mui/icons-material";

function TopicsContainer({ topic, onChangeTopcisHandler, onDelete }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.custom.border}`,
        borderRadius: "7px",
        padding: "8px",
      }}
    >
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <IconButton
          size="small"
          sx={{ width: "16px", height: "16px" }}
          onClick={() => {
            onDelete(topic);
          }}
        >
          <Cancel />
        </IconButton>
      </Stack>
      <StyledInputForm
        label={"Topic Name"}
        type="normal"
        size="small"
        inputProps={{
          name: "title",
          placeholder: "Write your topic name here...",
          value: topic?.title,
          onChange: (e) => {
            onChangeTopcisHandler(e, topic);
          },
          // onChange: quatation,
        }}
      />
      <StyledInputForm
        label={"Description"}
        type="textarea"
        inputProps={{
          name: "desc",
          placeholder: "Write your description here...",
          multiline: true,
          maxRow: 4,
          value: topic?.desc,
          onChange: (e) => {
            onChangeTopcisHandler(e, topic);
          },
          sx: {
            height: "80px",
          },
        }}
      />
    </Box>
  );
}

export default TopicsContainer;
