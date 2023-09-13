import { Box, Checkbox, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import StyledInput from "../../Component/StyledInput";
import StyledDatePicker from "../../Component/StyledDatePicker";
import StyledAutocomplete from "../../Component/StyledAutocomplete";

function StyledInputForm({
  label,
  type = "normal",
  inputProps,
  containerSx,
  typoSx,
  ...props
}) {
  const theme = useTheme();
  return (
    <Box sx={{ ...containerSx }}>
      <Stack gap={1}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            ...typoSx,
          }}
        >
          {label}
        </Typography>
        {type === "normal" && (
          <StyledInput
            {...props}
            inputProps={{
              ...(inputProps || {}),
            }}
            multiline={inputProps?.multiline}
          />
        )}
        {type === "date" && (
          <StyledDatePicker
            date={inputProps?.date}
            {...props}
            inputProps={{
              ...(inputProps || {}),
            }}
          />
        )}
        {type === "textarea" && (
          <StyledInput
            inputProps={{
              ...(inputProps || {}),
            }}
            multiline={inputProps?.multiline}
            sx={{
              height: "100px",

              "& .MuiInputBase-root": {
                height: "100%",
                paddingLeft: "18px",
                paddingRight: "18px",
              },

              "& textarea": {
                height: "100% !important",
                fontWeight: "500",
                fontSize: "15px",
                color: theme.palette.text.primary,
                ...(inputProps?.sx || {}),
              },
            }}
          />
        )}

        {type === "autoComplete" && (
          <Stack
            position="relative"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            gap="16px"
            flexWrap="wrap"
            minHeight="48px"
          >
            <StyledAutocomplete
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {inputProps.multiple && (
                      <Checkbox color="secondary" checked={selected} />
                    )}
                    <span>{props.key}</span>
                  </div>
                </li>
              )}
              disableCloseOnSelect={inputProps.multiple}
              blurOnSelect={!inputProps.multiple}
              {...(inputProps || {})}
              sx={{
                ...(inputProps.readOnly && { pointerEvents: "none" }),
                "&:has(.MuiInputBase-input:focus)": {
                  width: "100%",
                  // width: "370px",
                  top: 0,
                },
                ...(inputProps.sx || {}),
              }}
              readOnly={inputProps.readOnly}
            />
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

export default StyledInputForm;
