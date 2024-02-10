import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import React, { useState } from "react";
import UserAvater from "./UserAvater";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import adminImage from "../../../assets/Image/adminpanelimage.avif";

const userCardSx = {
  // width: { lg: "295px", xs: "100%" },
  maxWidth: { md: "295px", xs: "100%" },
  height: "60px",
  flex: 1,
  borderRadius: "16px",
  background: "#FFF",

  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",

  padding: "16px 9px",
};

function UserCard({
  user,
  getCurrentUser,
  onClickDeleteButton,
  disabledDeleteBtn,
  disabledEditBtn,
  disableNavigate,
  isAdmin,
}) {
  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();
  return (
    <Tooltip title={isAdmin ? "Admin" : "Customer"} followCursor>
      <Box
        // onClick={() => setIsAnimate(!isAnimate)}
        onMouseEnter={() => setIsAnimate(true)}
        onMouseLeave={() => setTimeout(() => setIsAnimate(false), 300)}
        sx={{
          ...userCardSx,

          position: "relative",
          left: 0,
        }}
      >
        <Stack
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"start"}
        >
          <UserAvater
            onClickPrimaryText={() => {
              if (!disableNavigate) navigate(`/customer/${user?._id}`);
            }}
            primaryText={user?.name}
            secondaryText={user?.email}
            tertiaryText={user?.phone}
            imageUrl={user?.image}
          />
        </Stack>

        <Box
          sx={{
            borderTopRightRadius: "16px",
            borderBottomRightRadius: "16px",
            background: "rgba(0,0,0,0.1)",
            backdropFilter: "blur(10px)",
            width: 80,
            height: "100%",
            position: "absolute",
            right: 0,
            top: 0,
            transition: "transform 0.3s, opacity 0.3s", // Add CSS transition
            transform: isAnimate ? "translateX(0)" : "translateX(-50%)",
            opacity: isAnimate ? 1 : 0,
            pointerEvents: isAnimate ? "auto" : "none", // Control clickability
          }}
        >
          <Stack
            alignItems={"center"}
            justifyContent={"space-between"}
            // alignContent={"space-between"}
            height={"100%"}
          >
            <IconButton
              onClick={() => getCurrentUser(user)}
              aria-label="delete"
              sx={{ width: 40, height: 40 }}
              disabled={disabledEditBtn}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => onClickDeleteButton(user)}
              aria-label="delete"
              sx={{ width: 40, height: 40 }}
              disabled={disabledDeleteBtn}
            >
              <Delete />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Tooltip>
  );
}

export default UserCard;
