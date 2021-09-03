import React, { useEffect } from "react";

// material-ui
import { Autocomplete, TextField } from "@material-ui/core";

// project imports
import useRequest from "../../../hooks/useRequest";

// assets
import CachedIcon from "@material-ui/icons/Cached";

const CashFlowAutoSelect = ({ params }) => {
  const [getCashFlowHead, loading, , data] = useRequest({
    url: `/budget/get-cashflow-head`,
    initialState: [],
  });

  useEffect(() => {
    getCashFlowHead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setCurrent(() => {
  //     if (selected) return selected.id;
  //     return null;
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selected]);

  // const handleChange = (event) => {
  //   const item = data.find((option) => option.id === event.target.value);
  //   onChange("year_id", item);
  // };

  return (
    <Autocomplete
      id="cash-flow-cash-head"
      options={data}
      fullWidth
      getOptionLabel={(option) => option.head}
      value={params.value}
      disabled={loading}
      InputProps={{
        startAdornment: <> {loading && <CachedIcon />} </>,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cash Flow Head"
          variant="outlined"
          disabled={loading}
          InputProps={{
            startAdornment: <> {loading && <CachedIcon />} </>,
          }}
        />
      )}
    />
  );
};

export default CashFlowAutoSelect;
