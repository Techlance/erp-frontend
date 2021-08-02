import React, { useState } from "react";

// material-ui
import { Grid, TextField } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../../store/constant";

// assets
import useCompany from "../../../../hooks/useCompany";
import useAuth from "../../../../hooks/useAuth";

//-----------------------|| USER Management - Group PROFILE ||-----------------------//

const GroupsProfile = () => {
  const { user } = useAuth();

  const { currentCompany, updateForm } = useCompany();

  const [values, setValues] = useState({
    user_group_name: "",
    backdated_days: "",
    created_by: user.name,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          label="Group Name"
          value={values.user_group_name}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
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
