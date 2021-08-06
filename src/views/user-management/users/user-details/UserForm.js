import React, { useState, useEffect } from "react";
// material-ui
import { makeStyles } from "@material-ui/core/styles";


import {
  // Avatar,
  Button,
  Grid,
  Stack,
  TextField,
  // Typography,
  // IconButton,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

// assets
// import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { gridSpacing } from "../../../../store/constant";
import SubCard from "../../../../ui-component/cards/SubCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";

// project imports
import useUserPermissions from "../../../../hooks/useUserPermissions";
// import CurrencySelect from "../../../../components/company/CurrencySelect";
// import AddCurrenyDialog from "../../../../components/company/AddCurrencyDialog";
// import ImageUpdateDialog from "../../../../components/company/ImageUpdateDialog";
import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";
import { useHistory } from "react-router";


// style constant
const useStyles = makeStyles((theme) => ({
  accountAvatar: {
    width: "100px",
    height: "100px",
    margin: "0 auto",
  },
  accountContent: {
    textAlign: "center",
  },
}));

//-----------------------|| User Form ||-----------------------//

const UserForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { current_user_account, updateUser, deleteUser } = useUserPermissions();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [values, setValues] = useState({ ...current_user_account });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };
  
  const handleChecked = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };


  useEffect(() => {
    setValues({ ...current_user_account });
  }, [current_user_account]);

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item sm={12} md={12}>
        <SubCard title="Edit User Details">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                label="User Name"
                value={values.name}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='email'
                id="email"
                label="E-mail"
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
        {/* <PermissionChecklist values={values} setValues={setValues} /> */}
        <FormControlLabel
          control={
            <Switch
              id="is_superuser"
              checked={values.is_superuser}
              onChange={handleChecked}
              name="is_superuser"
              color="primary"
            />
          }
          label="Super User"
        />
      </Grid>

            <Grid item xs={12}>
              <Stack direction="row">
                <Grid container spacing={3}>
                  <Grid item>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          updateUser(values);
                          // history.replace('/admin/user-manager/users')

                        }}
                      >
                        Change Details
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        Delete
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <ConfirmDeleteDialog
        open={showDeleteModal}
        handleAgree={() => {
          deleteUser(values.id);
          history.replace('/admin/user-manager/users')
        }}
        handleClose={() => setShowDeleteModal(false)}
        title="Are you sure?"
        body="Are you sure you want to delete this Company records? Once deleted the data can not be retrived!"
      />
    </Grid>
  );
};

export default UserForm;