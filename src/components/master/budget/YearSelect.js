import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";
import useRequest from "../../../hooks/useRequest";
import { useParams } from "react-router";

//-----------------------|| USRT GROUPS SELECT ||-----------------------//

const YearSelect = ({
  captionLabel,
  formState,
  selected,
  onChange,
  disabled,
}) => {
  const [current, setCurrent] = useState(() => {
    if (selected) return selected.id;
    return null;
  });

  const { mid } = useParams();
  const errorState = formState === "error" ? true : false;
  const [getUsers, loading, , data] = useRequest({
    url: `/company/get-year-master/${mid}`,
    initialState: [],
  });

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrent(() => {
      if (selected) return selected.id;
      return null;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (selected && data) {
      const item = data.find((option) => option.id === selected.id);
    }
  }, [data, selected]);

  const handleChange = (event) => {
    const item = data.find((option) => option.id === event.target.value);
    onChange("year_id", item);
  };

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="year_id"
        select
        fullWidth
        label={captionLabel}
        value={current}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        InputProps={{ readOnly: disabled || loading }}
        helperText={loading && "Loading Data"}
      >
        {data?.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            {`${option.start_date} - ${option.end_date}`.toUpperCase()}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

YearSelect.propTypes = {
  captionLabel: PropTypes.string,
  currencies: PropTypes.array,
  formState: PropTypes.string,
  iconPrimary: PropTypes.object,
  iconSecondary: PropTypes.object,
  selected: PropTypes.string,
  textPrimary: PropTypes.string,
  textSecondary: PropTypes.string,
  disabled: PropTypes.bool,
};

export default YearSelect;
