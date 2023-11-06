/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import * as API_URL from "../../../network/api";
import { useMutation, useQuery } from "react-query";
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
import { validateOrder } from "./helpers";
import { successMsg } from "../../Shared/SuccessMsg";

const initialData = {
  serialNo: 1,
  date: moment(new Date()).format("DD/MM/YYYY"),
  user: null,
  subject: "",
  quotations: [],
  note: "Including TAX",
};

function Quotation() {
  const [quotation, setQuotation] = useState(initialData);

  const [searchKey, setSearchKey] = useState("");

  const [searchedUsersOptions, setSearchedUsersOptions] = useState([]);

  const [openAddQuotation, setOpenAddQuotation] = useState("");

  const [open, setOpen] = useState(false);
  const params = useParams();

  const getQuotationAPI = params?.id
    ? `${API_URL.QUOTATION}/${params.id}`
    : null;

  useEffect(() => {
    if (!params?.id) {
      setQuotation({ ...initialData });
    }
  }, [params?.id]);

  const addQuotaionHandler = (item) => {
    setQuotation((prev) => ({
      ...prev,
      quotations: [...prev?.quotations, item],
    }));
  };

  // onChangeChallan
  const onChangeQuotation = (e) => {
    setQuotation((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

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

  const getQuotationByIdQuery = useQuery(
    [getQuotationAPI, params?.id],
    () => AXIOS.get(getQuotationAPI),
    {
      onSuccess: (data) => {
        if (data?.status) {
          successMsg(data?.message, "success");

          setQuotation({
            ...data?.quotation,
            date: moment(data?.quotation?.date).format("DD/MM/YYYY"),
          });
        }
      },
      onError: () => {
        setQuotation({ ...initialData });
      },
      enabled: !!params?.id,
    }
  );

  // add challan query
  const addQuotationQuery = useMutation(
    (data) => AXIOS.post(API_URL.QUOTATION, data),
    {
      onSuccess: (data) => {
        if (data?.status) {
          successMsg(data?.message, "success");

          console.log("data?.quotation add", data?.quotation);

          setQuotation((prev) => ({
            ...prev,
            ...data?.quotation,
            date: moment(data?.quotation?.date).format("DD/MM/YYYY"),
          }));
        } else {
          successMsg(data?.message);
        }
      },
    }
  );

  const updateQuotationQuery = useMutation(
    (data) => AXIOS.put(`${API_URL.QUOTATION}/${quotation?._id}`, data),
    {
      onSuccess: (data) => {
        if (data?.status) {
          successMsg(data?.message, "success");

          console.log("data?.quotation", data?.quotation);

          setQuotation((prev) => ({
            ...prev,
            ...data?.quotation,
            date: moment(data?.quotation?.date).format("DD/MM/YYYY"),
          }));
        } else {
          successMsg(data?.message);
        }
      },
    }
  );

  // filtering user data
  const filterOptions = createFilterOptions({
    stringify: ({ name, email, _id, vatNo, phone }) =>
      `${name} ${email} ${_id} ${vatNo} ${phone}`,
  });

  const onSubmitbillHandler = () => {
    const validate = validateOrder(quotation);

    if (validate?.status) {
      if (quotation?._id) {
        updateQuotationQuery.mutate(validate?.data);
        return;
      }
      addQuotationQuery.mutate(validate?.data);
    }
  };

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
            onChange: onChangeQuotation,
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
            onChange: onChangeQuotation,
          }}
        />
      </Stack>

      <Stack>
        <StyledInputForm
          label={"Address"}
          type="normal"
          inputProps={{
            name: "address",
            value: quotation?.user?.address,
            readOnly: true,
          }}
        />
      </Stack>

      <Stack>
        <StyledInputForm
          label={"Notes (Optional)"}
          type="normal"
          inputProps={{
            name: "note",
            value: quotation?.note,
            onChange: onChangeQuotation,
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
          disabled={
            addQuotationQuery?.isLoading || updateQuotationQuery?.isLoading
          }
          startIcon={<Save />}
          onClick={() => {
            onSubmitbillHandler();
          }}
        >
          SAVE
        </Button>

        {quotation?._id && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<RemoveRedEye />}
            disabled={
              addQuotationQuery?.isLoading || updateQuotationQuery?.isLoading
            }
            onClick={() => {
              setOpen(true);
            }}
          >
            View PDF
          </Button>
        )}
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
