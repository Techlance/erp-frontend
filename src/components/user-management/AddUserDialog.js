import React, { useState } from "react";

// material-ui
import {
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircleTwoTone";
import CancelIcon from "@material-ui/icons/Cancel";

// project imports
import useAuth from "../../hooks/useAuth";
import { gridSpacing } from "../../store/constant";
import useUserPermissions from "../../hooks/useUserPermissions";
import LoadingButton from "../../ui-component/LoadingButton";
import AnimateButton from "../../ui-component/extended/AnimateButton";

const AddUserDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { createUser } = useUserPermissions();

  const [values, setValues] = useState({
    name: "",
    email: "",
    is_superuser: false,
    created_by: user.email,
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

  const handleCreateUser = async () => {
    setClicked(true);
    await createUser(values);
    setClicked(false);
    setValues({
      name: "",
      email: "",
      is_superuser: false,
      created_by: user.email,
    });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-user"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create User</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create a new user.</Typography>
        </DialogContentText>
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
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <AnimateButton>
          <Button
            color="error"
            variant="contained"
            size="small"
            onClick={handleClose}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </AnimateButton>
        <LoadingButton
          color="primary"
          variant="contained"
          size="small"
          onClick={handleCreateUser}
          loading={clicked}
          startIcon={<AddCircleIcon />}
        >
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
