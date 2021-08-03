import PropTypes from "prop-types";
import React, { useEffect } from "react";

// material-ui
import {
  Divider,
  FormControl,
  InputAdornment,
  MenuItem,
  TextField,
} from "@material-ui/core";

// project imports
import useRequest from "../../hooks/useRequest";

//-----------------------|| CURRENCY SELECT ||-----------------------//

const CurrencySelect = ({
  captionLabel,
  formState,
  iconPrimary,
  iconSecondary,
  selected,
  textPrimary,
  textSecondary,
  onChange,
}) => {
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? (
    <IconPrimary fontSize="small" sx={{ color: "grey.700" }} />
  ) : null;

  const IconSecondary = iconSecondary;
  const secondaryIcon = iconSecondary ? (
    <IconSecondary fontSize="small" sx={{ color: "grey.700" }} />
  ) : null;

  const errorState = formState === "error" ? true : false;

  const handleChange = (event) => {
    onChange({ base_currency: event.target.value });
  };

  const [getCurrency, , , data] = useRequest({
    url: "/company/get-currency",
    initialState: [],
  });

  useEffect(() => {
    getCurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="outlined-select-currency"
        select
        fullWidth
        label={captionLabel}
        value={selected}
        onChange={handleChange}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <React.Fragment>
              {primaryIcon && (
                <InputAdornment position="start">{primaryIcon}</InputAdornment>
              )}
              {textPrimary && (
                <React.Fragment>
                  <InputAdornment position="start">
                    {textPrimary}
                  </InputAdornment>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                </React.Fragment>
              )}
            </React.Fragment>
          ),
          endAdornment: (
            <React.Fragment>
              {secondaryIcon && (
                <InputAdornment position="end">{secondaryIcon}</InputAdornment>
              )}
              {textSecondary && (
                <React.Fragment>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <InputAdornment position="end">
                    {textSecondary}
                  </InputAdornment>
                </React.Fragment>
              )}
            </React.Fragment>
          ),
        }}
      >
        {data.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            {option.currency}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

CurrencySelect.propTypes = {
  captionLabel: PropTypes.string,
  currencies: PropTypes.array,
  formState: PropTypes.string,
  iconPrimary: PropTypes.object,
  iconSecondary: PropTypes.object,
  selected: PropTypes.string,
  textPrimary: PropTypes.string,
  textSecondary: PropTypes.string,
};

export default CurrencySelect;
