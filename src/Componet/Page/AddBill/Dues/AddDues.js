import React from "react";

import SideBarContainer from "../../../Common/SidebarContainer";

import { Stack } from "@mui/material";

import DuesContainer from ".";

function AddDues({ onClose, queryParams, dues, addDuesHandler }) {
  return (
    <SideBarContainer title={"Add Dues"} onClose={onClose}>
      <Stack>
        <DuesContainer
          queryParams={queryParams}
          dues={dues}
          addDuesHandler={addDuesHandler}
        />
      </Stack>
    </SideBarContainer>
  );
}

export default AddDues;
