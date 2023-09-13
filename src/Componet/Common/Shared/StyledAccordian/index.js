import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

function StyledAccordion({ summery,children }) {
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {summery}
        </AccordionSummary>
        <AccordionDetails sx={{width:'100%'}}>
          {children}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default StyledAccordion;
