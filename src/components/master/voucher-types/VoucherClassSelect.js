import React, { useEffect, useState } from "react";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";

// project import
import useRequest from "../../../hooks/useRequest";

const VoucherClassSelect = ({
  captionLabel,
  formState,
  selected,
  onChange,
  disabled,
}) => {
  const [current, setCurrent] = useState(() => {
    if (selected) return selected;
    return null;
  });

  const errorState = formState === "error" ? true : false;

  const [getVoucherClasses, loading, , data] = useRequest({
    url: `/company/get-voucherclass`,
    initialState: [],
  });

  useEffect(() => {
    getVoucherClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrent(() => {
      if (selected) return selected;
      return null;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleChange = (event) => {
    // const item = data.find((option) => option.id === event.target.value);

    onChange("voucher_class", event.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="authorization-id-select"
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
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

export default VoucherClassSelect;
