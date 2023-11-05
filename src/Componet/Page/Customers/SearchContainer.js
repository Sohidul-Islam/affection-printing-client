import { Box, Button, InputAdornment, Stack, debounce } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchBar from "../../Common/Component/StyledSearchBar";
import { AccountCircle, Add } from "@mui/icons-material";
import StyledDateRange from "../../Common/Component/StyledDateRange";

function SearchContainer({
  setQueryParams,
  onAdd,
  addButtonLabel = "Add",
  show = {
    search: true,
    date: true,
    addBtn: true,
  },
}) {
  const [range, setRange] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      page: 1,
      startDate: range?.startDate,
      endDate: range?.endDate,
    }));
  }, [range]);

  return (
    <Box>
      <Stack direction={"row"} flexWrap={"wrap"} gap={4}>
        {show?.search && (
          <StyledSearchBar
            placeholder="Search here"
            fullWidth
            sx={{
              flex: { sm: 1, lg: 1 },
              maxWidth: { sm: "220px", lg: "100%" },
            }}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            inputProps={{
              onChange: debounce((e) => {
                setQueryParams((prev) => ({
                  ...prev,
                  page: 1,
                  searchKey: e.target.value,
                }));
              }, 300),
            }}
          />
        )}

        <Stack direction={"row"} gap={4} sx={{ flex: { sm: 1, lg: 1 } }}>
          {show?.date && (
            <StyledDateRange
              range={range}
              setRange={setRange}
              sx={{ flex: 1 }}
            />
          )}
          {show?.addBtn && (
            <Button
              variant="contained"
              size="small"
              onClick={onAdd}
              startIcon={<Add />}
            >
              {addButtonLabel}
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default SearchContainer;
