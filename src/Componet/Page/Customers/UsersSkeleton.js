import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";
const userSkeletonSx = {
  // width: { lg: "295px", xs: "100%" },
  maxWidth: { md: "295px", xs: "100%" },
  height: "60px",
  flex: 1,
  borderRadius: "16px",
  padding: "16px 9px",
};
function UsersSkeleton() {
  return (
    <Box>
      <Stack gap={4}>
        <Skeleton sx={userSkeletonSx}></Skeleton>
        <Skeleton sx={userSkeletonSx}></Skeleton>
        <Skeleton sx={userSkeletonSx}></Skeleton>
        <Skeleton sx={userSkeletonSx}></Skeleton>
      </Stack>
    </Box>
  );
}

export default UsersSkeleton;
