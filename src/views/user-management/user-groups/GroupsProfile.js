import React from "react";

// material-ui
import { Grid, TextField } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../store/constant";

//-----------------------|| User Management - Group Profile ||-----------------------//

const GroupsProfile = ({ values, setValues }) => {
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const dayRegex = new RegExp("^[0-9]{0,2}$");

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          id="user_group_name"
          required
          label="Group Name"
          value={values.user_group_name}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          required
          id="backdated_days"
          label="Backdated Days"
          type="number"
          value={values.backdated_days}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            color: dayRegex.test(values.backdated_days) ? "primary" : "error",
          }}
          helperText={
            dayRegex.test(values.backdated_days)
              ? ""
              : "Days cannot be negative and can only be 2 digit integer."
          }
          error={dayRegex.test(values.backdated_days) ? false : true}
          onChange={handleChange}
        />
        {dayRegex.test(values.backdated_days) ? true : false}
      </Grid>
    </Grid>
  );
};

export default GroupsProfile;
