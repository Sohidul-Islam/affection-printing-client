import {
  Box,
  Stack,
  Typography,
  Button,
  Drawer,
  Modal,
  debounce,
  createFilterOptions,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";

import StyledInputForm from "../../Common/Shared/StyledInputForm";
import PageTop from "../../Common/Component/PageTop";
import moment from "moment";
import { Add, RemoveRedEye, Save } from "@mui/icons-material";
import AddBill from "./AddBill";
import BillList from "./BillList";
import {
  calculateDue,
  generatedDataForbill,
  getAmountInWord,
  getTotalAmount,
  isVerifiedForPDF,
} from "./helpers";

import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import AXIOS from "../../../network/axios";
import { successMsg } from "../../Shared/SuccessMsg";
import * as API_URL from "../../../network/api";
import ViewPdf from "./../AddChallan/ViewPdf";
import {
  autoCompleteIsReadOnly,
  getBackButtonTitle,
} from "../AddChallan/helpers";
import StyledCheckBox from "../../Common/Shared/CheckBox";
import AddDues from "./Dues/AddDues";
import ConfirmModal from "../../Common/Component/ConfirmModal";
const initialData = {
  date: moment(new Date()).format("DD/MM/YYYY"),
  user: {},
  advance: 0,
  due: 0,
  dues: [],
  totalAmount: 0,
  prevAdvance: 0,
  payment: 0,
  isDistinct: false,
  isFullPaid: false,
  bills: [],
  alreadyAdded: false,
};
function AddBills() {
  const [open, setOpen] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openAddbill, setOpenAddbill] = useState(false);

  const [openDue, setOpenDue] = useState(false);

  const [showindividual, setShowIndividual] = useState(false);

  const [bill, setBill] = useState({ ...initialData });

  const [totalDue, setTotalDue] = useState(0);

  const onChangeBill = (e) => {
    if (e.target.name === "advance" || e.target.name === "payment") {
      setBill((prev) => {
        const totalAmount = getTotalAmount(prev.bills);

        /* 
        here we calculate the due of this bill
        */

        const due = calculateDue({
          ...prev,
          totalAmount: totalAmount,
          [e.target.name]: e.target.value,
        });

        const prevAdvance =
          e.target.name === "advance" ? e.target.value : prev?.prevAdvance;
        return {
          ...prev,
          due,
          totalAmount,
          [e.target.name]: e.target.value,
          prevAdvance,
        };
      });
    } else {
      setBill((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const addBillsHandler = (data) => {
    setBill((prev) => {
      // const amount =
      //   data?.price > 0 ? data?.price * data?.quantity : data?.amount;
      const totalAmount = getTotalAmount([...prev.bills, { ...data }]);

      const due = calculateDue({ ...prev, totalAmount });

      return {
        ...prev,
        totalAmount: totalAmount,
        due,
        bills: [...prev.bills, { ...data }],
      };
    });
  };

  const [searchKey, setSearchKey] = useState("");

  const [searchedUsersOptions, setSearchedUsersOptions] = useState([]);

  const params = useParams();

  const getbillAPI = params?.id ? `${API_URL.BILL}/${params.id}` : null;

  useEffect(() => {
    if (!params?.id) {
      setBill({ ...initialData });
    }
  }, [params?.id]);

  const getbillByIdQuery = useQuery(
    [getbillAPI, params?.id],
    () => AXIOS.get(getbillAPI),
    {
      onSuccess: (data) => {
        if (data?.status) {
          successMsg(data?.message, "success");
          console.log("data===>bill", data?.bill?.dues);
          setTotalDue(
            data?.bill?.dues?.reduce((acc, item) => acc + item?.due, 0) || 0
          );
          setBill({
            ...data?.bill,
            date: moment(data?.bill?.date).format("DD/MM/YYYY"),
          });
        }
      },
      onError: () => {
        setBill({ ...initialData });
      },
      enabled: !!params?.id,
    }
  );

  // add bill query
  const addbillQuery = useMutation((data) => AXIOS.post(API_URL.BILL, data), {
    onSuccess: (data) => {
      if (data?.status) {
        successMsg(data?.message, "success");

        setBill({
          ...data?.bill,
          date: moment(data?.bill?.date).format("DD/MM/YYYY"),
        });
      } else {
        successMsg(data?.message);
      }
    },
  });

  const updatebillQuery = useMutation(
    (data) => AXIOS.put(`${API_URL.BILL}/${bill?._id}`, data),
    {
      onSuccess: (data) => {
        if (data?.status) {
          successMsg(data?.message, "success");

          setBill({
            ...data?.bill,
            date: moment(data?.bill?.date).format("DD/MM/YYYY"),
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

  // add or update bill
  const onSubmitbillHandler = () => {
    if (isVerifiedForPDF(bill)) {
      const generatedData = generatedDataForbill(bill);

      if (bill?._id) {
        updatebillQuery.mutate({ ...generatedData, method: "edit" });
        return;
      }
      addbillQuery.mutate({ ...generatedData, method: "add" });
    }
  };

  const addDuesHandler = (selectedDues) => {
    setBill((prev) => {
      setTotalDue(selectedDues?.reduce((acc, item) => acc + item?.due, 0));

      return {
        ...prev,
        dues: [...selectedDues],
      };
    });
    setOpenDue(false);
  };

  const fullPaidHandler = () => {
    setBill((prev) => {
      const isFullPaid = !prev?.isFullPaid;
      const due = isFullPaid ? 0 : prev?.totalAmount - prev?.prevAdvance;

      const payment = isFullPaid ? prev?.totalAmount : 0;
      const advance = isFullPaid ? 0 : prev?.prevAdvance;

      return { ...prev, isFullPaid, due, advance, payment };
    });
  };

  return (
    <Box>
      <PageTop
        title="Create Bill"
        backButtonLabel={
          params?.id
            ? `Back to ${getBackButtonTitle(bill?.user?.name)} profile page`
            : undefined
        }
        backTo={params?.id ? `/customer/${bill?.user?._id}` : undefined}
      />

      {/* user search here */}
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
            value: bill?.user,
            placeholder: "Choose user",
            noOptionsText: usersQuery?.isLoading ? "Loading..." : "No Users",
            filterOptions,
            getOptionLabel: (option) => {
              return bill?.user?._id === option?._id
                ? option?.name
                : `${option?.name} (${option?.phone})`;
            },
            isOptionEqualToValue: (option, value) => option?._id === value?._id,
            onChange: (e, v) => {
              setBill((prev) => ({ ...prev, user: v }));
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

        {/* Date */}
        <StyledInputForm
          containerSx={{
            flex: 1,
          }}
          label={"Date"}
          type="date"
          readOnly={bill?.alreadyAdded}
          inputProps={{
            name: "date",
            value: bill?.date,
            onChange: onChangeBill,
          }}
        />
      </Stack>

      {/* Address */}
      <Stack>
        <StyledInputForm
          label={"Address"}
          type="normal"
          inputProps={{
            name: "address",
            value: bill?.user?.address,
            onChange: onChangeBill,
            readOnly: true,
          }}
        />
      </Stack>

      {/* Advance */}
      <Stack>
        <StyledInputForm
          label={"Advance"}
          type="normal"
          inputProps={{
            name: "advance",
            type: "number",
            min: 0,
            value: bill?.advance,
            onChange: onChangeBill,
            readOnly: bill?.alreadyAdded,
          }}
        />
      </Stack>

      {/* Total amount */}
      <Stack>
        <StyledInputForm
          label={"Payment"}
          type="normal"
          inputProps={{
            name: "payment",
            type: "number",
            min: 0,
            value: bill?.payment,
            onChange: onChangeBill,
            readOnly: bill?.alreadyAdded,
          }}
        />
      </Stack>

      {/* Total amount */}
      <Stack gap={4} marginBottom={5} marginTop={5}>
        <Box>
          <Typography variant="h5">Total Amount</Typography>
          <Typography
            variant="body2"
            sx={{
              overflowWrap: "break-word",
            }}
          >
            {bill?.totalAmount}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5">Taka (in words)</Typography>
          <Typography
            variant="body2"
            sx={{
              overflowWrap: "break-word",
            }}
          >
            {getAmountInWord(bill?.totalAmount)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5">Advance</Typography>
          <Typography
            variant="body2"
            sx={{
              overflowWrap: "break-word",
            }}
          >
            {bill?.advance}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5">Due</Typography>
          <Typography
            variant="body2"
            sx={{
              overflowWrap: "break-word",
            }}
          >
            {bill?.due}
          </Typography>
        </Box>

        <Stack gap={2}>
          <StyledCheckBox
            sx={{ width: 8, height: 8 }}
            label="Full paid"
            checked={bill?.isFullPaid}
            onChange={fullPaidHandler}
            disabled={bill?.alreadyAdded}
          />

          <StyledCheckBox
            sx={{ width: 8, height: 8 }}
            label="Individual Bill"
            checked={bill?.isDistinct}
            disabled={bill?.alreadyAdded}
            onChange={() => {
              setBill((prev) => ({ ...prev, isDistinct: !prev?.isDistinct }));
            }}
          />
        </Stack>
      </Stack>
      <Stack
        marginTop={4}
        gap={3}
        direction={"column"}
        justifyContent={"start"}
        alignContent={"start"}
      >
        <Button
          disableRipple
          variant="text"
          color="primary"
          disabled={bill?.alreadyAdded}
          startIcon={<Add />}
          sx={{ display: "flex", justifyContent: "start" }}
          onClick={() => setOpenAddbill(true)}
        >
          Add Bill
        </Button>

        {bill?.user?._id && (
          <Button
            disableRipple
            disabled={bill?.alreadyAdded}
            variant="text"
            color="primary"
            startIcon={<Add />}
            sx={{ display: "flex", justifyContent: "start" }}
            onClick={() => setOpenDue(true)}
          >
            Add Due (Total due Added: {totalDue})
          </Button>
        )}
      </Stack>

      <Box sx={{ marginBottom: "20px" }}>
        <BillList
          bills={bill?.bills}
          isReadOnly={bill?.alreadyAdded}
          setBills={setBill}
        />
      </Box>

      <Stack direction={"row"} gap={4}>
        <Button
          disabled={
            addbillQuery?.isLoading ||
            updatebillQuery?.isLoading ||
            bill?.alreadyAdded
          }
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={() => {
            onSubmitbillHandler();
          }}
        >
          SAVE
        </Button>
        {bill?._id && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<RemoveRedEye />}
            disabled={bill?.alreadyAdded}
            onClick={() => {
              if (bill?.dues?.length) {
                setOpenConfirm(true);
                return;
              }

              setOpen(true);
            }}
          >
            View PDF
          </Button>
        )}
      </Stack>

      <Modal open={open} anchor="right">
        <ViewPdf
          data={{ ...bill, showIndividualDues: showindividual }}
          onClose={() => setOpen(false)}
          type="bill"
        />
      </Modal>

      <Drawer open={openAddbill} anchor="right">
        <AddBill
          addBillHandler={addBillsHandler}
          onClose={() => setOpenAddbill(false)}
        />
      </Drawer>

      <Drawer open={openDue} anchor="right">
        <AddDues
          // dues={[]}
          dues={bill?.dues || []}
          queryParams={{
            userId: bill?.user?._id,
            isDistinct: bill?.isDistinct,
            ignoreBill: bill?._id,
            // alreadyAdded: false,
          }}
          addDuesHandler={addDuesHandler}
          onClose={() => setOpenDue(false)}
        />
      </Drawer>

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
    </Box>
  );
}

export default AddBills;
