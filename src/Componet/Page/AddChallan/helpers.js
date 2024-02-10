import moment from "moment";
import { successMsg } from "../../Shared/SuccessMsg";
import { Button, Stack } from "@mui/material";
import { Add, NewReleases, Newspaper } from "@mui/icons-material";
import { set } from "lodash";

export const isVerifiedChallan = (data) => {
  if (!data?.quantity) {
    successMsg("Please Provide a quantity");
    return false;
  }

  if (!data?.desc) {
    successMsg("Please Provide a Description");
    return false;
  }
  return true;
};

export const isVerifiedForPDF = (data) => {
  if (!data?.user?.name) {
    successMsg("Please provide name");
    return false;
  }

  if (!data?.user?.address) {
    successMsg("Please provide address");
    return false;
  }
  if (!data?.date) {
    successMsg("Please provide data");
    return false;
  }
  if (!data?.challans?.length) {
    successMsg("Please add challan");
    return false;
  }
  return true;
};

export const deleteDataByKey = (data, key, value) => {
  if (key !== "index") {
    return data.filter((oldData) => oldData[key] !== value);
  }

  data.splice(key, 1);
  return data;
};

export const editDataByKey = (data, index, value) => {
  data[index] = { ...value };
  return data;
};

export const generatedDataForChallan = (data) => {
  return { ...data, user: data?.user?._id };
};

export const autoCompleteIsReadOnly = (id) => {
  if (id) return true;
  return false;
};

export const getBackButtonTitle = (title) => {
  if (title) {
    let newTitle = title.toLowerCase();
    let firstCharacter = newTitle[0].toUpperCase();
    return firstCharacter + newTitle.substring(1);
  }
};

export const getPdfFileName = (data, type) => {
  const date = new Date();
  const fileType = {
    challan: "challanNo",
    bill: "billNo",
    quotation: "quotationNo",
  };

  const fileName = `${type}-${data[fileType[type]]}-${moment(date).format(
    "DD-MM-YYYY-HH-mm-ss"
  )}.pdf`;

  return fileName;
};

export const AddNewGlobal = ({ title, initial, setState }) => {
  const onClick = () => {
    if (setState) setState((prev) => ({ ...initial, user: prev?.user }));
  };
  return (
    <Stack justifyContent={"flex-end"} direction={"row"}>
      <Button
        startIcon={<Add />}
        variant="contained"
        size="small"
        onClick={onClick}
      >
        Create New {title}
      </Button>
    </Stack>
  );
};
