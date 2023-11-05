import { Stack } from "@mui/material";
import React from "react";
import ActivityReport from "../User/UserActivity/ActivityReport";
import UserActivityTabs from "../User/UserActivity/UserActivityTabs";

function Dashboard() {
  return (
    <Stack gap={4}>
      <ActivityReport />
      <UserActivityTabs
        showPayment={false}
        queryParamsProps={{ pageSize: 20 }}
        showFor="dashboard"
      />
    </Stack>
  );
}

export default Dashboard;
