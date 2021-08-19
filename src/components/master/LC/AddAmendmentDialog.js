import React, { useState } from "react";

import { IconButton, Grid, Stack } from "@material-ui/core";

// assets

// project imports
import { gridSpacing } from "../../../store/constant";

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
import useAuth from "../../../hooks/useAuth";
import useCompany from "../../../hooks/useCompany";

const AddAmendmentDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { createCompany } = useCompany();

  const [showAddCurrencyModal, setShowAddCurrencyModal] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [values, setValues] = useState({
    company_name: "",
    base_currency: { id: 0 },
    address: "",
    country: "",
    state: "",
    email: "",
    website: "",
    contact_no: "",
    cr_no: "",
    registration_no: "",
    tax_id_no: "",
    vat_id_no: "",
    year_start_date: "",
    year_end_date: "",
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

  const handleCreateCompany = async () => {
    setClicked(true);
    await createCompany(values);
    setClicked(false);
    handleClose();
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
        <Typography variant="h4">Create Amendment</Typography>
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          <Typography variant="body2">Create a new company.</Typography>
        </DialogContentText> */}
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="issue_date"
              label="Issue Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={values.issue_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="LDS"
              label="LDS"
              InputLabelProps={{ shrink: true }}
              type="date"
              //   InputProps={{ inputProps: { min: values.year_end_date } }}
              value={values.LDS}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="expiry_date"
              label="Expiry Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              InputProps={{ inputProps: { min: values.issue_date } }}
              value={values.expiry_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lc_amount"
              label="LC Amount"
              type="number"
              value={values.lc_amount}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              multiline
              id="remarks"
              label="Remarks"
              value={values.remarks}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Button
          onClick={handleClose}
          color="error"
          size="small"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          size="small"
          variant="contained"
          disabled={clicked}
          //   onClick={handleCreateCompany}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAmendmentDialog;
