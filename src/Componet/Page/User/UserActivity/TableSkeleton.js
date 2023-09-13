import { Skeleton, Stack } from "@mui/material";
import React from "react";

function Row() {
  return (
    <Stack direction={"row"} gap={4}>
      <Skeleton width={"100%"} height={12} flex={1} />
      <Skeleton width={"100%"} height={12} flex={1} />
      <Skeleton width={"100%"} height={12} flex={1} />
      <Skeleton width={"100%"} height={12} flex={1} />
      <Skeleton width={"100%"} height={12} flex={1} />
    </Stack>
  );
}

function TableSkeleton() {
  return (
    <Stack gap={3} marginTop={8}>
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </Stack>
  );
}

export default TableSkeleton;
