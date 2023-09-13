import React, { useState } from "react";

import StyledTable from "../../../Common/Component/StyledTable";

import {
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { Delete, Download, RemoveRedEye } from "@mui/icons-material";

import moment from "moment";

import ViewPdf from "../../AddChallan/ViewPdf";

import { PDFDownloadLink } from "@react-pdf/renderer";

import { MyDocument } from "../../../PdfGenerator";

import * as API_URL from "../../../../network/api";

import AXIOS from "../../../../network/axios";

import { useMutation, useQueryClient } from "react-query";

import ConfirmModal from "../../../Common/Component/ConfirmModal";

import { successMsg } from "../../../Shared/SuccessMsg";

import { useNavigate } from "react-router-dom";

import StyledPagination from "../../../Common/Component/Pagination";
import { getAddedDuesBillNO } from "./helpers";

function Table({ data = [], type, totalPages, queryParams, setQueryParams }) {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const [selectedData, setSelectedData] = useState({});

  const [openConfirm, setOpenConfirm] = useState(false);
  const [showindividual, setShowIndividual] = useState(false);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const api =
    type === "challan"
      ? API_URL.CHALLAN
      : type === "bill"
      ? API_URL.BILL
      : type === "transaction"
      ? API_URL.TRANSACTION
      : API_URL.QUOTATION;

  const deleteDataQuery = useMutation(
    () => AXIOS.delete(`${api}/${selectedData?._id}`),
    {
      onSuccess: (data) => {
        if (data.status) {
          successMsg(data?.message, "success");
          queryClient.invalidateQueries(api);
          setIsOpenConfirmModal(false);
        } else {
          successMsg(data?.message, "warn");
        }
      },
    }
  );

  const columns = [
    {
      type: ["challan"],
      id: 1,
      headerName: "Challan No",
      field: "challanNo",
      flex: 0.5,
      sortable: false,
      minWidth: 80,
      renderCell: ({ value }) => (
        <Typography variant="body4">{value}</Typography>
      ),
    },
    {
      type: ["bill"],
      id: 1,
      headerName: "Bill No",
      field: "billNo",
      flex: 0.5,
      sortable: false,
      minWidth: 80,
      renderCell: ({ value }) => (
        <Typography variant="body4">{value}</Typography>
      ),
    },
    {
      type: ["quotation"],
      id: 1,
      headerName: "Quotation No",
      field: "quotationNo",
      flex: 0.5,
      sortable: false,
      minWidth: 80,
      renderCell: ({ value }) => (
        <Typography variant="body4">{value}</Typography>
      ),
    },

    {
      type: ["challan", "bill", "quotation"],
      id: 3,
      headerName: "Date",
      field: "date",
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: ({ value }) => (
        <Typography variant="body4">
          {moment(value).format("DD MMMM, YYYY")}
        </Typography>
      ),
    },
    {
      type: ["challan", "bill", "quotation"],
      id: 3,
      headerName: "Description",
      field:
        type === "challan"
          ? "challans"
          : type === "bill"
          ? "bills"
          : "quotations",
      flex: 1,
      minWidth: 120,
      sortable: false,
      renderCell: ({ value }) => (
        <Typography
          variant="h6"
          sx={{
            textOverflow: "ellipsis",
            maxWidth: "300px",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >{`${value?.length > 0 ? value[0]?.desc : "_"}`}</Typography>
      ),
    },
    {
      type: ["bill"],
      id: 3,
      headerName: "Due",
      field: "due",
      flex: 1.5,
      minWidth: 120,
      sortable: false,
      renderCell: ({ value }) => (
        <Typography
          variant="h6"
          sx={{
            textOverflow: "ellipsis",
            maxWidth: "300px",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >
          {value}
        </Typography>
      ),
    },
    {
      type: ["bill"],
      id: 3,
      headerName: "Bill Added",
      field: "dues",
      flex: 1.5,
      minWidth: 120,
      sortable: false,
      renderCell: ({ value }) => (
        <Typography
          variant="h6"
          sx={{
            textOverflow: "ellipsis",
            maxWidth: "300px",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >
          {getAddedDuesBillNO(value)}
        </Typography>
      ),
    },
    {
      type: ["transaction"],
      id: 3,
      headerName: "Transaction ID",
      field: "transactionId",
      flex: 1.5,
      minWidth: 120,
      sortable: false,
      renderCell: ({ value }) => (
        <Typography
          variant="h6"
          sx={{
            textOverflow: "ellipsis",
            maxWidth: "300px",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >
          {value}
        </Typography>
      ),
    },
    {
      type: ["transaction"],
      id: 3,
      headerName: "Amount",
      field: "payment",
      flex: 1.5,
      minWidth: 120,
      sortable: false,
      renderCell: ({ value }) => (
        <Typography
          variant="h6"
          sx={{
            textOverflow: "ellipsis",
            maxWidth: "300px",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >
          {value}
        </Typography>
      ),
    },
    {
      type: ["transaction"],
      id: 3,
      headerName: "Date",
      field: "createdAt",
      flex: 1.5,
      minWidth: 120,
      sortable: false,
      renderCell: ({ value }) => (
        <Stack>
          <Typography
            variant="h6"
            sx={{
              textOverflow: "ellipsis",
              maxWidth: "300px",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            {moment(value).format("DD MMMM, YYYY")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textOverflow: "ellipsis",
              maxWidth: "300px",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            {moment(value).format("h:mm:ss A")}
          </Typography>
        </Stack>
      ),
    },
    {
      type: ["transaction"],
      id: 3,
      headerName: "ACTION",
      field: "action",
      flex: 0.5,
      minWidth: 120,
      sortable: false,
      headerAlign: "right",
      align: "right",
      renderCell: ({ row }) => (
        <Stack direction={"row"} gap={2}>
          <IconButton
            sx={{ width: 30, height: 30, color: theme.palette.primary.main }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedData(row);
              setIsOpenConfirmModal(true);
            }}
          >
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
    {
      type: ["challan", "bill", "quotation"],
      id: 3,
      headerName: "ACTION",
      field: "action",
      flex: 0.5,
      minWidth: 120,
      sortable: false,
      headerAlign: "right",
      align: "right",
      renderCell: ({ row }) => (
        <Stack direction={"row"} gap={2}>
          <IconButton
            sx={{ width: 30, height: 30, color: theme.palette.primary.main }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedData(row);
              if (type === "bill" && row?.dues?.length) {
                setOpenConfirm(true);
                return;
              }
              setOpen(true);
            }}
          >
            <RemoveRedEye />
          </IconButton>

          <IconButton
            sx={{ width: 30, height: 30, color: theme.palette.primary.main }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedData(row);
              setIsOpenConfirmModal(true);
            }}
          >
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box
      marginTop={4}
      sx={{
        borderRadius: "7px",
        padding: "0px 16px",
        border: `1px solid ${theme.palette.custom.border}`,
      }}
    >
      <StyledTable
        columns={columns.filter((col) => col.type.includes(type))}
        rows={data}
        getRowId={(row) => row?._id}
        getRowHeight={() => "auto"}
        onRowClick={({ row }) => {
          if (type !== "transaction") {
            const route = `/${type}/${row?._id}`;
            navigate(route);
          }
        }}
        sx={{
          "& .MuiDataGrid-row:hover": {
            backgroundColor: `${theme.palette.custom.border}!important`,
          },
          "& .MuiDataGrid-cell": {
            cursor: "pointer",
            padding: "8px 4px",
          },
        }}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No {type} found
            </Stack>
          ),
        }}
      />

      <Stack
        my={4}
        justifyContent={"center"}
        alignContent={"center"}
        width={"100%"}
        alignItems={{ xs: "center", md: "center" }}
      >
        <StyledPagination
          totalPage={totalPages}
          page={queryParams?.page}
          onChange={(_, page) => {
            console.log("page", page);
            setQueryParams((prev) => ({ ...prev, page }));
          }}
        />
      </Stack>

      <Modal open={open} anchor="right">
        <ViewPdf
          data={
            type === "bill"
              ? { ...selectedData, showIndividualDues: showindividual }
              : selectedData
          }
          onClose={() => setOpen(false)}
          type={type}
        />
      </Modal>

      <ConfirmModal
        message={"Do you want to show all dues individually?"}
        cancelButtonLabel="No"
        confirmButtonLabel="Yes"
        onCancel={() => {
          setShowIndividual(false);
          setOpen(true);
          setOpenConfirm(false);
        }}
        onConfirm={() => {
          setShowIndividual(true);
          setOpen(true);
          setOpenConfirm(false);
        }}
        isOpen={openConfirm}
      />

      <ConfirmModal
        sx={{ width: { xs: "96vw", md: "auto" } }}
        loading={deleteDataQuery?.isLoading}
        isOpen={isOpenConfirmModal}
        message={`Are you sure you want to delete this ${type}?`}
        onCancel={() => setIsOpenConfirmModal(false)}
        onConfirm={() => deleteDataQuery.mutate()}
      />
    </Box>
  );
}

export default Table;
