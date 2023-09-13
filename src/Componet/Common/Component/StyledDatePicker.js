import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import _ from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material";
import dayjs from "dayjs";
import { convertStringToDate } from "./helpers";

const SDateInput = styled(DatePicker)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "30px",
    background: theme.palette.background.secondary,
  },
  "& fieldset": {
    outline: "0",
    border: "0",
  },
  "& input": {
    paddingTop: "12px",
    paddingBottom: "12px",
    fontWeight: "500",
  },
  // disabled
  "&:has(.MuiInputBase-root.Mui-disabled)": {
    opacity: "0.85",
  },
}));

export default function StyledDatePicker({ inputProps, ...props }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SDateInput
        value={dayjs(convertStringToDate(inputProps?.value))}
        onChange={(newValue) => {
          inputProps?.onChange({
            target: {
              name: inputProps?.name,
              value: moment(newValue?.$d).format("DD/MM/YYYY"),
            },
          });
        }}
        format="DD MMMM, YYYY"
        {...props}
      />
    </LocalizationProvider>
  );
}
