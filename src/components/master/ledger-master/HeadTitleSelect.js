import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";

//-----------------------|| Head Title Select ||-----------------------//

const HeadTitleSelect = ({ captionLabel, formState, selected, onChange }) => {
  const [current, setCurrent] = useState(() => {
    if (selected) return selected;
    return null;
  });

  // const { currencies, getCurrency } = useCompany();
  const errorState = formState === "error" ? true : false;

  const options = ["ASSETS", "EQUITY AND LIABLITIES", "INCOME", "EXPENSES"];

  useEffect(() => {
    setCurrent(() => {
      if (selected) return selected;
      return null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleChange = (event) => {
    const item = options.find((option) => option === event.target.value);
    onChange("title", item);
  };

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="outlined-select-currency"
        select
        fullWidth
        label={captionLabel}
        value={current}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

HeadTitleSelect.propTypes = {
  captionLabel: PropTypes.string,
  formState: PropTypes.string,
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

export default HeadTitleSelect;
