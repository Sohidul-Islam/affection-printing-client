import { getImageUrl } from "../../Common/Shared/image";
import { successMsg } from "../../Shared/SuccessMsg";

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export const validateUserData = async (userData) => {
  const status = {
    status: false,
  };

  if (!userData?.name) {
    status.status = false;
    status.message = "Please enter your name";
    return status;
  }

  if (!userData?.phone) {
    status.status = false;
    status.message = "Please enter your phone";
    return status;
  }
  if (!userData?.email) {
    status.status = false;
    status.message = "Please enter your email";
    return status;
  }
  if (!validateEmail(userData?.email)) {
    status.status = false;
    status.message = "Your email is not valid";
  }
  if (!userData?._id && !userData?.password?.trim()) {
    status.status = false;
    status.message = "Please enter your password";
    return status;
  }

  if (userData?.password?.trim()) {
    userData.password = userData?.password?.trim();
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
    phone: "",
    email: "",
    image: [],
    password: "",
  };
  if (data?._id) {
    return { ...data, password: "", image: [{ preview: data?.image }] };
  }

  return initialData;
};
