import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";

// project imports
// import useCompany from "../../hooks/useCompany";
import { useSelector } from "react-redux";
import useLC from "../../../hooks/useLC";
import { useParams } from "react-router";

//-----------------------|| PARTY CODE PAYABLE SELECT ||-----------------------//

const BankAcSelect = ({ captionLabel, formState, selected, onChange }) => {
  const [current, setCurrent] = useState(() => {
    if (selected) return selected.id;
    return null;
  });

  // const { currencies, getCurrency } = useCompany();
  //   const { getCurrency } = useCompany();
  const { getBankAc } = useLC();
  const lc = useSelector((state) => state.lc);
  const { bank_ac } = lc;
  const errorState = formState === "error" ? true : false;
  const { mid } = useParams();
  useEffect(() => {
    getBankAc(mid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrent(() => {
      if (selected) return selected.id;
      return null;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleChange = (event) => {
    const item = bank_ac.find((option) => option.id === event.target.value);
    onChange("bank_ac", item);
  };

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="outlined-select-center"
        select
        fullWidth
        label={captionLabel}
        value={current}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      >
        {bank_ac?.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            {option.ledger_name}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

BankAcSelect.propTypes = {
  captionLabel: PropTypes.string,
  formState: PropTypes.string,
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

export default BankAcSelect;
