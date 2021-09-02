import React, { useState, useEffect } from "react";
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

import { useHistory } from "react-router";

// assets
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { gridSpacing } from "../../../store/constant";
import SubCard from "../../../ui-component/cards/SubCard";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CloudUploadIcon from "@material-ui/icons/CloudUploadTwoTone";

// project imports
import useCompany from "../../../hooks/useCompany";
import CurrencySelect from "../../../components/company/CurrencySelect";
import AddCurrenyDialog from "../../../components/company/AddCurrencyDialog";
import ImageUpdateDialog from "../../../components/company/ImageUpdateDialog";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import { useSelector } from "react-redux";
import LoadingButton from "../../../ui-component/LoadingButton";

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
  const [clicked, setClicked] = useState(false);

  const [values, setValues] = useState({ ...current_company });

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
    setClicked(true);
    await updateCompany(values);
    setClicked(false);
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
                fullWidth
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
                multiline
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
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="website"
                label="Website"
                InputLabelProps={{ shrink: true }}
                value={values.website}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="contact_no"
                label="Contact Number"
                type="number"
                value={values.contact_no}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack direction="row">
                <CurrencySelect
                  captionLabel="Base Currency"
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
                fullWidth
                id="year_end_date"
                label="Year End Date"
                InputLabelProps={{ shrink: true }}
                type="date"
                InputProps={{ inputProps: { min: values.year_end_date } }}
                value={values.year_end_date}
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
        handleAgree={() => {
          deleteCompany(values.id);
          history.replace("/admin/companies");
        }}
        handleClose={() => setShowDeleteModal(false)}
        title="Are you sure?"
        body="Are you sure you want to delete this Company records? Once deleted the data can not be retrived!"
      />
    </Grid>
  );
};

export default CompanyForm;
