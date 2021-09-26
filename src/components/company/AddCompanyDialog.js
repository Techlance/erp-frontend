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
  IconButton,
  Grid,
  Stack,
} from "@material-ui/core";

// project imports
import useAuth from "../../hooks/useAuth";
import useCompany from "../../hooks/useCompany";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import { gridSpacing } from "../../store/constant";
import AddCurrenyDialog from "./AddCurrencyDialog";
import CurrencySelect from "../../components/company/CurrencySelect";
import ValidationDialog from "../../components/ValidationDialog";

// assets
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/Cancel";
import LoadingButton from "../../ui-component/LoadingButton";

const AddCompanyDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { createCompany } = useCompany();

  const [showAddCurrencyModal, setShowAddCurrencyModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  const [clicked, setClicked] = useState(false);

  let emailreg = false;
  let urlreg = false;
  let phonereg = false;
  const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.+[a-z]{2,3}$");
  const urlRegex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );
  const phoneRegex = new RegExp(
    "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
  );

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
    if (urlreg && emailreg && phonereg) {
      setClicked(true);
      await createCompany(values);
      setClicked(false);
      setValues({
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
      handleClose();
    } else {
      setShowValidationModal(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-company"
      fullWidth="true"
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create Company</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create a New Company Record.</Typography>
        </DialogContentText>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="company_name"
              label="Company Name"
              value={values.company_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="address"
              label="Address"
              value={values.address}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="country"
              label="Country"
              value={values.country}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="state"
              label="State"
              value={values.state}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                color: emailRegex.test(values.email) ? "primary" : "error",
              }}
              helperText={
                emailRegex.test(values.email)
                  ? ""
                  : "Please enter a valid email."
              }
              label="Email"
              type="email"
              value={values.email}
              error={emailRegex.test(values.email) ? false : true}
              onChange={handleChange}
            />
            {(emailreg = emailRegex.test(values.email) ? true : false)}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="website"
              label="Website"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                color: urlRegex.test(values.website) ? "primary" : "error",
              }}
              helperText={
                urlRegex.test(values.website) ? "" : "Please enter a valid URL."
              }
              value={values.website}
              error={urlRegex.test(values.website) ? false : true}
              onChange={handleChange}
            />
            {(urlreg = urlRegex.test(values.website) ? true : false)}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="contact_no"
              label="Contact Number"
              type="tel"
              value={values.contact_no}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                color: phoneRegex.test(values.contact_no) ? "primary" : "error",
              }}
              helperText={
                phoneRegex.test(values.contact_no)
                  ? ""
                  : "Please enter a valid Contact No."
              }
              error={phoneRegex.test(values.contact_no) ? false : true}
              onChange={handleChange}
            />
            {(phonereg = phoneRegex.test(values.contact_no) ? true : false)}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row">
              <CurrencySelect
                captionLabel="Base Currency*"
                InputLabelProps={{ shrink: true }}
                selected={values.base_currency}
                onChange={handleSelect}
              />

              <IconButton
                aria-label="add-currency"
                onClick={() => setShowAddCurrencyModal(true)}
              >
                <AddCircleOutlineIcon fontSize="medium" />
              </IconButton>

              <AddCurrenyDialog
                open={showAddCurrencyModal}
                handleClose={() => setShowAddCurrencyModal(false)}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="cr_no"
              label="CR. No."
              InputLabelProps={{ shrink: true }}
              value={values.cr_no}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="registration_no"
              label="Registration No."
              value={values.registration_no}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="tax_id_no"
              label="Tax ID No."
              InputLabelProps={{ shrink: true }}
              value={values.tax_id_no}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="vat_id_no"
              label="VAT ID No."
              InputLabelProps={{ shrink: true }}
              value={values.vat_id_no}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="year_start_date"
              label="Year Start Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={values.year_start_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="year_end_date"
              label="Year End Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              InputProps={{ inputProps: { min: values.year_start_date } }}
              value={values.year_end_date}
              onChange={handleChange}
            />
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
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <AnimateButton>
          <Button
            onClick={handleClose}
            color="error"
            size="small"
            variant="contained"
            disabled={clicked}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </AnimateButton>
        <LoadingButton
          color="primary"
          size="small"
          variant="contained"
          loading={clicked}
          onClick={handleCreateCompany}
          startIcon={<SaveIcon />}
        >
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddCompanyDialog;
