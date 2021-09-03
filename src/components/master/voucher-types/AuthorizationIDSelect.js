import React, { useEffect, useState } from "react";
import useRequest from "../../../hooks/useRequest";
import { FormControl, MenuItem, TextField } from "@material-ui/core";
import { useParams } from "react-router";

const AuthorizationIDSelect = ({
  captionLabel,
  formState,
  selected,
  onChange,
  disabled,
}) => {
  const { mid } = useParams();
  const [current, setCurrent] = useState(() => {
    if (selected) return selected.id;
    return null;
  });

  const errorState = formState === "error" ? true : false;

  const [getUserAccountsID, loading, , data] = useRequest({
    url: `/company/get-company-user/${mid}`,
    initialState: [],
  });

  useEffect(() => {
    getUserAccountsID();
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
    let item;
    if (event.target.value === "null") {
      item = null;
    } else {
      item = data.find((option) => option.id === event.target.value);
    }

    onChange("authorization_id", item);
  };

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="authorization-id-select"
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
        <MenuItem value="null">No Authorization Required</MenuItem>
        {data?.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            {option.email}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

export default AuthorizationIDSelect;
