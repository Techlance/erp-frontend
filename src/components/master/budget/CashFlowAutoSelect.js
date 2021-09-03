import React from "react";

// material-ui
import { Autocomplete, TextField } from "@material-ui/core";

// assets
import CachedIcon from "@material-ui/icons/Cached";

const CashFlowAutoSelect = ({ params, options, loading, err }) => {
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
      options={options}
      fullWidth
      getOptionLabel={(option) => option.head}
      value={params.value}
      disabled={loading}
      InputProps={{
        startAdornment: <> {loading && <CachedIcon />} </>,
      }}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
  );
};

export default CashFlowAutoSelect;
