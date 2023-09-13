import { Grid } from "@mui/material";
import React from "react";
import InfoCard from "../Profile/InfoCard";

function ActivityReport({ data }) {
  return (
    <Grid container spacing={4} mt={4}>
      <Grid item xs={12} md={6} lg={3}>
        <InfoCard title="Total Paid" value={data?.paid?.length || "0"} />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InfoCard title="Due" value={data?.due?.length || "0"} />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InfoCard title="Challan" value={data?.challans?.length || "0"} />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InfoCard title="Bill" value={data?.quatation?.length || "0"} />
      </Grid>
    </Grid>
  );
}

export default ActivityReport;
