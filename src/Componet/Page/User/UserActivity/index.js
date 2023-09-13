import { Stack } from "@mui/material";
import React from "react";
import ActivityReport from "./ActivityReport";
import UserActivityTabs from "./UserActivityTabs";

function UserActivity() {
  return (
    <Stack>
      <ActivityReport />
      <UserActivityTabs />
    </Stack>
  );
}

export default UserActivity;
