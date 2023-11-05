import { Grid, Skeleton } from "@mui/material";
import React from "react";

function ActivityReportSkeleton() {
  return (
    <Grid container spacing={4} mt={4}>
      <Grid item xs={12} md={6} lg={3}>
        <Skeleton width={"100%"} height={"100px"} />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Skeleton width={"100%"} height={"100px"} />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Skeleton width={"100%"} height={"100px"} />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Skeleton width={"100%"} height={"100px"} />
      </Grid>
    </Grid>
  );
}

export default ActivityReportSkeleton;
