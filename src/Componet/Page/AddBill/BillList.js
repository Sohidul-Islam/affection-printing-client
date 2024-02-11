import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import StyledAccordion from "../../Common/Shared/StyledAccordian";
import AddBill from "./AddBill";
import {
  deleteDataByKey,
  editDataByKey,
  getAmountInWord,
  getTotalAmount,
} from "./helpers";

function BillList({ bills = [], setBills, isReadOnly }) {
  const [openAddChallan, setOpenAddChallan] = useState(false);
  const [selectedChallan, setSelectedChallan] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const theme = useTheme();

  const deleteChallanHandler = (index) => {
    const newBills = deleteDataByKey(bills, "index", index);

    const totalAmount = getTotalAmount(newBills);

    setBills((prev) => {
      const due = totalAmount - prev?.advance;
      return { ...prev, due, totalAmount, bills: newBills };
    });
  };

  const editBillHandler = (value) => {
    const newBills = editDataByKey(bills, selectedIndex, value);
    // newBills[selectedIndex].amount =
    //   newBills[selectedIndex]?.price > 0
    //     ? newBills[selectedIndex]?.price * newBills[selectedIndex]?.quantity
    //     : newBills[selectedIndex].amount;

    const totalAmount = getTotalAmount(newBills);

    setBills((prev) => {
      const due = totalAmount - prev?.advance;

      return {
        ...prev,
        totalAmount: totalAmount,
        due,
        bills: [...newBills],
      };
    });
  };

  return (
    <Box>
      {bills.map((bill, i) => (
        <Box
          key={i}
          marginBottom={2}
          paddingBottom={2}
          sx={{ borderBottom: `1px solid ${theme.palette.custom.border}` }}
        >
          <StyledAccordion
            summery={
              <Typography
                variant="h6"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  maxWidth: "300px",
                  textTransform: "capitalize",
                  textWrap: "nowrap",
                }}
              >{`Serial No ${i + 1}: ${bill?.desc}`}</Typography>
            }
          >
            <Stack flexWrap={"wrap"} gap={4} sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h5">Descrioption</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    overflowWrap: "break-word",
                  }}
                >
                  {bill?.desc}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h5">Quantity</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    overflowWrap: "break-word",
                  }}
                >
                  {bill?.quantity}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h5">Unit Price</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    overflowWrap: "break-word",
                  }}
                >
                  {bill?.price}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h5">Amount</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    overflowWrap: "break-word",
                  }}
                >
                  {bill?.amount}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h5">Taka in Word</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    overflowWrap: "break-word",
                  }}
                >
                  {getAmountInWord(bill?.amount)}
                </Typography>
              </Box>
            </Stack>

            <Stack
              marginTop={4}
              direction={"row"}
              gap={4}
              justifyContent={"start"}
              alignContent={"start"}
            >
              <Button
                disableRipple
                variant="text"
                color="primary"
                startIcon={<Edit />}
                sx={{ display: "flex", justifyContent: "start" }}
                onClick={() =>
                  setOpenAddChallan(() => {
                    setSelectedIndex(i);
                    setSelectedChallan(bill);
                    return true;
                  })
                }
                disabled={isReadOnly}
              >
                Edit
              </Button>
              <Button
                disableRipple
                variant="text"
                color={"error"}
                startIcon={<Delete />}
                sx={{ display: "flex", justifyContent: "start" }}
                onClick={() => deleteChallanHandler(i)}
                disabled={isReadOnly}
              >
                Delete
              </Button>
            </Stack>
          </StyledAccordion>
        </Box>
      ))}

      <Drawer open={openAddChallan} anchor="right">
        <AddBill
          addBillHandler={editBillHandler}
          data={selectedChallan}
          onClose={() => setOpenAddChallan(false)}
        />
      </Drawer>
    </Box>
  );
}

export default BillList;
