import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";
import { useParams } from "react-router";
import usePurchase from "../../../../hooks/usePurchase";

//-----------------------|| Head Title Select ||-----------------------//

const SelectParentVoucher = ({ captionLabel, formState, onChange }) => {
  const { voucher_list, parent_voucher } = useSelector((state) => state.purchase);
  const { mid } = useParams();
  const [loading, setLoading] = useState(true);
  const { getVouchers } = usePurchase();
  const errorState = formState === "error" ? true : false;

  const handleChange = (event) => {
    const item = voucher_list.find(
      (option) => option.id === event.target.value.id
    );
    onChange(item);
  };

  useEffect(() => {
    if (!voucher_list) {
        getVouchers(mid);
        setLoading(true);
    } else {
      setLoading(false);
    }
  }, [voucher_list]);

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="select-voucher-select"
        select
        fullWidth
        label={captionLabel}
        value={parent_voucher}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        disabled={loading}
        InputProps={{
          startAdornment: <> {loading && <CachedIcon />} </>,
        }}
      >
        {voucher_list?.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option.voucher_name}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

SelectParentVoucher.propTypes = {
  captionLabel: PropTypes.string,
  formState: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectParentVoucher;
