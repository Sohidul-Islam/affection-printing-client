/* eslint-disable no-lone-blocks */
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
import { Delete, Edit } from "@mui/icons-material";
import { deleteDataByKey } from "../AddChallan/helpers";
import AddQuotation from "./AddQuotation/AddQuotation";
import currency from "./../../Common/Shared/CurrencyFormat/index";

function QuotationList({ quotation, setQuotation, isViewForTable = false }) {
  const [openAddQuotation, setOpenAddQuotation] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);


  const deleteChallanHandler = (index) => {
    const newQuotation = deleteDataByKey(quotation?.qutations, "index", index);

    setQuotation((prev) => ({ ...prev, qutations: newQuotation }));
  };

  const editHandler = (item) => {
    {
      setQuotation((prev) => {
        prev["qutations"][selectedIndex] = item;

        return prev;
      });
    }
  };

  const theme = useTheme();
  return (
    <Box>
      {quotation?.qutations?.map((quota, i) => (
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
                  maxWidth: "300px",
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                }}
              >{`Serial No ${i + 1}: ${quota?.title}`}</Typography>
            }
          >
            <Stack direction={"row"} gap={2.5} flexWrap={"wrap"}>
              {quota?.priceList?.map((price, i) => {
                return (
                  <Stack
                    key={i}
                    sx={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "10px",
                      border: "1px solid #EEEEEE",
                    }}
                  >
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <Typography variant="h6" fontWeight={600}>
                        Quantity:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          overflowWrap: "break-word",
                        }}
                      >
                        {price?.quantity || ""}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <Typography variant="h6" fontWeight={600}>
                        Unit Price:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          overflowWrap: "break-word",
                        }}
                      >
                        {currency.formatCurrency(price?.unitPrice)}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <Typography variant="h6" fontWeight={600}>
                        Total Price:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          overflowWrap: "break-word",
                        }}
                      >
                        {currency.formatCurrency(price?.totalPrice)}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
            <Stack>
              {quota?.topics?.map((topics, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      width: "100%",
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">{topics?.title}:</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        overflowWrap: "break-word",
                      }}
                    >
                      {topics?.desc || ""}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>

            {!isViewForTable && (
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
                    setOpenAddQuotation(() => {
                      setSelectedIndex(i);
                      setSelectedQuotation(quota);
                      return true;
                    })
                  }
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
                >
                  Delete
                </Button>
              </Stack>
            )}
          </StyledAccordion>
        </Box>
      ))}

      <Drawer open={openAddQuotation} anchor="right">
        <AddQuotation
          addQuotaionHandler={editHandler}
          quotation={selectedQuotation}
          onClose={() => setOpenAddQuotation(false)}
        />
      </Drawer>
    </Box>
  );
}

export default QuotationList;
