import React from "react";
import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import PdfGenerator, { MyDocument } from "../../PdfGenerator";

import ModalContainer from "../../Common/ModalContainer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { getPdfFileName } from "./helpers";
import { Download } from "@mui/icons-material";

function ViewPdf({ onClose, data, type }) {
  const theme = useTheme();
  return (
    <ModalContainer title={"View PDF"} onClose={onClose}>
      <PDFDownloadLink
        style={{
          cursor: "pointer",
          color: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
        document={<MyDocument data={data} type={type} />}
        fileName={getPdfFileName(data, type)}
      >
        {({ loading }) => {
          return (
            <Button
              startIcon={
                loading ? (
                  <CircularProgress size={16} thickness={4} />
                ) : (
                  <Download />
                )
              }
              variant="text"
              color="primary"
              sx={{ padding: "10px 20px", textDecoration: "none" }}
            >
              {getPdfFileName(data, type)}
            </Button>
          );
        }}
      </PDFDownloadLink>

      <Box sx={{ width: "100%", height: "100%" }}>
        <PdfGenerator data={data} type={type} />
      </Box>
    </ModalContainer>
  );
}

export default ViewPdf;
