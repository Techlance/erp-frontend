import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";

// project import
import useRequest from "../../../hooks/useRequest";

// assets
import CachedIcon from "@material-ui/icons/Cached";

//-----------------------|| AUTHORIZER SELECT ||-----------------------//

const AuthoriserSelect = ({ captionLabel, formState, selected, onChange }) => {
  const [current, setCurrent] = useState(() => {
    if (selected) return selected.id;
    return null;
  });
  const { mid } = useParams();
  const errorState = formState === "error" ? true : false;

  const [getUsers, loading, , data] = useRequest({
    url: `/company/get-company-user/${mid}`,
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

  const handleChange = (event) => {
    const item = data.find((option) => option.id === event.target.value);
    onChange("authoriser", item);
  };

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="authoriser"
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
        {data?.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            {`${option.email}`.toUpperCase()}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

AuthoriserSelect.propTypes = {
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

export default AuthoriserSelect;
