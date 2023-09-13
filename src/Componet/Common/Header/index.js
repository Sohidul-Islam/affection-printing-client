import React, { useState } from "react";

import { Box, Drawer } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box>
        <TopBar setOpen={setOpen}/>
      </Box>

      <Drawer open={open} anchor="left" onClose={()=>setOpen(false)}>
        <SideBar/>
      </Drawer>
    </Box>
  );
}

export default Header;
