import React, { useState } from "react";

import { IconButton, Grid } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../store/constant";
import CurrencySelect from "../../components/company/CurrencySelect";

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
import useCompany from "../../hooks/useCompany";

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

const AddCostCenterDialog = ({ open, handleClose }) => {
  //   const classes = useStyles();
  const { user } = useAuth();
  //   const { createCompany } = useCompany();

  const [values, setValues] = useState({
    cost_center_name: "",
    cost_category: { id: 0 },
    child_of: "Primary",
    created_by: user.email,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-company"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Add Cost Center</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create a new cost center.</Typography>
        </DialogContentText>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="cost_center_name"
              label="Cost Category Name"
              value={values.cost_center_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="chil_of"
              label="Child Of"
              value={values.child_of}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <CurrencySelect
              captionLabel="Cost Category"
              InputLabelProps={{ shrink: true }}
              selected={values.cost_category}
              onChange={handleSelect}
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
            // createCompany(values);
          }}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCostCenterDialog;
