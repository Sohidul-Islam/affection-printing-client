import React, { useState } from "react";
import SideBarContainer from "./../../Common/SidebarContainer";
import { Box, Button, Stack, Typography } from "@mui/material";
import StyledInputForm from "../../Common/Shared/StyledInputForm";
import { Add } from "@mui/icons-material";
import { getUserData, validateUserData } from "./helpers";
import { successMsg } from "../../Shared/SuccessMsg";

function AddAdmin({ onClose, addUserQuery, currentUser }) {
  const [newUser, setNewUser] = useState(getUserData(currentUser));

  const onChangeHandler = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    console.log("newFiles", newFiles);
    setNewUser((prev) => ({
      ...prev,
      image: newFiles,
    }));
  };

  const onSubmitUser = async () => {
    const isValidated = await validateUserData(newUser);

    if (isValidated?.status) {
      addUserQuery.mutate(isValidated?.data);
      return;
    }
    successMsg(isValidated?.message);
  };
  return (
    <SideBarContainer title={"Add Admin"} onClose={onClose}>
      <Stack gap={4}>
        <StyledInputForm
          label={"Name *"}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSubmitUser();
            }
          }}
          type="normal"
          inputProps={{
            type: "text",
            name: "name",

            placeholder: "Enter your name here",
            min: 0,
            value: newUser?.name,
            onChange: onChangeHandler,
          }}
        />

        <StyledInputForm
          label={"Phone *"}
          type="normal"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSubmitUser();
            }
          }}
          inputProps={{
            type: "text",
            name: "phone",
            placeholder: "Enter your phone number here",
            min: 0,
            value: newUser?.phone,
            onChange: onChangeHandler,
          }}
        />
        <StyledInputForm
          label={"Password *"}
          type="password"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSubmitUser();
            }
          }}
          inputProps={{
            type: "password",
            name: "password",
            placeholder: "Enter your password here",
            min: 0,
            value: newUser?.password,
            onChange: onChangeHandler,
          }}
        />
        <StyledInputForm
          label={"Email"}
          type="normal"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSubmitUser();
            }
          }}
          inputProps={{
            type: "text",
            name: "email",
            placeholder: "Enter your email here",
            min: 0,
            value: newUser?.email,
            onChange: onChangeHandler,
          }}
        />

        <StyledInputForm
          label={"Profile Photo"}
          type="file"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSubmitUser();
            }
          }}
          inputProps={{
            type: "text",
            name: "image",
            placeholder: "Enter your VAT No here",
            onDrop,
            files: newUser?.image,
            onChange: onChangeHandler,
          }}
        />

        <Box marginTop={5}>
          <Button
            disabled={addUserQuery?.isLoading}
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={onSubmitUser}
          >
            ADD
          </Button>
        </Box>
      </Stack>
    </SideBarContainer>
  );
}

export default AddAdmin;
