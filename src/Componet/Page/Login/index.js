import { Alert, Button, Collapse, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import StyledFormInput from "./StyledFormInput";
import { useMutation } from "react-query";
import AXIOS from "./../../../network/axios";
import * as API_URL from "../../../network/api";
import { successMsg } from "./../../Shared/SuccessMsg/index";
import { setCookiesAsObj } from "../../Common/Helpers/helpers";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../Admin/helpers";

function Loging() {
  const [user, setUser] = useState({ email: "", password: "" });

  const [isValid, setIsValid] = useState(null);

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setIsValid(null);
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginQuery = useMutation(
    (data) => {
      return AXIOS.get(API_URL.LOGIN, {
        params: { ...data },
      });
    },
    {
      onSuccess: (data) => {
        if (data.status) {
          setIsValid(null);
          successMsg(data?.message, "success");
          navigate("/");
          setCookiesAsObj(
            {
              access_token: data?.user?.accessToken,
              account_id: data?.user?._id,
            },
            15
          );
        } else {
          setIsValid({
            status: false,
            message: data?.message,
          });
        }
      },
    }
  );

  const onSubmitLogin = () => {
    if (!user?.email) {
      setIsValid({
        status: false,
        message: "Please provide email",
      });
      return;
    }

    if (!validateEmail(user?.email)) {
      setIsValid({
        status: false,
        message: "Your email is not valid",
      });
      return;
    }
    if (!user?.password?.trim()) {
      setIsValid({
        status: false,
        message: "Please provide password",
      });
      return;
    }

    loginQuery.mutate(user);
  };

  return (
    <Stack
      sx={{ minWidth: "100vw", minHeight: "100vh" }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Stack
        sx={{
          width: "min(650px,90vw)",
        }}
        gap={4.5}
      >
        <Stack gap={2.5}>
          <Typography variant="h5" fontSize={24}>
            Login
          </Typography>
          <Collapse in={isValid}>
            <Alert severity="error">{isValid?.message}</Alert>
          </Collapse>
        </Stack>
        <StyledFormInput
          label={"Email"}
          inputProps={{
            value: user?.email,
            type: "text",
            name: "email",
            placeholder: "Enter your email",
            required: true,
            onChange: onChangeHandler,
            onKeyUp: (e) => {
              if (e?.key === "Enter") {
                onSubmitLogin();
              }
            },
          }}
        />
        <StyledFormInput
          label={"Password"}
          inputProps={{
            value: user?.password,
            type: "password",
            name: "password",
            placeholder: "Enter your password",
            required: true,
            onChange: onChangeHandler,
            onKeyUp: (e) => {
              if (e?.key === "Enter") {
                onSubmitLogin();
              }
            },
          }}
        />
        <Button
          disabled={loginQuery?.isLoading}
          onClick={onSubmitLogin}
          variant="contained"
        >
          Login
        </Button>
      </Stack>
    </Stack>
  );
}

export default Loging;
