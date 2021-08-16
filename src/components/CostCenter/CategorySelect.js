import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";
import useRequest from "../../hooks/useRequest";
import { useParams } from "react-router";

//-----------------------|| COST CATEGORY SELECT ||-----------------------//

const CostCategorySelect = ({
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

  const [getCostCategory, , , data] = useRequest({
    url: `/company/get-cost-category/${mid}`,
    initialState: [],
  });

  useEffect(() => {
    getCostCategory();
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
    const item = data.find((option) => option.id === event.target.value);

    onChange("cost_category_id", item);
  };

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="cost_category_id"
        select
        fullWidth
        label={captionLabel}
        value={current}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        InputProps={{ readOnly: disabled }}
      >
        {data?.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            {`${option.name}`.toUpperCase()}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

CostCategorySelect.propTypes = {
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

export default CostCategorySelect;
