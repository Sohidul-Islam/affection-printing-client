export const initialQueryParam = {
  searchKey: "",
  sortBy: "",
  page: 1,
  pageSize: 6,
  startDate: "",
  endDate: "",
};
const initialData = {
  name: "",
  address: "",
  phone: "",
  email: "",
  vatNo: "",
};

export const validateUserData = (userData) => {
  const status = {
    status: false,
  };

  if (!userData?.name) {
    status.status = false;
    status.message = "Please enter your name";
    return status;
  }
  if (!userData?.address) {
    status.status = false;
    status.message = "Please enter your address";
    return status;
  }
  if (!userData?.phone) {
    status.status = false;
    status.message = "Please enter your phone";
    return status;
  }

  status.status = true;
  return status;
};

export const getUserData = (data) => {
  const initialData = {
    name: "",
    address: "",
    phone: "",
    email: "",
    vatNo: "",
  };
  if (data?._id) {
    return data;
  }

  return initialData;
};
