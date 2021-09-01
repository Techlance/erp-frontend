import React, { useEffect, useState } from "react";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";

const RestartSelect = ({ captionLabel, formState, selected, onChange }) => {
  const [current, setCurrent] = useState(() => {
    if (selected) return selected;
    return null;
  });

  const errorState = formState === "error" ? true : false;

  useEffect(() => {
    setCurrent(() => {
      if (selected) return selected;
      return null;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleChange = (event) => {
    // const item = data.find((option) => option.id === event.target.value);

    onChange("restart", event.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="restart-select"
        select
        fullWidth
        label={captionLabel}
        value={current}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      >
        <MenuItem key={1} value="year">
          Year
        </MenuItem>
        <MenuItem key={1} value="month">
          Month
        </MenuItem>
      </TextField>
    </FormControl>
  );
};

export default RestartSelect;
