import React, { useState, useEffect } from "react";

// material-ui
import {
  Button,
  Grid,
  Stack,
  TextField,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

// project imports
import useUserPermissions from "../../../../hooks/useUserPermissions";
import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

// assets
import { gridSpacing } from "../../../../store/constant";
import SubCard from "../../../../ui-component/cards/SubCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";
import LoadingButton from "../../../../ui-component/LoadingButton";

//-----------------------|| User Form ||-----------------------//

const UserForm = () => {
  const history = useHistory();
  const { current_user_account } = useSelector(
    (state) => state.userPermissions
  );

  const { updateUser, deleteUser } = useUserPermissions();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [values, setValues] = useState({
    ...current_user_account,
    password: null,
  });

  const [clicked, setClicked] = useState(false);

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

  useEffect(() => {
    setValues({ ...current_user_account, password: null });
  }, [current_user_account]);

  const handleUpdateUser = async () => {
    setClicked(true);
    await updateUser(values);
    setClicked(false);
  };

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item sm={12} md={8}>
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
                type="email"
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
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => setShowDeleteModal(true)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateUser}
                      loading={clicked}
                      startIcon={<SaveIcon />}
                    >
                      Save Details
                    </LoadingButton>
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
          history.replace("/admin/user-manager/users");
        }}
        handleClose={() => setShowDeleteModal(false)}
        title="Are you sure?"
        body="Are you sure you want to delete this Company records? Once deleted the data can not be retrived!"
      />
    </Grid>
  );
};

export default UserForm;
