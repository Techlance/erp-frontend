import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";

// project imports
import useRequest from "../../../hooks/useRequest";

const AccountCodeSelect = ({ captionLabel, formState, selected, onChange }) => {
  const { mid } = useParams();

  const [current, setCurrent] = useState(() => {
    if (selected) return selected.id;
    return null;
  });

  const errorState = formState === "error" ? true : false;

  const [getAccountCodes, loading, , data] = useRequest({
    url: `/company/get-ledger-master/${mid}`,
    initialState: [],
  });

  const handleChange = (event) => {
    const item = data.find((option) => option.id === event.target.value);

    onChange("acc_code", item);
  };

  useEffect(() => {
    getAccountCodes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrent(() => {
      if (selected) return selected.id;
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
        disabled={loading}
        InputProps={{
          startAdornment: <> {loading && <CachedIcon />} </>,
        }}
      >
        {data?.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            {`${option.ledger_id} - ${option.ledger_name}`}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

export default AccountCodeSelect;
