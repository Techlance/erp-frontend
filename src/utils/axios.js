/**
 * axios setup to use mock service
 */

import axios from "axios";

const axiosServices = axios.create({
  baseURL: "http://localhost:8000/api/user",
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
