import { ToWords } from "to-words";
import { successMsg } from "../../Shared/SuccessMsg";
import { isNumber } from "lodash";

export const isVerifiedBill = (data) => {
  if (!data?.quantity) {
    successMsg("Please provide a quantity");
    return false;
  }
  // data.price data.amount
  if (!Number(data?.price) && !Number(data?.amount)) {
    successMsg("Please provide a unit price or total amount");
    return false;
  }

  // if (!data?.price) {
  //   successMsg("Please provide a unit price");
  //   return false;
  // }

  if (!data?.desc) {
    successMsg("Please provide a description");
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
  if (!data?.bills?.length) {
    successMsg("Please add atleast one bill");
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

export const getAmountInWord = (value) => {
  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        // can be used to override defaults for the selected locale
        name: "Taka",
        plural: "Taka",
        symbol: "৳",
        fractionalUnit: {
          name: "Poisa",
          plural: "Poisa",
          symbol: "",
        },
      },
    },
  });

  return toWords.convert(value);
};

export const getTotalAmount = (data) => {
  const totalAmount = data.reduce((accumulator, item) => {
    return Number(accumulator) + Number(item.amount);
  }, 0);

  return totalAmount;
};

export const generatedDataForbill = (data) => {
  const dues = data?.dues?.map((bill) => bill?._id);

  return {
    ...data,
    user: data?.user?._id,
    dues,
    // dues:,
  };
};

export const calculateDue = (bill) => {
  let due = bill?.totalAmount;

  if (isNumber(Number(bill?.advance))) due -= Number(bill?.advance);

  if (isNumber(Number(bill?.payment))) due -= Number(bill?.payment);

  return due;
};
