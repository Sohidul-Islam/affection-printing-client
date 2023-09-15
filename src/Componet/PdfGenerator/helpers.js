import moment from "moment";
import { convertStringToDate } from "../Common/Component/helpers";

export const staticData = {
  challanNo: 1,
  date: "15/07/2023",
  name: "Sohidul Islam",
  address: "Basabo, Dhaka",
  challans: [
    {
      serialNo: 1,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not ",
      quantity: 10000000,
      remark: "2 packets",
    },
    {
      serialNo: 2,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled .",
      quantity: 4,
      remark: "2 packets",
    },
    {
      serialNo: 2,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled .",
      quantity: 4,
      remark: "2 packets",
    },
    {
      serialNo: 2,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled .",
      quantity: 4,
      remark: "2 packets",
    },
    {
      serialNo: 2,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled .",
      quantity: 4,
      remark: "2 packets",
    },
    {
      serialNo: 2,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled .",
      quantity: 4,
      remark: "2 packets",
    },
    {
      serialNo: 2,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled .",
      quantity: 4,
      remark: "2 packets",
    },
    {
      serialNo: 2,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled .",
      quantity: 4,
      remark: "2 packets",
    },
    {
      serialNo: 2,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled .",
      quantity: 4,
      remark: "2 packets",
    },
    {
      serialNo: 2,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled .",
      quantity: 4,
      remark: "2 packets",
    },
    {
      serialNo: 2,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled .",
      quantity: 4,
      remark: "2 packets",
    },
    {
      serialNo: 2,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled .",
      quantity: 4,
      remark: "2 packets",
    },
    {
      serialNo: 2,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled .",
      quantity: 4,
      remark: "2 packets",
    },
  ],
  createdAt: "15/07/2023",
};

const getBillData = (data, convertedDate) => {
  const mergedDue = data?.dues?.sort((a, b) => b?.billNo - a?.billNo);
  const totalDue = mergedDue.reduce((prev, item) => prev + item?.due, 0);

  const finalDues = totalDue > 0 ? mergedDue : [];
  console.log("finalDues", finalDues, totalDue);
  if (!data?.showIndividualDues) {
    const [first, ...rest] = finalDues;

    if (totalDue > 0) {
      return {
        ...data,
        dues: [{ ...first, due: totalDue }],
        serialNo: data?.billNo,
        date: moment(convertedDate).format("DD MMMM, YYYY"),
      };
    }

    return {
      ...data,
      dues: [],
      serialNo: data?.billNo,
      date: moment(convertedDate).format("DD MMMM, YYYY"),
    };
  }

  return {
    ...data,
    dues: finalDues,
    serialNo: data?.billNo,
    date: moment(convertedDate).format("DD MMMM, YYYY"),
  };
};

export const getPdfData = (data, type) => {
  const dateString = data?.date;
  const format = "DD/MM/YYYY";
  const isValidDate = moment(data?.date).month();
  const convertedDate = !isNaN(isValidDate)
    ? data?.date
    : moment(dateString, format).toDate();

  if (type === "challan") {
    return {
      ...data,
      serialNo: data?.challanNo,
      date: moment(convertedDate).format("DD MMMM, YYYY"),
    };
  }

  if (type === "bill") return getBillData(data, convertedDate);

  if (type === "quotation")
    return {
      ...data,
      serialNo: data?.quotationNo,
      date: moment(convertedDate).format("DD MMMM, YYYY"),
    };
};

export const viewDuesOrNot = (data) => {
  const isAddedDues = data?.dues?.length > 0;
  console.log("call", data?.dues);
  return isAddedDues;
};
