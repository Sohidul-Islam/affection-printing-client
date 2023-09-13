import { Search } from "@mui/icons-material";
import { styled, Input } from "@mui/material";
import React from "react";

const SInput = styled(Input)(({ theme }) => ({
  "&": {
    borderRadius: "7px",
    height: 35,
    padding: "0px 8px",
    background: theme.palette.background.secondary,
    opacity: 0.85,
    border: `1px solid ${theme.palette.custom.border}`,
  },

  "& .MuiInputBase-root": {
    borderRadius: "7px",
    height: "100%",
    background: theme.palette.background.secondary,
  },

  "& .MuiInput-input": {
    fontWeight: "400",
    fontSize: 16,
    padding: "0px 8px",
  },

  "& .MuiInput-inputAdornedStart": {
    height: "12px",
    background: "red",
  },
  // disabled
  "&:has(.MuiInputBase-root.Mui-disabled)": {
    opacity: "0.85",
  },
}));

const StyledSearchBar = React.forwardRef(
  ({ multiline = false, startAdornment, ...props }, ref) => {
    return (
      <SInput
        {...props}
        size="small"
        disableUnderline={true}
        margin="none"
        startAdornment={<Search />}
        multiline={multiline}
        sx={{
          ...(props.sx || {}),
          pointerEvents: props.readOnly ? "none" : "initial",
        }}
        ref={ref}
      />
    );
  }
);
export default StyledSearchBar;
