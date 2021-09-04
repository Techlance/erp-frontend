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

// assets
import AddCircleIcon from "@material-ui/icons/AddCircleTwoTone";
import CancelIcon from "@material-ui/icons/CancelTwoTone";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import LoadingButton from "../../ui-component/LoadingButton";

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

  const [clicked, setClicked] = useState(false);

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

  const handleAddCurrency = async () => {
    setClicked(true);
    await addCurrency(values, () => handleCloseModal());
    setClicked(false);
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
          <Typography variant="body2">Create a New Currency Record.</Typography>
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
        <AnimateButton>
          <Button
            onClick={handleClose}
            variant="contained"
            size="small"
            color="error"
            disabled={clicked}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </AnimateButton>
        <LoadingButton
          loading={clicked}
          onClick={handleAddCurrency}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddCircleIcon />}
        >
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddCurrenyDialog;
