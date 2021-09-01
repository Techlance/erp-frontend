import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";

//-----------------------|| Head Title Select ||-----------------------//

const SelectBankSelect = ({ captionLabel, formState, onChange }) => {
  const { bank_list, selected_bank } = useSelector((state) => state.brs);

  const errorState = formState === "error" ? true : false;

  const handleChange = (event) => {
    const item = bank_list.find(
      (option) => option.id === event.target.value.id
    );
    onChange(item);
  };

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="select-bank-select"
        select
        fullWidth
        label={captionLabel}
        value={selected_bank}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      >
        {bank_list.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option.ledger_name}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

SelectBankSelect.propTypes = {
  captionLabel: PropTypes.string,
  formState: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectBankSelect;
