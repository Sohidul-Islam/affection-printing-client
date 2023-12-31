import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import StyledInputForm from "../../Common/Shared/StyledInputForm";
import SideBarContainer from "../../Common/SidebarContainer/index";
import { Add } from "@mui/icons-material";
import { isVerifiedBill } from "./helpers";

const getInitialValue = (data) => {
  if (data) {
    return data;
  }

  return {
    quantity: 0,
    desc: "",
    price: 0,
    remark: "",
    amount: "",
  };
};

function AddBill({ onClose, addBillHandler, data = undefined }) {
  const [newBill, setNewBill] = useState(getInitialValue(data));

  const onSubmitBill = () => {
    if (isVerifiedBill(newBill)) {
      if (addBillHandler) addBillHandler(newBill);
      onClose();
    }
  };

  const onChangeChallan = (e) => {
    setNewBill((prev) => {
      if (e.target.name === "price") {
        prev.amount = Number(
          (Number(prev?.quantity || 0) * Number(e.target.value || 0)).toFixed(2)
        );
      }

      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <SideBarContainer title={"Add Bill"} onClose={onClose}>
      <Stack gap={5}>
        <StyledInputForm
          label={"Quantity"}
          type="normal"
          inputProps={{
            type: "number",
            name: "quantity",
            min: 0,
            value: newBill?.quantity,
            onChange: onChangeChallan,
          }}
        />
        <StyledInputForm
          label={"Description"}
          type="textarea"
          inputProps={{
            name: "desc",
            multiline: true,
            maxRow: 4,
            value: newBill?.desc,
            onChange: onChangeChallan,
          }}
        />
        <StyledInputForm
          label={"Unit Price"}
          type="normal"
          inputProps={{
            type: "number",
            name: "price",
            min: 0,
            value: newBill?.price,
            onChange: onChangeChallan,
          }}
        />

        <StyledInputForm
          label={"Total Amount"}
          type="normal"
          inputProps={{
            name: "amount",
            type: "number",
            readOnly: Number(newBill?.price) > 0,
            value: newBill?.amount,
            onChange: onChangeChallan,
          }}
        />
        {Number(newBill?.price) > 0 && (
          <Typography variant="body3" marginTop={-4}>
            This Field Isn't Editable
          </Typography>
        )}
      </Stack>

      <Box marginTop={5}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={onSubmitBill}
        >
          ADD
        </Button>
      </Box>
    </SideBarContainer>
  );
}

export default AddBill;
