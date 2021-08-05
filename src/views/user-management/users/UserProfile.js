import React from "react";

// material-ui
import { Grid, TextField } from "@material-ui/core";
import { gridSpacing } from "../../../store/constant";
import PermissionChecklist from "../../../components/user-management/PermissionChecklist";

// project imports

//-----------------------|| User Management - Users ||-----------------------//

const UserProfile = ({ values, setValues }) => {
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Grid>

      <Grid item xs={12} sm={6} sx={{ textTransform: "capitalize" }}>
        <TextField
          fullWidth
          id="name"
          label="Name"
          value={values.name}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          sx={{ textTransform: "capitalize" }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="email"
          label="Email"
          type="email"
          value={values.email}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          id="password"
          label="Password"
          type="password"
          value={values.password}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <PermissionChecklist values={values} setValues={setValues} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
