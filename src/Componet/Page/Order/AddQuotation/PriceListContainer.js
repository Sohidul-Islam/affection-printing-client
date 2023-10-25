import { Cancel } from "@mui/icons-material";
import { Box, IconButton, Stack, useTheme } from "@mui/material";
import React from "react";
import StyledInputForm from "../../../Common/Shared/StyledInputForm";

function PriceListContainer({ price, onChangePriceHandler, onDelete }) {
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
            onDelete(price);
          }}
        >
          <Cancel />
        </IconButton>
      </Stack>
      {/* Quantity price */}
      <StyledInputForm
        label={"Quantity"}
        type="normal"
        size="small"
        inputProps={{
          type: "number",
          name: "quantity",
          placeholder: "Write your quantity here...",
          value: price?.quantity,
          onChange: (e) => {
            onChangePriceHandler(e, price);
          },
          // onChange: quatation,
        }}
      />
      {/* total unit price */}
      <StyledInputForm
        label={"Unit Price"}
        type="normal"
        inputProps={{
          type: "number",
          name: "unitPrice",
          placeholder: "Write your unitPrice here...",
          value: price?.unitPrice,
          onChange: (e) => {
            onChangePriceHandler(e, price);
          },
        }}
      />
      {/* total price */}
      <StyledInputForm
        label={"Total Price"}
        type="normal"
        inputProps={{
          type: "number",
          name: "totalPrice",
          placeholder: "Write your unit price here...",
          value: price?.totalPrice,
          readOnly: true,
          onChange: (e) => {
            onChangePriceHandler(e, price);
          },
        }}
      />
    </Box>
  );
}

export default PriceListContainer;
