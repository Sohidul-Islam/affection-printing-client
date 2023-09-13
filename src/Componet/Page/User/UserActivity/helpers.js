import { Stack, Typography } from "@mui/material";

export const generatedTableData = (data, type) => {
  if (type === "challan") return data?.challans || [];

  if (type === "bill") return data?.bills || [];

  if (type === "transaction") return data?.transactions || [];

  if (type === "quotation") return [];

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
