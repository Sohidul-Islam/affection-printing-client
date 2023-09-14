import { getImageUrl } from "../../Common/Shared/image";
import { successMsg } from "../../Shared/SuccessMsg";

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

export const validateUserData = async (userData) => {
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

  if (userData?.image?.length) {
    successMsg("Please wait untill image uploading");
    const imageUrl = await getImageUrl(userData?.image[0]);

    if (!imageUrl) {
      return { status: false, message: "Image not upload" };
    }

    status.status = true;
    status.data = { ...userData, image: imageUrl };
    return status;
  }

  status.status = true;
  status.data = { ...userData };
  return status;
};

export const getUserData = (data) => {
  const initialData = {
    name: "",
    address: "",
    phone: "",
    email: "",
    vatNo: "",
    image: [],
  };
  if (data?._id) {
    return { ...data, image: [{ preview: data?.image }] };
  }

  return initialData;
};
