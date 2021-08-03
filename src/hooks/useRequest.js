import { useState } from "react";

// project imports
import instance from "../utils/axios";

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
      setError(null);
      setLoading(true);
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
        setLoading(false);
        setData(response.data.data);
      } else {
        if (nextError) {
          nextError(response.data.error);
        }
        setLoading(false);
        setError(response.data.error);
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return [doRequest, loading, error, responseData];
};

export default useRequest;
