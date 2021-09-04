import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";
import useRequest from "../../../hooks/useRequest";

//-----------------------|| USRT GROUPS SELECT ||-----------------------//

const ParentGroupSelect = ({
  captionLabel,
  formState,
  selected,
  onChange,
  disabled,
  head_id,
  avoid
}) => {
  const [current, setCurrent] = useState(() => {
    if (selected) return selected.id;
    return null;
  });
  const errorState = formState === "error" ? true : false;

  const [getUserAccountHeads, loading, , data] = useRequest({
    url: `/company/get-account-group-name/${head_id}`,
    initialState: [],
  });

  useEffect(() => {
    getUserAccountHeads();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [head_id]);

  //   useEffect(() => {

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  useEffect(() => {
    setCurrent(() => {
      if (selected) return selected.id;
      return null;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleChange = (event) => {
    const item = data.find((option) => option.id === event.target.value);

    onChange("child_of", item);
  };

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="child_of"
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
          avoid===option.id?null:
          <MenuItem key={index} value={option.id}>
            {`${option.group_name}`.toUpperCase()}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

ParentGroupSelect.propTypes = {
  captionLabel: PropTypes.string,
  currencies: PropTypes.array,
  formState: PropTypes.string,
  iconPrimary: PropTypes.object,
  iconSecondary: PropTypes.object,
  selected: PropTypes.string,
  textPrimary: PropTypes.string,
  textSecondary: PropTypes.string,
  disabled: PropTypes.bool,
  head_id: PropTypes.number,
};

export default ParentGroupSelect;
