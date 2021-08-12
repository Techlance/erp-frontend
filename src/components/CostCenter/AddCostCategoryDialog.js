import React, { useState } from "react";

import { Grid, Switch, FormControlLabel } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../store/constant";

// material-ui
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
// import useUserPermissions from "../../hooks/useUserPermissions";

const AddCostCategoryDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  //   const { createUser } = useUserPermissions();

  const [values, setValues] = useState({
    cost_category: "",
    created_by: user.email,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  //   const handleChecked = (event) => {
  //     setValues({
  //       ...values,
  //       [event.target.name]: event.target.checked,
  //     });
  //   };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-cost-category"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Add Cost Category</Typography>
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          <Typography variant="body2">Create a new user.</Typography>
        </DialogContentText> */}
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="cost_category_name"
              label="Cost Category Name"
              value={values.name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
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
            // createUser(values);
          }}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCostCategoryDialog;
