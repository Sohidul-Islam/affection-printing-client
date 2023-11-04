import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import CloseButton from "../../../Common/Shared/CloseButton";
import StyledInputForm from "./../../../Common/Shared/StyledInputForm/index";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as API_URL from "../../../../network/api";
import AXIOS from "../../../../network/axios";
import { successMsg } from "./../../../Shared/SuccessMsg/index";

function MakePayment({ onClose }) {
  const [payment, setPayment] = useState(null);
  const params = useParams();
  const queryClient = useQueryClient();

  const getDuesByUser = useQuery([API_URL.DUES, { userId: params?.id }], () =>
    AXIOS.get(API_URL.DUES, {
      params: { ...{ userId: params?.id } },
    })
  );

  const makePaymentMutation = useMutation(
    (data) => AXIOS.post(API_URL.MAKE_PAYMENT, data),
    {
      onSuccess: (data) => {
        if (data.status) {
          successMsg(data?.message, "success");
          queryClient.invalidateQueries(API_URL?.BILL);
          queryClient.invalidateQueries(API_URL?.TRANSACTION);
          queryClient.invalidateQueries(API_URL.GET_DASHBOARD);
          onClose();
        } else {
          successMsg(data?.message, "warn");
        }
      },
    }
  );

  const totalDues = useMemo(
    () => getDuesByUser?.data?.summery?.totalDues,
    [getDuesByUser?.data?.summery?.totalDues]
  );

  //   console.log("params", getDuesByUser?.data?.summery);

  //   const totalDues = getDuesByUser?.data?.summery?.totalDues || 0;

  const makePaymenHandler = () => {
    if (payment <= 0) {
      successMsg("Can't make payment zero or negative amount", "warn");
      return;
    }
    if (!params?.id) {
      successMsg("User not found", "warn");
      return;
    }

    if (payment > totalDues) {
      successMsg("Can't make payment greater than total dues amount", "warn");
      return;
    }
    makePaymentMutation.mutate({ user: params?.id, payment: payment });
  };

  return (
    <Box
      sx={{
        width: "min(80vw,650px)",
        height: "min(80vh,380px)",
        borderRadius: "7px",
        padding: "20px",
        background: "#fff",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <Typography flex={1} variant="h4">
          Make Payment
        </Typography>
        <CloseButton onClick={onClose} />
      </Stack>

      <Stack mt={7.5} gap={4.5}>
        <StyledInputForm
          type="normal"
          label={"Payment Amount"}
          inputProps={{
            type: "number",
            min: 1,
            max: totalDues,
            placeholder: "Enter Payment Amount...",
            value: payment,
            onChange: (e) => {
              setPayment(e?.target?.value);
            },
          }}
        />
        <Stack gap={3}>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography variant="body2">Total Due</Typography>
            <Typography variant="body2">{totalDues} Tk</Typography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
            pb={2}
            borderBottom={"1px solid #EEEEEE"}
          >
            <Typography variant="body2">Paid</Typography>
            <Typography variant="body2">{payment || 0} Tk</Typography>
          </Stack>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography variant="body2">Due</Typography>
            <Typography variant="body2">
              {totalDues - payment || 0} Tk
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="end" mt={7.5}>
          <Button
            onClick={makePaymenHandler}
            size="sm"
            variant="contained"
            color="primary"
            disabled={makePaymentMutation?.isLoading}
          >
            Pay
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default MakePayment;
