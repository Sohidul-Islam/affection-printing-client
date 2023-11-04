import { Grid } from "@mui/material";
import React from "react";
import InfoCard from "../Profile/InfoCard";
import { useQuery } from "react-query";
import * as API_URL from "../../../../network/api";
import { useParams } from "react-router-dom";
import AXIOS from "../../../../network/axios";
import currencyService from "../../../Common/Shared/CurrencyFormat";

function ActivityReport({ data }) {
  const params = useParams();
  const quryData = useQuery(
    [API_URL.GET_DASHBOARD, { userId: params?.id }],
    () =>
      AXIOS.get(API_URL.GET_DASHBOARD, {
        params: {
          userId: params?.id ? params?.id : undefined,
        },
      })
  );

  return (
    <Grid container spacing={4} mt={4}>
      <Grid item xs={12} md={6} lg={3}>
        <InfoCard
          title="Total Paid"
          value={currencyService.formatCurrency(
            quryData?.data?.dashboard?.transactions?.totalPayment || 0
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InfoCard
          title="Due"
          value={currencyService.formatCurrency(
            quryData?.data?.dashboard?.dues?.summery?.totalDues || 0
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InfoCard
          title="Challan"
          value={quryData?.data?.dashboard?.challans?.challans?.length || "0"}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InfoCard
          title="Bill"
          value={quryData?.data?.dashboard?.bills?.bills?.length || "0"}
        />
      </Grid>
    </Grid>
  );
}

export default ActivityReport;
