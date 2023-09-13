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
import AddChallan from "./AddChallan";
import { deleteDataByKey, editDataByKey } from "./helpers";

function ChallanList({ challans = [], setChallan, isViewForTable = false }) {
  const [openAddChallan, setOpenAddChallan] = useState(false);
  const [selectedChallan, setSelectedChallan] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const theme = useTheme();

  const deleteChallanHandler = (index) => {
    const newChallan = deleteDataByKey(challans, "index", index);

    setChallan((prev) => ({ ...prev, challans: newChallan }));
  };

  const editChallanHandler = (value) => {
    const newChallan = editDataByKey(challans, selectedIndex, value);

    setChallan((prev) => ({ ...prev, challans: newChallan }));
  };

  return (
    <Box>
      {challans.map((challan, i) => (
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
              >{`Serial No ${i + 1}: ${challan?.desc}`}</Typography>
            }
          >
            <Stack flexWrap={"wrap"} gap={4} sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h5">Quantity</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    overflowWrap: "break-word",
                  }}
                >
                  {challan?.quantity}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h5">Descrioption</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    overflowWrap: "break-word",
                  }}
                >
                  {challan?.desc}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h5">Remark</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    overflowWrap: "break-word",
                  }}
                >
                  {challan?.remark || "no remark"}
                </Typography>
              </Box>
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
                    setOpenAddChallan(() => {
                      setSelectedIndex(i);
                      setSelectedChallan(challan);
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

      <Drawer open={openAddChallan} anchor="right">
        <AddChallan
          addChallanHandler={editChallanHandler}
          data={selectedChallan}
          onClose={() => setOpenAddChallan(false)}
        />
      </Drawer>
    </Box>
  );
}

export default ChallanList;
