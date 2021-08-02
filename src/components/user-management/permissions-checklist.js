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

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  id="can_edit_company"
                  checked={values.can_edit_company}
                  onChange={handleChecked}
                  name="can_edit_company"
                  color="primary"
                />
              }
              label="Edit Company"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  id="can_delete_company"
                  checked={values.can_delete_company}
                  onChange={handleChecked}
                  name="can_delete_company"
                  color="primary"
                />
              }
              label="Delete Company"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  id="can_view_company"
                  checked={values.can_view_company}
                  onChange={handleChecked}
                  name="can_view_company"
                  color="primary"
                />
              }
              label="View Company"
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
        <Grid container direction="column" spacing={0}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  id="can_create_user"
                  checked={values.can_create_user}
                  onChange={handleChecked}
                  name="can_create_user"
                  color="primary"
                />
              }
              label="Create User"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  id="can_edit_user"
                  checked={values.can_edit_user}
                  onChange={handleChecked}
                  name="can_edit_user"
                  color="primary"
                />
              }
              label="Edit User"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  id="can_view_user"
                  checked={values.can_view_user}
                  onChange={handleChecked}
                  name="can_view_user"
                  color="primary"
                />
              }
              label="View User"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  id="can_delete_user"
                  checked={values.can_delete_user}
                  onChange={handleChecked}
                  name="can_delete_user"
                  color="primary"
                />
              }
              label="Delete User"
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
          User Groups Related Fields
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container direction="column" spacing={0}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  id="can_create_user_group"
                  checked={values.can_create_user_group}
                  onChange={handleChecked}
                  name="can_create_user_group"
                  color="primary"
                />
              }
              label="Create User Group"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  id="can_edit_user_group"
                  checked={values.can_edit_user_group}
                  onChange={handleChecked}
                  name="can_edit_user_group"
                  color="primary"
                />
              }
              label="Edit User Group"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  id="can_view_user_group"
                  checked={values.can_view_user_group}
                  onChange={handleChecked}
                  name="can_view_user_group"
                  color="primary"
                />
              }
              label="View User Group"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  id="can_delete_user_group"
                  checked={values.can_delete_user_group}
                  onChange={handleChecked}
                  name="can_delete_user_group"
                  color="primary"
                />
              }
              label="Delete User Group"
            />
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  );
};

export default PermissionsChecklist;
