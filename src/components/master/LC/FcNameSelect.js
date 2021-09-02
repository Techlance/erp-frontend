import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";

// project imports
import { useSelector } from "react-redux";
import useCompany from "../../../hooks/useCompany";

//-----------------------|| CURRENCY SELECT ||-----------------------//

const FcNameSelect = ({
  captionLabel,
  formState,
  selected,
  onChange,
  baseCurrency,
}) => {
  const [current, setCurrent] = useState(() => {
    if (selected) return selected.id;
    return baseCurrency;
  });

  // const { currencies, getCurrency } = useCompany();
  const { getCurrency } = useCompany();
  const company = useSelector((state) => state.company);
  const { currencies } = company;
  const errorState = formState === "error" ? true : false;

  useEffect(() => {
    getCurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrent(() => {
      if (selected) return selected.id;
      return baseCurrency;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleChange = (event) => {
    const item = currencies.find((option) => option.id === event.target.value);
    onChange("base_currency", item);
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
        {currencies.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            {option.id === baseCurrency
              ? `Base(${option.currency})`
              : option.currency}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

FcNameSelect.propTypes = {
  captionLabel: PropTypes.string,
  formState: PropTypes.string,
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

export default FcNameSelect;
