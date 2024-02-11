import {
  Box,
  Stack,
  Button,
  Drawer,
  Modal,
  createFilterOptions,
  debounce,
} from "@mui/material";

import * as API_URL from "../../../network/api";
import AXIOS from "../../../network/axios";

import { useEffect, useMemo, useState } from "react";
import ViewPdf from "./ViewPdf";

import StyledInputForm from "../../Common/Shared/StyledInputForm";
import PageTop from "../../Common/Component/PageTop";
import moment from "moment";
import { Add, RemoveRedEye, Save } from "@mui/icons-material";
import AddChallan from "./AddChallan";
import ChallanList from "./ChallanList";
import {
  AddNewGlobal,
  autoCompleteIsReadOnly,
  generatedDataForChallan,
  getBackButtonTitle,
  isVerifiedForPDF,
} from "./helpers";
import { useMutation, useQuery } from "react-query";
import { successMsg } from "../../Shared/SuccessMsg";
import { useParams } from "react-router-dom";
const initialData = {
  serialNo: 1,
  date: moment(new Date()).format("DD/MM/YYYY"),
  user: null,
  challans: [],
};

function ChallanPage() {
  const [open, setOpen] = useState(false);

  const [openAddChallan, setOpenAddChallan] = useState(false);

  const [challan, setChallan] = useState(initialData);

  const [searchKey, setSearchKey] = useState("");

  const [searchedUsersOptions, setSearchedUsersOptions] = useState([]);

  const params = useParams();

  const getChallanAPI = params?.id ? `${API_URL.CHALLAN}/${params.id}` : null;

  useEffect(() => {
    if (!params?.id) {
      setChallan({ ...initialData });
    }
  }, [params?.id]);

  const getChallanByIdQuery = useQuery(
    [getChallanAPI, params?.id],
    () => AXIOS.get(getChallanAPI),
    {
      onSuccess: (data) => {
        if (data?.status) {
          successMsg(data?.message, "success");

          setChallan({
            ...data?.challan,
            date: moment(data?.challan?.date).format("DD/MM/YYYY"),
          });
        }
      },
      onError: () => {
        setChallan({ ...initialData });
      },
      enabled: !!params?.id,
    }
  );

  // add challan query
  const addChallanQuery = useMutation(
    (data) => AXIOS.post(API_URL.CHALLAN, data),
    {
      onSuccess: (data) => {
        if (data?.status) {
          successMsg(data?.message, "success");

          setChallan({
            ...data?.challan,
            date: moment(data?.challan?.date).format("DD/MM/YYYY"),
          });
        } else {
          successMsg(data?.message);
        }
      },
    }
  );

  const updateChallanQuery = useMutation(
    (data) => AXIOS.put(`${API_URL.CHALLAN}/${challan?._id}`, data),
    {
      onSuccess: (data) => {
        if (data?.status) {
          successMsg(data?.message, "success");

          setChallan({
            ...data?.challan,
            date: moment(data?.challan?.date).format("DD/MM/YYYY"),
          });
        } else {
          successMsg(data?.message);
        }
      },
    }
  );

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

  // memoaization of user data
  const getUsers = useMemo(
    () =>
      debounce((value) => {
        setSearchKey(value);
        usersQuery.mutate();
      }, 300),

    []
  );

  // filtering user data
  const filterOptions = createFilterOptions({
    stringify: ({ name, email, _id, vatNo, phone }) =>
      `${name} ${email} ${_id} ${vatNo} ${phone}`,
  });

  // onChangeChallan
  const onChangeChallan = (e) => {
    setChallan((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  // onadd challan
  const addChallanHandler = (data) => {
    setChallan((prev) => {
      return {
        ...prev,
        challans: [...prev.challans, { ...data }],
      };
    });
  };

  // add or update challan
  const onSubmitChallanHandler = () => {
    if (isVerifiedForPDF(challan)) {
      const generatedData = generatedDataForChallan(challan);

      if (challan?._id) {
        updateChallanQuery.mutate(generatedData);
        return;
      }
      addChallanQuery.mutate(generatedData);
    }
  };

  return (
    <Box>
      <PageTop
        title="Create New Challan"
        backButtonLabel={
          params?.id
            ? `Back to ${getBackButtonTitle(challan?.user?.name)} profile page`
            : undefined
        }
        backTo={params?.id ? `/customer/${challan?.user?._id}` : undefined}
      />
      <AddNewGlobal
        title={"Challan"}
        setState={setChallan}
        initial={initialData}
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
            value: challan?.user || null,
            placeholder: "Choose user",
            noOptionsText: usersQuery?.isLoading ? "Loading..." : "No Users",
            filterOptions,
            getOptionLabel: (option) => {
              return challan?.user?._id === option?._id
                ? option?.name
                : `${option?.name} (${option?.phone})`;
            },
            isOptionEqualToValue: (option, value) => option?._id === value?._id,
            onChange: (e, v) => {
              setChallan((prev) => ({ ...prev, user: v }));
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
            value: challan?.date,
            onChange: onChangeChallan,
          }}
        />
      </Stack>

      <Stack>
        <StyledInputForm
          label={"Address"}
          type="normal"
          inputProps={{
            name: "address",
            value: challan?.user?.address,
            onChange: onChangeChallan,
            readOnly: true,
          }}
        />
      </Stack>

      <Stack
        marginTop={4}
        direction={"row"}
        justifyContent={"start"}
        alignContent={"start"}
      >
        <Button
          disableRipple
          variant="text"
          color="primary"
          startIcon={<Add />}
          sx={{ display: "flex", justifyContent: "start" }}
          onClick={() => setOpenAddChallan(true)}
        >
          Add Challan
        </Button>
      </Stack>

      <Box sx={{ marginBottom: "20px" }}>
        <ChallanList challans={challan?.challans} setChallan={setChallan} />
      </Box>

      <Stack direction={"row"} gap={4}>
        <Button
          disabled={addChallanQuery?.isLoading || updateChallanQuery?.isLoading}
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={() => {
            onSubmitChallanHandler();
          }}
        >
          SAVE
        </Button>
        {challan?._id && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<RemoveRedEye />}
            onClick={() => {
              setOpen(true);
            }}
          >
            View PDF
          </Button>
        )}
      </Stack>

      <Modal open={open} anchor="right">
        <ViewPdf data={challan} onClose={() => setOpen(false)} type="challan" />
      </Modal>

      <Drawer open={openAddChallan} anchor="right">
        <AddChallan
          addChallanHandler={addChallanHandler}
          onClose={() => setOpenAddChallan(false)}
        />
      </Drawer>
    </Box>
  );
}

export default ChallanPage;
