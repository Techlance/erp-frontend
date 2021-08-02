import React, { useState } from "react";

// material-ui
import { Grid, TextField } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../../store/constant";
import useAuth from "../../../../hooks/useAuth";
import PermissionsChecklist from "../../../../components/user-management.js/permissions-checklist";

//-----------------------|| User Management - Users ||-----------------------//

const UserProfile = () => {
  const { user } = useAuth();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: null,
    created_by: user.email,
    can_create_company: true,
    can_edit_company: true,
    can_delete_company: true,
    can_view_user_groups: true,
    can_view_company: true,
    can_create_user: true,
    can_edit_user: true,
    can_delete_user_groups: true,
    can_edit_user_groups: true,
    can_create_user_groups: true,
    can_view_user: true,
    can_delete_user: true,
  });

  const handleChange = (event) => {
    console.log({ [event.target.id]: event.target.value });
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

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="name"
          label="Name"
          value={values.name}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
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
        <PermissionsChecklist values={values} setValues={setValues} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
