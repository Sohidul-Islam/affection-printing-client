import React, { useState } from "react";
import { useQuery } from "react-query";
import * as API_URL from "../../../../network/api";
import AXIOS from "../../../../network/axios";
import { Box, Button, Stack, Typography } from "@mui/material";
import DueCard from "./DueCard";
import StyledCheckBox from "../../../Common/Shared/CheckBox";
import { Save } from "@mui/icons-material";

function DuesContainer({ queryParams, dues = [], addDuesHandler }) {
  const [selectedDues, setSelectedDues] = useState([...dues]);

  const [newDues, setNewDues] = useState([]);

  const [totalDue, setTotalDue] = useState([]);

  const getDuesByUser = useQuery(
    [API_URL.DUES, queryParams],
    () =>
      AXIOS.get(API_URL.DUES, {
        params: { ...queryParams },
      }),
    {
      onSuccess: (data) => {
        if (data.status) {
          const tempDue = data?.dues;

          setNewDues(() => {
            let items = {};

            selectedDues.forEach((item) => {
              items[item._id] = item;
            });

            tempDue.forEach((item) => {
              items[item._id] = item;
            });

            setTotalDue(() => {
              return Object.values(items).reduce(
                (acc, item) => acc + item?.due,
                0
              );
            });
            return Object.values(items);
          });
        }
      },
    }
  );

  const selectAllHandler = () => {
    // @storing all due data
    const allDues = newDues || [];

    // @check all dues is already selected or not.
    const isSelected = selectedDues?.length === allDues?.length;

    // @if it is selected then go for a task where we add new atribute that is selected that means true;
    if (!isSelected) {
      const updatedDues = allDues.map((due) => ({
        ...due,
        alreadyAdded: isSelected,
      }));
      setSelectedDues([...updatedDues]);

      return;
    }

    // @if it is not selected then go for a task where we add new atribute that is not selected that means false;
    const updatedDues = allDues.map((due) => ({
      ...due,
      alreadyAdded: false,
    }));

    setSelectedDues([]);
  };

  const selectIndividualDues = (due) => {
    const alreadySelected =
      selectedDues.findIndex((item) => item?._id === due?._id) >= 0;

    const newDue = { ...due, alreadyAdded: !alreadySelected };

    setSelectedDues((prev) => {
      if (alreadySelected) {
        return prev.filter((item) => item?._id !== newDue?._id);
      }
      return [...prev, newDue];
    });
  };

  return (
    <Box>
      {newDues.length > 0 ? (
        <>
          <Box mb={4}>
            <StyledCheckBox
              checked={selectedDues?.length === newDues.length}
              label={
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", fontWeight: 700 }}
                >
                  All (Total: {totalDue})
                  {/* All (Total: {getDuesByUser?.data?.summery?.totalDues}) */}
                </Typography>
              }
              sx={{ width: 8, height: 8 }}
              onChange={selectAllHandler}
            />
          </Box>
          <Stack gap={3}>
            {newDues.map((due, i) => (
              <DueCard
                key={i}
                data={due}
                selectedDues={selectedDues}
                selectIndividualDues={selectIndividualDues}
              />
            ))}
          </Stack>
        </>
      ) : (
        <Typography variant="body3">No Dues Found</Typography>
      )}

      <Box mt={7.5}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={() => {
            addDuesHandler(selectedDues);
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default DuesContainer;
