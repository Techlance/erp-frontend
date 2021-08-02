import React from "react";

// material-ui
import { Grid, Typography, FormControlLabel, Switch } from "@material-ui/core";

const PermissionsChecklist = ({ values, setValues }) => {
  const handleChecked = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Typography
          variant="h5"
          component="span"
          sx={{ textTransform: "uppercase" }}
        >
          Company Related Fields
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="column" spacing={0}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  id="can_create_company"
                  checked={values.can_create_company}
                  onChange={handleChecked}
                  name="can_create_company"
                  color="primary"
                />
              }
              label="Create Company"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="h5"
          component="span"
          sx={{ textTransform: "uppercase" }}
        >
          User Related Fields
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container direction="column" spacing={0}></Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="h5"
          component="span"
          sx={{ textTransform: "uppercase" }}
        >
          User Groups Related Fields
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container direction="column" spacing={0}></Grid>
      </Grid>
    </Grid>
  );
};

export default PermissionsChecklist;
