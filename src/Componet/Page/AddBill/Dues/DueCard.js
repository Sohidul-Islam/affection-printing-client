import { Stack, Typography } from "@mui/material";
import React from "react";
import StyledCheckBox from "../../../Common/Shared/CheckBox";
import moment from "moment";

function DueCard({ data, selectedDues, selectIndividualDues }) {
  return (
    <StyledCheckBox
      checked={selectedDues.findIndex((item) => item?._id === data?._id) >= 0}
      sx={{ width: 8, height: 8 }}
      onChange={() => {
        selectIndividualDues(data);
      }}
      label={
        <Stack>
          <Typography variant="body2">
            <strong>Bill No:</strong>
            {data?.billNo}
          </Typography>
          <Typography variant="body2">
            <strong>Due Amount:</strong>
            {data?.due}
          </Typography>
          <Typography variant="body3">
            {moment(data?.date).format("DD MMMM, YYYY")}
          </Typography>
        </Stack>
      }
    />
  );
}

export default DueCard;
