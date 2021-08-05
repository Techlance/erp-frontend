import React, { useState } from "react";

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
import useCompany from "../../hooks/useCompany";

const AddCurrenyDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { addCurrency } = useCompany();

  const [values, setValues] = useState({
    created_by: user.email,
    currency_name: "",
    currency: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleCloseModal = () => {
    setValues({
      created_by: user.email,
      currency_name: "",
      currency: "",
    });
    handleClose();
  };

  const handleAddCurrency = () => {
    addCurrency(values);
    handleCloseModal();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-currency"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create Curreny</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create a new base currency.</Typography>
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="currency_name"
          label="Currency Name"
          fullWidth
          value={values.currency_name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="currency"
          label="Currency Code"
          fullWidth
          value={values.currency}
          onChange={(event) => {
            event.target.value = event.target.value.toUpperCase();
            handleChange(event);
          }}
        />
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleAddCurrency}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCurrenyDialog;
