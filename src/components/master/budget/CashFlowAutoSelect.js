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
      // onChange={(event, newValue) => {
      //   if (typeof newValue === 'string') {
      //     setValue({
      //       title: newValue,
      //     });
      //   } else if (newValue && newValue.inputValue) {
      //     // Create a new value from the user input
      //     setValue({
      //       title: newValue.inputValue,
      //     });
      //   } else {
      //     setValue(newValue);
      //   }
      // }}
      // filterOptions={(options, params) => {
      //   const filtered = filter(options, params);

      //   // Suggest the creation of a new value
      //   if (params.inputValue !== '') {
      //     filtered.push({
      //       inputValue: params.inputValue,
      //       title: `Add "${params.inputValue}"`,
      //     });
      //   }

      //   return filtered;
      // }}
    />
  );
};

export default CashFlowAutoSelect;
