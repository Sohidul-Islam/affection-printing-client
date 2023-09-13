import { Modal, Stack } from "@mui/material";
import React, { useState } from "react";
import StyledTabs from "../../../Common/Component/StyledTab";
import Table from "./Table";
import SearchContainer from "./../../Customers/SearchContainer";
import { initialQueryParam } from "./../../Customers/helpers";
import { useQuery } from "react-query";
import * as API_URL from "./../../../../network/api";
import AXIOS from "./../../../../network/axios";
import { generatedTableData } from "./helpers";
import TableSkeleton from "./TableSkeleton";
import { useParams } from "react-router-dom";
import MakePayment from "./MakePayment";

const userActivityTabList = [
  {
    label: "Challan",
    value: "challan",
  },
  {
    label: "Bill",
    value: "bill",
  },
  {
    label: "Quotation",
    value: "quotation",
  },
  {
    label: "Transaction",
    value: "transaction",
  },
];

function UserActivityTabs() {
  const [currentTab, setCurrentTab] = useState("challan");

  const params = useParams();

  const [open, setOpen] = useState(false);

  const [totalPages, setTotalPages] = useState(1);

  const [queryParams, setQueryParams] = useState({
    ...initialQueryParam,
    userId: params?.id,
  });

  const api =
    currentTab === "challan"
      ? API_URL.CHALLAN
      : currentTab === "bill"
      ? API_URL.BILL
      : currentTab === "transaction"
      ? API_URL.TRANSACTION
      : API_URL.QUOTATION;

  const getDataForTable = useQuery(
    [api, { ...queryParams }],
    () =>
      AXIOS.get(api, {
        params: { ...queryParams },
      }),
    {
      onSuccess: (data) => {
        if (data?.status) {
          setTotalPages(data?.paginatedData?.totalPages || 1);
        }
      },
    }
  );

  return (
    <Stack marginTop={8} marginBottom={10} gap={7}>
      <StyledTabs
        options={userActivityTabList}
        onChange={(value) => {
          setCurrentTab(value);
        }}
        value={currentTab}
      />

      <Stack>
        <SearchContainer
          setQueryParams={setQueryParams}
          addButtonLabel="Payment"
          onAdd={() => {
            setOpen(true);
          }}
        />
        {getDataForTable?.isLoading ? (
          <TableSkeleton />
        ) : (
          <Table
            totalPages={totalPages}
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            type={currentTab}
            data={generatedTableData(getDataForTable?.data, currentTab)}
          />
        )}
      </Stack>

      <Modal open={open}>
        <MakePayment
          onClose={() => {
            setOpen(false);
          }}
        />
      </Modal>
    </Stack>
  );
}

export default UserActivityTabs;
