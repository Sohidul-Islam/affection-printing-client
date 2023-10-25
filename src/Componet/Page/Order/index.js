/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import * as API_URL from "../../../network/api";
import { useMutation } from "react-query";
import AXIOS from "../../../network/axios";
import {
  Box,
  Button,
  Drawer,
  Modal,
  Stack,
  createFilterOptions,
  debounce,
} from "@mui/material";
import PageTop from "../../Common/Component/PageTop";
import {
  autoCompleteIsReadOnly,
  getBackButtonTitle,
} from "../AddChallan/helpers";
import StyledInputForm from "../../Common/Shared/StyledInputForm";
import { Add, RemoveRedEye, Save } from "@mui/icons-material";
import AddQuotation from "./AddQuotation/AddQuotation";
import QuotationList from "./QuotationList";
import ViewPdf from "../AddChallan/ViewPdf";

const initialData = {
  serialNo: 1,
  date: moment(new Date()).format("DD/MM/YYYY"),
  user: null,
  subject: "",
  qutations: [
    {
      id: 1,
      title: "Test",
      topics: [
        {
          id: 1,
          title: "page",
          desc: "dsfasdf",
        },
        {
          id: 2,
          title: "Size",
          desc: "asdfasdf",
        },
        {
          id: 3,
          title: "Packet",
          desc: "asdfasdf",
        },
      ],
      quantity: "",
      unitPrice: "",
      totalPrice: "",
      priceList: [
        {
          id: 1,
          quantity: "121",
          unitPrice: "43",
          totalPrice: 5203,
        },
        {
          id: 2,
          quantity: "45",
          unitPrice: "212",
          totalPrice: 9540,
        },
      ],
    },
    {
      id: 2,
      title: "A4 size paper",
      topics: [
        {
          id: 1,
          title: "page",
          desc: "Adlkasdj fals;djfals;djkfal;sdjkflwkejfopasijfasewfasdf asdfkasjdfl; jkasdfjwoefjasldfjasl;djfkasl;d",
        },
        {
          id: 2,
          title: "Size",
          desc: "asdfasdf",
        },
        {
          id: 3,
          title: "Packet",
          desc: "asdfasdf",
        },
      ],
      quantity: "",
      unitPrice: "",
      totalPrice: "",
      priceList: [
        {
          id: 1,
          quantity: "121",
          unitPrice: "43",
          totalPrice: 5203,
        },
        {
          id: 2,
          quantity: "45",
          unitPrice: "212",
          totalPrice: 9540,
        },
      ],
    },
  ],
};

function Quotation() {
  const [quotation, setQuotation] = useState(initialData);

  const [searchKey, setSearchKey] = useState("");

  const [searchedUsersOptions, setSearchedUsersOptions] = useState([]);

  const [openAddQuotation, setOpenAddQuotation] = useState("");

  // const [openConfirm, setOpenConfirm] = useState(false);

  const [open, setOpen] = useState(false);

  const addQuotaionHandler = (item) => {
    setQuotation((prev) => ({
      ...prev,
      qutations: [...prev?.qutations, item],
    }));
  };

  // onChangeChallan
  const onChangeChallan = (e) => {
    setQuotation((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const params = useParams();
  // get users query
  const usersQuery = useMutation(
    () =>
      AXIOS.get(API_URL.USERS, {
        params: {
          page: 1,
          pageSize: 15,
          searchKey: searchKey,
        },
      }),
    {
      onSuccess: (data) => {
        if (data?.status) {
          setSearchedUsersOptions((prev) => {
            console.log(
              "userData",
              data?.users?.length > 0 ? data?.users : prev
            );
            return data?.users?.length > 0 ? data?.users : prev;
          });
        }
      },
    }
  );
  const getUsers = useMemo(
    () =>
      debounce((value) => {
        setSearchKey(value);
        usersQuery.mutate();
      }, 300),

    []
  );
  // const getChallanAPI = params?.id ? `${API_URL.CHALLAN}/${params.id}` : null;

  // filtering user data
  const filterOptions = createFilterOptions({
    stringify: ({ name, email, _id, vatNo, phone }) =>
      `${name} ${email} ${_id} ${vatNo} ${phone}`,
  });

  return (
    <Box>
      <PageTop
        title="Create New Quotation"
        backButtonLabel={
          params?.id
            ? `Back to ${getBackButtonTitle(
                quotation?.user?.name
              )} profile page`
            : undefined
        }
        backTo={params?.id ? `/customer/${quotation?.user?._id}` : undefined}
      />
      <Stack
        gap={4}
        direction={{
          xs: "column",
          md: "row",
        }}
        flexWrap={"wrap"}
      >
        <StyledInputForm
          containerSx={{
            flex: 1,
          }}
          // options={top100Films}
          label={"Name"}
          type="autoComplete"
          inputProps={{
            multiple: false,
            maxHeight: "110px",
            options: searchedUsersOptions,
            value: quotation?.user,
            placeholder: "Choose user",
            noOptionsText: usersQuery?.isLoading ? "Loading..." : "No Users",
            filterOptions,
            getOptionLabel: (option) => {
              return quotation?.user?._id === option?._id
                ? option?.name
                : `${option?.name} (${option?.phone})`;
            },
            isOptionEqualToValue: (option, value) => option?._id === value?._id,
            onChange: (e, v) => {
              setQuotation((prev) => ({ ...prev, user: v }));
            },
            onInputChange: (e) => {
              getUsers(e?.target?.value);
            },
            readOnly: autoCompleteIsReadOnly(params?.id),
            sx: {
              width: "100%",
              "& .MuiFormControl-root": {
                minWidth: "100%",
              },
            },
          }}
        />
        <StyledInputForm
          containerSx={{
            flex: 1,
          }}
          label={"Date"}
          type="date"
          inputProps={{
            name: "date",
            value: quotation?.date,
            onChange: onChangeChallan,
          }}
        />
        <StyledInputForm
          containerSx={{
            flex: 1,
          }}
          label={"Subject"}
          type="normal"
          inputProps={{
            name: "subject",
            value: quotation?.subject,
            onChange: onChangeChallan,
          }}
        />
      </Stack>

      <QuotationList quotation={quotation} setQuotation={setQuotation} />

      <Stack my={4}>
        <Button
          disableRipple
          variant="text"
          color="primary"
          startIcon={<Add />}
          sx={{ display: "flex", justifyContent: "start" }}
          onClick={() => setOpenAddQuotation(true)}
        >
          Add Qutation
        </Button>
      </Stack>
      <Stack direction={"row"} gap={4}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={() => {
            // onSubmitbillHandler();
          }}
        >
          SAVE
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RemoveRedEye />}
          // disabled={bill?.alreadyAdded}
          onClick={() => {
            setOpen(true);
          }}
        >
          View PDF
        </Button>
      </Stack>
      <Drawer open={openAddQuotation} anchor="right">
        <AddQuotation
          addQuotaionHandler={addQuotaionHandler}
          onClose={() => setOpenAddQuotation(false)}
          setQutation={setQuotation}
          qutation={quotation}
        />
      </Drawer>

      <Modal open={open} anchor="right">
        <ViewPdf
          data={{ ...quotation }}
          onClose={() => setOpen(false)}
          type="quotation"
        />
      </Modal>
    </Box>
  );
}

export default Quotation;
