import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Header from "./Componet/Common/Header";
import { ToastContainer } from "react-toastify";
import { Box } from "@mui/material";
import { routerList } from "./Route/RouterLIst";
import { useMutation } from "react-query";
import AXIOS from "./network/axios";
import * as API_URL from "./network/api";
import {
  getCookiesAsObject,
  removeAuthCookies,
} from "./Componet/Common/Helpers/helpers";
import Loader from "./Componet/Common/Component/Loader/Loader";
import useAuth from "./hooks/useAuth";

import { successMsg } from "./Componet/Shared/SuccessMsg";

function Layout() {
  const [adminDataIsLoading, setAdminDataIsLoading] = useState(true);

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const verifiedMutation = useMutation(
    (data) => {
      return AXIOS.get(`${API_URL.LOGIN}/${data?.id}`);
    },
    {
      onSuccess: (data) => {
        if (data.status) {
          setUser(data?.user);

          setAdminDataIsLoading(false);
        } else {
          successMsg(data?.message, "warn");
          navigate("/login");
        }
      },
    }
  );

  const verifiedUuser = () => {
    // no cookie found inside user browser
    if (document.cookie.length < 1) {
      console.log("All cookie are missing");
      setAdminDataIsLoading(false);
      navigate("/login");
      return;
    }

    const { account_id, access_token } = getCookiesAsObject();

    // any cookie is missing
    if (!account_id || !access_token) {
      console.log("some cookie is missing");
      removeAuthCookies();
      setAdminDataIsLoading(false);
      navigate("/login");
      return;
    }

    if (account_id) verifiedMutation.mutate({ id: account_id });
  };

  useEffect(() => {
    verifiedUuser();
  }, []);

  return (
    <Box>
      <Header />
      <ToastContainer />
      <Box sx={{ padding: { xs: "20px 20px", lg: "20px 40px" } }}>
        {adminDataIsLoading ? <Loader /> : <Outlet />}
      </Box>
    </Box>
  );
}

export default Layout;
