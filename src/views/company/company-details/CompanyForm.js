import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@material-ui/core";

// assets
import SubCard from "../../../ui-component/cards/SubCard";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import LoadingButton from "../../../ui-component/LoadingButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CloudUploadIcon from "@material-ui/icons/CloudUploadTwoTone";

// project imports
import useCompany from "../../../hooks/useCompany";
import CurrencySelect from "../../../components/company/CurrencySelect";
import { gridSpacing } from "../../../store/constant";
import AddCurrenyDialog from "../../../components/company/AddCurrencyDialog";
import ImageUpdateDialog from "../../../components/company/ImageUpdateDialog";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import ValidationDialog from "../../../components/ValidationDialog";

// style constant
const useStyles = makeStyles((theme) => ({
  accountAvatar: {
    width: "100px",
    height: "100px",
    margin: "0 auto",
  },
  accountContent: {
    textAlign: "center",
  },
}));

//-----------------------|| Company Form ||-----------------------//

const CompanyForm = () => {
  const classes = useStyles();
  const history = useHistory();

  const { current_company } = useSelector((state) => state.company);
  const { updateCompany, deleteCompany } = useCompany();

  const [showAddCurrencyModal, setShowAddCurrencyModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [values, setValues] = useState({ ...current_company });

  let emailreg = false;
  let urlreg = false;
  let phonereg = false;
  let cr_no_reg = false;
  const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.+[a-z]{2,3}$");
  const crNoRegex = new RegExp("^[^!@#$%^&*()]*$");
  const phoneRegex = new RegExp(
    "^[+]?[0-9]{3}?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
  );
  const urlRegex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );

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

  const handleFileUpload = (event) => {
    setValues({
      ...values,
      logo: event.target.files[0],
    });
  };

  useEffect(() => {
    setValues({ ...current_company });
  }, [current_company]);

  const handleUpdateDetails = async () => {
    if (urlreg && emailreg && phonereg && cr_no_reg) {
      setClicked(true);
      await updateCompany(values);
      setClicked(false);
    } else {
      setShowValidationModal(true);
    }
  };

  const handleAgree = async () => {
    await deleteCompany(values.id);
    history.replace("/admin/companies");
  };

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item sm={6} md={4}>
        <SubCard title="Company Logo" contentClass={classes.accountContent}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Avatar
                alt={values?.company_name}
                src={values?.logo}
                className={classes.accountAvatar}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="center">
                Upload/Change Company Logo
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setShowImageModal(true)}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Logo
                </Button>
              </AnimateButton>

              <ImageUpdateDialog
                open={showImageModal}
                handleClose={() => setShowImageModal(false)}
                handleFileUpload={handleFileUpload}
                values={values}
              />
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <Grid item sm={6} md={8}>
        <SubCard title="Edit Account Details">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="company_name"
                label="Company Name"
                value={values.company_name}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  color: values.company_name.length === 0 ? "error" : "primary",
                }}
                helperText={
                  values.company_name.length === 0
                    ? "Company cannot be null."
                    : ""
                }
                error={values.company_name.length === 0 ? true : false}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                multiline
                id="address"
                label="Address"
                value={values.address}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  color: values.address.length === 0 ? "error" : "primary",
                }}
                helperText={
                  values.address.length === 0 ? "Address cannot be null." : ""
                }
                error={values.address.length === 0 ? true : false}
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
                InputProps={{
                  color: values.country.length === 0 ? "error" : "primary",
                }}
                helperText={
                  values.country.length === 0
                    ? "Country Name cannot be null."
                    : ""
                }
                error={values.country.length === 0 ? true : false}
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
                InputProps={{
                  color: values.state.length === 0 ? "error" : "primary",
                }}
                helperText={
                  values.state.length === 0 ? "State Name cannot be null." : ""
                }
                error={values.state.length === 0 ? true : false}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                InputLabelProps={{ shrink: true }}
                label="Email"
                type="email"
                value={values.email}
                InputProps={{
                  color:
                    emailRegex.test(values.email) || values.email.length === 0
                      ? "primary"
                      : "error",
                }}
                helperText={
                  emailRegex.test(values.email) || values.email.length === 0
                    ? ""
                    : "Please enter a valid email."
                }
                error={
                  emailRegex.test(values.email) || values.email.length === 0
                    ? false
                    : true
                }
                onChange={handleChange}
              />
              {
                (emailreg =
                  emailRegex.test(values.email) || values.email.length === 0
                    ? true
                    : false)
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="website"
                label="Website"
                InputLabelProps={{ shrink: true }}
                value={values.website}
                InputProps={{
                  color:
                    urlRegex.test(values.website) || values.website.length === 0
                      ? "primary"
                      : "error",
                }}
                helperText={
                  urlRegex.test(values.website) || values.website.length === 0
                    ? ""
                    : "Please enter a valid URL."
                }
                error={
                  urlRegex.test(values.website) || values.website.length === 0
                    ? false
                    : true
                }
                onChange={handleChange}
              />
              {
                (urlreg =
                  urlRegex.test(values.website) || values.website.length === 0
                    ? true
                    : false)
              }
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
                  color:
                    phoneRegex.test(values.contact_no) ||
                    values.contact_no.length === 0
                      ? "primary"
                      : "error",
                }}
                helperText={
                  phoneRegex.test(values.contact_no) ||
                  values.contact_no.length === 0
                    ? ""
                    : "Please enter a valid Contact No."
                }
                error={
                  phoneRegex.test(values.contact_no) ||
                  values.contact_no.length === 0
                    ? false
                    : true
                }
                onChange={handleChange}
              />
              {
                (phonereg =
                  phoneRegex.test(values.contact_no) ||
                  values.contact_no.length === 0
                    ? true
                    : false)
              }
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
                InputProps={{
                  color:
                    crNoRegex.test(values.cr_no) || values.cr_no.length === 0
                      ? "primary"
                      : "error",
                }}
                helperText={
                  crNoRegex.test(values.cr_no) || values.cr_no.length === 0
                    ? ""
                    : "CR No. should not contain any symbols."
                }
                error={
                  crNoRegex.test(values.cr_no) || values.cr_no.length === 0
                    ? false
                    : true
                }
                onChange={handleChange}
              />
              {
                (cr_no_reg =
                  crNoRegex.test(values.cr_no) || values.cr_no.length === 0
                    ? true
                    : false)
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="registration_no"
                label="Registration No."
                value={values.registration_no}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  color:
                    crNoRegex.test(values.registration_no) ||
                    values.registration_no.length === 0
                      ? "primary"
                      : "error",
                }}
                helperText={
                  crNoRegex.test(values.registration_no) ||
                  values.registration_no.length === 0
                    ? ""
                    : "Registration No. should not contain any symbols."
                }
                error={
                  crNoRegex.test(values.registration_no) ||
                  values.registration_no.length === 0
                    ? false
                    : true
                }
                onChange={handleChange}
              />
              {
                (cr_no_reg =
                  crNoRegex.test(values.registration_no) ||
                  values.registration_no.length === 0
                    ? true
                    : false)
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="tax_id_no"
                label="Tax ID No."
                InputLabelProps={{ shrink: true }}
                value={values.tax_id_no}
                InputProps={{
                  color:
                    crNoRegex.test(values.tax_id_no) ||
                    values.tax_id_no.length === 0
                      ? "primary"
                      : "error",
                }}
                helperText={
                  crNoRegex.test(values.tax_id_no) ||
                  values.tax_id_no.length === 0
                    ? ""
                    : "TAX ID No. should not contain any symbols."
                }
                error={
                  crNoRegex.test(values.tax_id_no) ||
                  values.tax_id_no.length === 0
                    ? false
                    : true
                }
                onChange={handleChange}
              />
              {
                (cr_no_reg =
                  crNoRegex.test(values.tax_id_no) ||
                  values.tax_id_no.length === 0
                    ? true
                    : false)
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="vat_id_no"
                label="VAT ID No."
                InputLabelProps={{ shrink: true }}
                value={values.vat_id_no}
                InputProps={{
                  color:
                    crNoRegex.test(values.vat_id_no) ||
                    values.vat_id_no.length === 0
                      ? "primary"
                      : "error",
                }}
                helperText={
                  crNoRegex.test(values.vat_id_no) ||
                  values.vat_id_no.length === 0
                    ? ""
                    : "VAT ID No. should not contain any symbols."
                }
                error={
                  crNoRegex.test(values.vat_id_no) ||
                  values.vat_id_no.length === 0
                    ? false
                    : true
                }
                onChange={handleChange}
              />
              {crNoRegex.test(values.vat_id_no) || values.vat_id_no.length === 0
                ? true
                : false}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="year_start_date"
                label="Year Start Date"
                InputLabelProps={{ shrink: true }}
                type="date"
                value={values.year_start_date}
                InputProps={{
                  color:
                    values.year_start_date.length === 0 ? "error" : "primary",
                }}
                helperText={
                  values.year_start_date.length === 0
                    ? "Start Date cannot be null."
                    : ""
                }
                error={values.year_start_date.length === 0 ? true : false}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="year_end_date"
                label="Year End Date"
                InputLabelProps={{ shrink: true }}
                type="date"
                value={values.year_end_date}
                InputProps={{
                  color:
                    values.year_end_date.length === 0 ? "error" : "primary",
                }}
                helperText={
                  values.year_end_date.length === 0
                    ? "End Date cannot be null."
                    : ""
                }
                error={values.year_end_date.length === 0 ? true : false}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row">
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => setShowDeleteModal(true)}
                        disabled={clicked}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateDetails}
                      startIcon={<SaveIcon />}
                      loading={clicked}
                    >
                      Save Details
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <ConfirmDeleteDialog
        open={showDeleteModal}
        handleAgree={handleAgree}
        handleClose={() => setShowDeleteModal(false)}
        title="Are you sure?"
        body="Are you sure you want to delete this Company records? Once deleted the data can not be retrived!"
      />
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
  );
};

export default CompanyForm;
