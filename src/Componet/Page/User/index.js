import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageTop from "../../Common/Component/PageTop";
import Profile from "./Profile/Profile";
import UserActivity from "./UserActivity";
import * as API_URL from "../../../network/api";
import AXIOS from "../../../network/axios";

import Loader from "../../Common/Component/Loader/Loader";
import { useQuery } from "react-query";
import { successMsg } from "../../Shared/SuccessMsg";

const breadcrumbs = [
  {
    label: "Customers List",
    to: "/customers",
  },
  {
    label: "Customer",
    to: "#",
  },
];

function User() {
  const params = useParams();

  const getUserQuery = useQuery(
    [API_URL.USERS, { id: params?.id }],
    () => AXIOS.get(`${API_URL.USERS}/${params?.id}`),
    {
      onSuccess: (data) => {
        if (!data.status) {
          successMsg("User Not Found");
        }
      },
    }
  );

  return (
    <Box>
      {!getUserQuery?.isLoading ? (
        <Box>
          <PageTop breadcrumbItems={breadcrumbs} />
          <Profile data={getUserQuery?.data} />
          <UserActivity />
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
}

export default User;
