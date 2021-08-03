import React from "react";

// material-ui
import { Grid, Typography, FormControlLabel, Switch } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../../store/constant";
import UserGroupsSelect from "../../../../components/user-management/UserGroupsSelect";
import TransactionSelect from "../../../../components/user-management/TransactionSelect";

//-----------------------|| PROFILE 2 - USER PROFILE ||-----------------------//

const RightsProfile = ({ values, setValues }) => {
  const handleChecked = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelect = (key, value) => {
    console.log(value);
    setValues({
      ...values,
      [key]: value,
    });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Grid>

      <Grid item xs={12} sm={6}>
        <UserGroupsSelect
          captionLabel="User Group Name"
          onChange={handleSelect}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TransactionSelect captionLabel="Transaction" onChange={handleSelect} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Grid container direction="row" spacing={3}>
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
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      id="can_create"
                      name="can_create"
                      checked={values.can_create}
                      onChange={handleChecked}
                      color="primary"
                    />
                  }
                  label="Can Create"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={handleChecked}
                      name="can_alter"
                      id="can_alter"
                      checked={values.can_alter}
                      color="primary"
                    />
                  }
                  label="Can Edit"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={handleChecked}
                      name="can_view"
                      id="can_view"
                      checked={values.can_view}
                      color="primary"
                    />
                  }
                  label="Can View"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      name="can_delete"
                      onChange={handleChecked}
                      id="can_delete"
                      checked={values.can_delete}
                      color="primary"
                    />
                  }
                  label="Can Delete"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RightsProfile;
