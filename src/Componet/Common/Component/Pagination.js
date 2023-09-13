import React from "react";
import Pagination from "@mui/material/Pagination";

function StyledPagination({ totalPage = 1, page = 1, onChange, sx }) {
  return (
    <Pagination
      sx={{ ...(sx || {}) }}
      count={totalPage}
      page={page}
      onChange={onChange}
      showFirstButton
      showLastButton
    />
  );
}

export default StyledPagination;
