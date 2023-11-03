import { Stack, Typography } from "@mui/material";

export const generatedTableData = (data, type) => {
  if (type === "challan") return data?.challans || [];

  if (type === "bill") return data?.bills || [];

  if (type === "transaction") return data?.transactions || [];

  if (type === "quotation") return data?.quotations || [];

  return [];
};

export const getAddedDuesBillNO = (data) => {
  if (data?.length > 0) {
    const billNo = data?.map((bill) => bill.billNo);
    const billWithDues = data?.map((bill) => bill.due);

    const billNOInString = billNo.join(", ");
    const duesAmount = billWithDues.join(", ");

    const content = (
      <Stack gap={1}>
        <Typography variant="body2">{`${data?.length} Bill With Dues (Bill No: ${billNOInString})`}</Typography>
        <Typography variant="body3">{`Dues Amount: ${duesAmount}`}</Typography>
      </Stack>
    );

    return content;
  }

  return 0;
};

const getDescriptionValue = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object") {
    if (value?.length) {
      return value[0]?.desc;
    }

    return JSON.stringify(value);
  }
  return value;
};

export const getDescription = (type, value = undefined) => {
  const output = {
    description: "",
    field: "",
  };

  if (type === "challan") {
    output.description = getDescriptionValue(value);
    output.field = "challans";
  }

  if (type === "bill") {
    output.description = getDescriptionValue(value);
    output.field = "bills";
  }
  if (type === "quotation") {
    output.description = getDescriptionValue(value);
    output.field = "subject";
  }

  return output;
};
