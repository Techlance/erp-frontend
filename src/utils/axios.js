/**
 * axios setup to use mock service
 */

import axios from "axios";
import config from "../config";

const axiosServices = axios.create({
  baseURL: config.api_uri,
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
