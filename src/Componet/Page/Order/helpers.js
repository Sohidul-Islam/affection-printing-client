import { successMsg } from "../../Shared/SuccessMsg";

export const validateOrder = (quotation) => {
  const status = {
    status: false,
  };
  if (!quotation?.user?.name) {
    successMsg("Please select a user name");
    return status;
  }
  if (!quotation?.subject) {
    successMsg("Please add subject");
    return status;
  }
  if (!quotation?.date) {
    successMsg("Please add date");
    return status;
  }
  if (!quotation?.qutations?.length) {
    successMsg("Please add atleast one quotation");
    return status;
  }

  return {
    status: true,
    data: { ...quotation },
  };
};
