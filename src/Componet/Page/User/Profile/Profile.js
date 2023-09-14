import React from "react";
import { useQuery } from "react-query";
import * as API_URL from "../../../../network/api";
import AXIOS from "../../../../network/axios";
import { successMsg } from "../../../Shared/SuccessMsg/index";
import { Grid, Stack } from "@mui/material";
import UserAvater from "./UserAvater";
import InfoCard from "./InfoCard";

function Profile({ data }) {
  console.log("getUserQuery", data);
  return (
    <Stack>
      <UserAvater
        imageUrl={data?.user?.image}
        name={data?.user?.name}
        id={`UID: ${data?.user?._id}`}
      />

      <Grid container spacing={4} mt={4}>
        <Grid item xs={12} md={6} lg={3}>
          <InfoCard title="Address" value={data?.user?.address} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <InfoCard title="Phone" value={data?.user?.phone} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <InfoCard title="Email" value={data?.user?.email} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <InfoCard title="VAT NO" value={data?.user?.vatNo} />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Profile;
