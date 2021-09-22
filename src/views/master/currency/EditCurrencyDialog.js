import React, { useEffect, useState } from "react";

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@material-ui/core";

// assets
import SaveIcon from "@material-ui/icons/SaveTwoTone";
import CancelIcon from "@material-ui/icons/CancelTwoTone";

// project imports
import useCompany from "../../../hooks/useCompany";
import LoadingButton from "../../../ui-component/LoadingButton";
import ValidationDialog from "../../../components/ValidationDialog";

const EditCurrenyDialog = ({ open, handleClose, data }) => {
  const { updateCurrency } = useCompany();

  const [clicked, setClicked] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  const [values, setValues] = useState({
    id: data.id,
    created_by: data.created_by,
    currency_name: data.currency_name,
    currency: data.currency,
  });

  useEffect(() => {
    setValues({
      id: data.id,
      created_by: data.created_by,
      currency_name: data.currency_name,
      currency: data.currency,
    });
  }, [data]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleCloseModal = () => {
    handleClose();
  };

  const handleUpdateCurrency = async () => {
    if (code_reg) {
      setClicked(true);
      await updateCurrency(values);
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
        <Typography variant="h4">Update Curreny</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Update base currency.</Typography>
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="currency_name"
          label="Currency Name"
          required
          fullWidth
          value={values.currency_name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="currency"
          label="Currency Code"
          required
          fullWidth
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
        <Stack direction="row">
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item>
              <Button
                onClick={handleClose}
                variant="contained"
                color="error"
                size="small"
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <LoadingButton
                loading={clicked}
                onClick={handleUpdateCurrency}
                variant="contained"
                color="primary"
                size="small"
                startIcon={<SaveIcon />}
              >
                Save
              </LoadingButton>
            </Grid>
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
            ;
          </Grid>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default EditCurrenyDialog;
