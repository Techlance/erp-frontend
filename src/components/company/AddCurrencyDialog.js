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
import LoadingButton from "../../ui-component/LoadingButton";
import ValidationDialog from "../ValidationDialog";

const AddCurrenyDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { addCurrency } = useCompany();
  const [showValidationModal, setShowValidationModal] = useState(false);

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
    if (code_reg) {
      setClicked(true);
      await addCurrency(values);
      handleCloseModal();
      setClicked(false);
    } else {
      setShowValidationModal(true);
    }
  };

  const codeRegex = new RegExp("^([A-Z]){3}$");
  let code_reg = false;
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
          required
          margin="dense"
          id="currency_name"
          label="Currency Name"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={values.currency_name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="currency"
          required
          label="Currency Code"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={values.currency}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            color:
              codeRegex.test(values.currency) || values.currency == 0
                ? "primary"
                : "error",
          }}
          helperText={
            codeRegex.test(values.currency) || values.currency == 0
              ? ""
              : "Code length should be equals to 3."
          }
          error={
            codeRegex.test(values.currency) || values.currency == 0
              ? false
              : true
          }
          onChange={(event) => {
            event.target.value = event.target.value.toUpperCase();
            handleChange(event);
          }}
        />
        {(code_reg = codeRegex.test(values.currency) ? true : false)}
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <AnimateButton>
          <Button
            onClick={handleClose}
            variant="contained"
            size="small"
            color="error"
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

        <ValidationDialog
          open={showValidationModal}
          handleAgree={() => {
            // deleteCompany(values.id);
            // history.replace("/admin/companies");
          }}
          handleClose={() => setShowValidationModal(false)}
          title="Mistakenly entered wrong values?"
          body="Please enter valid values to save the changes !"
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddCurrenyDialog;
