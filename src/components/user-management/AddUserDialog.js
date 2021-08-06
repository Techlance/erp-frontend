import React, { useState } from "react";

import { IconButton, Grid, Switch, FormControlLabel } from "@material-ui/core";

// assets
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// project imports
import { gridSpacing } from "../../store/constant";
// import AddCurrenyDialog from "./AddCurrencyDialog";
// import CurrencySelect from "../../components/company/CurrencySelect";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";

// project imports
import useAuth from "../../hooks/useAuth";
import useUserPermissions from "../../hooks/useUserPermissions";

const useStyles = makeStyles((theme) => ({
  alertIcon: {
    height: "16px",
    width: "16px",
    marginRight: "8px",
    verticalAlign: "text-bottom",
  },
  userAvatar: {
    height: "80px",
    width: "80px",
  },
  addButtonGrid: {
    paddingTop: "1 !important",
    paddingLeft: "0 !important",
  },
}));

const AddUserDialog = ({ open, handleClose }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const { createUser } = useUserPermissions();

  const [values, setValues] = useState({
    name: '',
    email: '',
    is_superuser: false,
    created_by: user.email,
  });

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
        <pre>{JSON.stringify(values, null, 2)}</pre>
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
      </Grid>
      
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            createUser(values);
          }}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;