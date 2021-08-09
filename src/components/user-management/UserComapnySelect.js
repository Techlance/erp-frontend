import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

// material-ui
import { FormControl, MenuItem, TextField } from "@material-ui/core";
import useRequest from "../../hooks/useRequest";

//-----------------------|| USRT GROUPS SELECT ||-----------------------//

const UserSelectCompany = ({ captionLabel, formState, selected, onChange }) => {
  const [current, setCurrent] = useState(() => {
    if (selected) return selected.id;
    return null;
  });

  const errorState = formState === "error" ? true : false;

  const [getUserCompany, , , data] = useRequest({
    url: "/company/get-user-company",
    initialState: [],
  });

  useEffect(() => {
    getUserCompany();
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
    const item = data.companies.find(
      (option) => option.id === event.target.value
    );
    onChange("company_master_id", item);
  };

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="company_master_id"
        select
        fullWidth
        label={captionLabel}
        value={current}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      >
        {console.log(data.companies)}
        {data.companies &&
          data.companies.map((option, index) => (
            <MenuItem key={index} value={option.id}>
              {`${option.company_name}`.toUpperCase()}
            </MenuItem>
          ))}
      </TextField>
    </FormControl>
  );
};

UserSelectCompany.propTypes = {
  captionLabel: PropTypes.string,
  currencies: PropTypes.array,
  formState: PropTypes.string,
  iconPrimary: PropTypes.object,
  iconSecondary: PropTypes.object,
  selected: PropTypes.string,
  textPrimary: PropTypes.string,
  textSecondary: PropTypes.string,
};

export default UserSelectCompany;
