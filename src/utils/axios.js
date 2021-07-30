/**
 * axios setup to use mock service
 */

import axios from "axios";
import { API_URI } from "../store/constant";

const axiosServices = axios.create({
  baseURL: API_URI,
});

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => {
    if (response.data.success) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  },
  (error) =>
    Promise.reject((error.response && error.response.data) || "Wrong Services")
);

export default axiosServices;
