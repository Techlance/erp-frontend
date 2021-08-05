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

  return (
    <Grid container spacing={gridSpacing}>
      <Grid>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Grid>

      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          id="user_group_name"
          label="Group Name"
          value={values.user_group_name}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          id="backdated_days"
          label="Backdated Days"
          type="number"
          value={values.backdated_days}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default GroupsProfile;
