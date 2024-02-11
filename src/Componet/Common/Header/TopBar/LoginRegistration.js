import { AppRegistration, ExitToApp, Login } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import StyledAvater from "../../../Shared/StyledAvater";
import userDummy from "../../../../assets/user.jpg";
import useAuth from "../../../../hooks/useAuth";
import { removeAuthCookies } from "../../Helpers/helpers";
function LoginRegistration() {
  const { loginWithGoogle, logout, user } = useAuth();

  return (
    <Stack direction={"row"} alignItems={"center"} gap="16px">
      {user?.email && (
        <StyledAvater
          src={user?.image || user?.photoURL}
          title={user?.name || user?.displayName || ""}
        />
      )}
      {/* {!user?.email && (
        <Button
          onClick={loginWithGoogle}
          color="primary"
          variant="text"
          startIcon={<Login />}
        >
          <Typography variant="body1">Login</Typography>
        </Button>
      )} */}
      {user?.email && (
        <Button
          color="primary"
          variant="text"
          startIcon={<ExitToApp />}
          onClick={() => {
            logout();
            removeAuthCookies();
          }}
        >
          <Typography variant="body1">Logout</Typography>
        </Button>
      )}
    </Stack>
  );
}

export default LoginRegistration;
