import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";

// project import
import useRequest from "../../hooks/useRequest";
import { useParams } from "react-router";

// assets
import CachedIcon from "@material-ui/icons/Cached";

//-----------------------|| USRT GROUPS SELECT ||-----------------------//

const ParentGroupSelect = ({
  captionLabel,
  formState,
  selected,
  onChange,
  cat_id,
}) => {
  const [current, setCurrent] = useState(() => {
    if (selected) return selected.id;
    return -1;
  });
  const errorState = formState === "error" ? true : false;

  const { cen_id } = useParams();

  const [getCostCategory, loading, , data] = useRequest({
    url: `/company/get-cost-center-name/${cat_id}`,
    initialState: [],
  });

  useEffect(() => {
    getCostCategory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat_id]);

  useEffect(() => {
    setCurrent(() => {
      if (selected) return selected.id;
      return -1;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleChange = (event) => {
    const item = data.find((option) => option.id === event.target.value);

    if (item?.id !== parseInt(cen_id)) {
      console.log(cen_id);
      console.log("cen_id");
      console.log(item?.id);
      onChange("child_of", item);
    }
    // else {
    //   console.log("hehehe");
    //   console.log("cen_id");
    //   console.log(item?.id);
    //   onChange("child_of", null);
    // }
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
        disabled={loading}
        InputProps={{
          startAdornment: <> {loading && <CachedIcon />} </>,
        }}
      >
        <MenuItem key={-1} value={-1}>
          {"Primary"}
        </MenuItem>

        {data?.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            {`${option.cost_center_name}`.toUpperCase()}
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
  cat_id: PropTypes.number,
};

export default ParentGroupSelect;
