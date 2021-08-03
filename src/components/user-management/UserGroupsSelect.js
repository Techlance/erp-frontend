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
import useRequest from "../../hooks/useRequest";

//-----------------------|| USRT GROUPS SELECT ||-----------------------//

const UserGroupsSelect = ({
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

  const [getUserGroups, , , data] = useRequest({
    url: "/user/get-user-group",
    initialState: [],
  });

  useEffect(() => {
    console.log(selected);
    getUserGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    onChange("user_group_id", event.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined" error={errorState}>
      <TextField
        id="user_group_id"
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
          <MenuItem key={index} value={option}>
            {`${option.user_group_name}`.toUpperCase()}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

UserGroupsSelect.propTypes = {
  captionLabel: PropTypes.string,
  currencies: PropTypes.array,
  formState: PropTypes.string,
  iconPrimary: PropTypes.object,
  iconSecondary: PropTypes.object,
  selected: PropTypes.string,
  textPrimary: PropTypes.string,
  textSecondary: PropTypes.string,
};

export default UserGroupsSelect;
