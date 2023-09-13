import _ from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Stack, styled } from "@mui/material";
import dayjs from "dayjs";
import { convertStringToDate, convertStringToDate2 } from "./helpers";

const SDateInput = styled(DatePicker)(({ theme }) => ({
  "& .MuiInputBase-root": {
    background: theme.palette.background.secondary,
    borderRadius: "7px",
    height: 35,
    padding: "0px 8px",
  },
  "& fieldset": {
    outline: "0",
    border: "0",
  },
  "& input": {
    paddingTop: "8px",
    paddingBottom: "8px",
    fontWeight: "500",
    fontSize: 12,
  },
  "& .MuiIconButton-root": {
    // display: "none", // Hide the calendar icon button
    height: 20,
  },
  // disabled
  "&:has(.MuiInputBase-root.Mui-disabled)": {
    opacity: "0.85",
  },
}));

export default function StyledDateRange({ range, setRange, sx }) {
  function disableDates(date, type) {
    const newdate = new Date(date);
    const now = new Date();

    if (type === "start") {
      return range?.endDate
        ? !(newdate < moment(range?.endDate).toDate())
        : now < newdate;
    }
    if (type === "end") {
      return moment(range?.startDate).toDate() >= newdate;
    }
    // if (type === "start") {
    //   return now < newdate;
    // }
    // if (type === "end") {
    //   return now >= newdate;
    // }
  }

  return (
    <Box sx={{ ...sx }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction={"row"} gap={4}>
          <SDateInput
            shouldDisableDate={(date) => {
              return disableDates(date, "start");
            }}
            size="small"
            maxDate={convertStringToDate2(range?.endDate)}
            inputAdornment={<>None</>}
            value={dayjs(convertStringToDate2(range?.startDate))}
            onChange={(newValue) => {
              setRange((prev) => ({
                ...prev,
                startDate: moment(newValue?.$d).format("YYYY-MM-DD"),
              }));
            }}
            format="DD/MM/YYYY"
            sx={{ height: 35, flex: 1 }}
          />
          <SDateInput
            // open={openEndDate}

            size="small"
            minDate={convertStringToDate2(range?.startDate)}
            value={dayjs(convertStringToDate2(range?.endDate))}
            onChange={(newValue) => {
              setRange((prev) => ({
                ...prev,
                endDate: moment(newValue?.$d).format("YYYY-MM-DD"),
              }));
            }}
            format="DD/MM/YYYY"
            shouldDisableDate={(date) => {
              return disableDates(date, "end");
            }}
            sx={{ height: 35, flex: 1 }}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
}
