import React, { useEffect, useState } from "react";

// material-ui
import { Grid, TextField } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../../store/constant";
import useAuth from "../../../../hooks/useAuth";
import PermissionsChecklist from "../../../../components/user-management/permissions-checklist";

//-----------------------|| User Management - Users ||-----------------------//

const UserProfile = ({ current_user_account, updateUser }) => {
  const { user } = useAuth();

  // constants
  const INIT_STATE = {
    name: "",
    email: "",
    password: null,
    created_by: user.name,
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
  };

  const [values, setValues] = useState(() => {
    if (current_user_account) {
      return {
        name: current_user_account.name,
        email: current_user_account.email,
        password: null,
        created_by: current_user_account.email,
        can_create_company: current_user_account.can_create_company,
        can_edit_company: current_user_account.can_edit_company,
        can_delete_company: current_user_account.can_delete_company,
        can_view_user_groups: current_user_account.can_view_user_groups,
        can_view_company: current_user_account.can_view_company,
        can_create_user: current_user_account.can_create_user,
        can_edit_user: current_user_account.can_edit_user,
        can_delete_user_groups: current_user_account.can_delete_user_groups,
        can_edit_user_groups: current_user_account.can_edit_user_groups,
        can_create_user_groups: current_user_account.can_create_user_groups,
        can_view_user: current_user_account.can_view_user,
        can_delete_user: current_user_account.can_delete_user,
      };
    }
    return INIT_STATE;
  });

  useEffect(() => {
    setValues({
      name: current_user_account.name,
      email: current_user_account.email,
      password: null,
      created_by: current_user_account.email,
      can_create_company: current_user_account.can_create_company,
      can_edit_company: current_user_account.can_edit_company,
      can_delete_company: current_user_account.can_delete_company,
      can_view_user_groups: current_user_account.can_view_user_groups,
      can_view_company: current_user_account.can_view_company,
      can_create_user: current_user_account.can_create_user,
      can_edit_user: current_user_account.can_edit_user,
      can_delete_user_groups: current_user_account.can_delete_user_groups,
      can_edit_user_groups: current_user_account.can_edit_user_groups,
      can_create_user_groups: current_user_account.can_create_user_groups,
      can_view_user: current_user_account.can_view_user,
      can_delete_user: current_user_account.can_delete_user,
    });
  }, [current_user_account]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
    updateUser(current_user_account.id, values);
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
        <PermissionsChecklist values={values} setValues={setValues} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
