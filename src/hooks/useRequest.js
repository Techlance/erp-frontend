import { useState } from "react";
import PropTypes from "prop-types";

// project imports
import instance from "../utils/axios";

/**
 * useRequest hook
 * @returns {Function} dorequest Function to execute the request.
 * @returns {boolean} loading Loading status.
 */

const useRequest = ({
  url,
  method,
  data,
  headers,
  nextSuccess,
  nextError,
  initialState,
}) => {
  const [responseData, setData] = useState(() => {
    if (initialState) return initialState;

    return "";
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const doRequest = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await instance({
        url,
        method,
        headers,
        data,
      });

      if (response.data.success) {
        if (nextSuccess) {
          nextSuccess(response.data);
        }
        setData(response.data.data);
        setLoading(false);
      } else {
        if (nextError) {
          nextError(response.data.message);
        }
        setError(response.data.message);
        setLoading(false);
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return [doRequest, loading, error, responseData];
};

useRequest.defaultProps = {
  method: "GET",
};

useRequest.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.oneOf(["GET", "POST", "PUT", "DELETE"]),
  data: PropTypes.any,
  headers: PropTypes.any,
  nextSuccess: PropTypes.func,
  nextError: PropTypes.func,
  initialState: PropTypes.any,
};

export default useRequest;
