import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import StyledInputForm from "../../Common/Shared/StyledInputForm";
import SideBarContainer from "../../Common/SidebarContainer/index";
import { Add } from "@mui/icons-material";
import { isVerifiedChallan } from "./helpers";

const getInitialValue = (data) => {
  if (data) {
    return data;
  }

  return {
    quantity: 0,
    desc: "",
    remark: "",
  };
};

function AddChallan({ onClose, addChallanHandler, data = undefined }) {
  const [newChallan, setNewChallan] = useState(getInitialValue(data));

  const onSubmitChallan = () => {
    if (isVerifiedChallan(newChallan)) {
      addChallanHandler(newChallan);
      onClose();
    }
  };

  const onChangeChallan = (e) => {
    setNewChallan((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <SideBarContainer title={"Add Challan"} onClose={onClose}>
      <Stack gap={5}>
        <StyledInputForm
          label={"Quantity"}
          type="normal"
          inputProps={{
            type: "number",
            name: "quantity",
            value: newChallan?.quantity,
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
            value: newChallan?.desc,
            onChange: onChangeChallan,
          }}
        />

        <StyledInputForm
          label={"Remark"}
          type="normal"
          inputProps={{
            name: "remark",
            multiline: true,
            value: newChallan?.remark,
            onChange: onChangeChallan,
          }}
        />
      </Stack>

      <Box marginTop={5}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={onSubmitChallan}
        >
          ADD
        </Button>
      </Box>
    </SideBarContainer>
  );
}

export default AddChallan;
