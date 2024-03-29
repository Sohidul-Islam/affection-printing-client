import { useNavigate } from "react-router-dom";
import {
  getCookiesAsObject,
  removeAuthCookies,
} from "../Componet/Common/Helpers/helpers";
import { API_URL } from "./api";
import axios from "axios";
import { successMsg } from "../Componet/Shared/SuccessMsg";

const AXIOS = axios.create({
  baseURL: API_URL,
});

/**
 * Interceptor for all requests
 */
AXIOS.interceptors.request.use(
  async (config) => {
    /**
     * Add your request interceptor logic here: setting headers, authorization etc.
     */

    let accessToken = null;

    if (document.cookie.length > 0) {
      const { access_token } = getCookiesAsObject();
      accessToken = access_token || null;
    }

    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    /**
     * Add your error handlers here
     */
    console.log("api error:", error);
    return Promise.reject(error);
  }
);
/**
 * Interceptor for all responces
 */
AXIOS.interceptors.response.use(
  (response) => {
    /**
     * Add logic for successful response
     */

    return response?.data || {};
  },
  (error) => {
    /**
     * Add logic for any error from backend
     */

    if (
      error?.response?.data?.success === false &&
      (error?.response?.data?.message === "Error!Token was not provided." ||
        error?.response?.data?.message === "Invalid Token.")
    ) {
      successMsg(error?.response?.data?.message);
      window.location.href = "/login";
    }

    console.log("api error:", error);
    return Promise.reject(error);
  }
);

export default AXIOS;
