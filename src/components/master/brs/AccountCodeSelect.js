import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, TextField } from "@material-ui/core";
import useRequest from "../../../hooks/useRequest";

const AccountCodeSelect = ({ captionLabel, formState, selected, onChange }) => {
  const [current, setCurrent] = useState(() => {
    if (selected) return selected;
    return null;
  });

  const errorState = formState === "error" ? true : false;

  const [getAccountCodes, loading, , data] = useRequest({
    url: `/company/get-acc-ledger-master/`,
    initialState: [],
  });

  const handleChange = (event) => {
    // const item = data.find((option) => option.id === event.target.value);

    onChange("acc_code", event.target.value);
  };

  useEffect(() => {
    getAccountCodes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrent(() => {
      if (selected) return selected;
      return null;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="account-code-select"
        select
        fullWidth
        label={captionLabel}
        value={current}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        InputProps={{ readOnly: loading }}
        helperText={loading && "Loading Data"}
      >
        {data?.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

export default AccountCodeSelect;
