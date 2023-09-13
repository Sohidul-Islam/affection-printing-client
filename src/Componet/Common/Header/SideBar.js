import { Box, Button, Stack, useTheme } from "@mui/material";
import React from "react";
import { menuList } from "./helpers";
import logo from "../../../assets/Image/logo.svg";
import { Link, useLocation } from "react-router-dom";
function SideBar({ onClose }) {
  const theme = useTheme();
  const linksx = {
    width: "100%",
    transition: "all 0.5s ease-in-out",
    padding: "8px 12px",
    "&:hover": {
      background: theme.palette.info.main,
      "& button": { color: theme.palette.primary.contrastText },
    },
  };
  const linkActivesx = {
    width: "100%",
    transition: "all 0.5s ease-in-out",
    padding: "8px 12px",
    background: theme.palette.info.main,
  };
  const location = useLocation();
  return (
    <Box sx={{ width: "200px", padding: "20px 0px" }}>
      <Box px={5}>
        <img src={logo} alt={"img_logo"} />
      </Box>
      <Stack alignItems="start" mt={6} gap={1}>
        {menuList.map((item, index) => (
          <Link
            to={item?.path}
            key={index}
            style={location?.pathname === item?.path ? linkActivesx : linksx}
          >
            <Button
              disableRipple
              variant="text"
              startIcon={item?.icon}
              sx={{
                color:
                  location?.pathname === item?.path
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                fontWeight: "500",
                fontSize: "16px",
                transition: "all 0.5s ease-in-out",
              }}
            >
              {item?.label}
            </Button>
          </Link>
        ))}
      </Stack>
    </Box>
  );
}

export default SideBar;
