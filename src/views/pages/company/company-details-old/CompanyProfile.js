import React, { useState } from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@material-ui/core";

// assets
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Avatar from "../../../../ui-component/extended/Avatar";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";

// project imports
import { gridSpacing } from "../../../../store/constant";
import AddCurrenyDialog from "../../../../components/company/AddCurrencyDialog";
import CurrencySelect from "../../../../components/company/CurrencySelect";
import config from "../../../../config";
import useCompany from "../../../../hooks/useCompany";

// style constant
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

//-----------------------|| Company Profile ||-----------------------//

const CompanyProfile = ({ values, setValues }) => {
  const classes = useStyles();

  const { current_company_docs } = useCompany();

  const [showAddCurrencyModal, setShowAddCurrencyModal] = useState(false);

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

  const hadleFileUpload = (event) => {
    console.log(event.target.files[0]);
    setValues({
      ...values,
      logo: event.target.files[0],
    });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <pre></pre>
      <Grid item xs={12}>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <pre>{JSON.stringify(current_company_docs, null, 2)}</pre>

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              alt={values.company_name}
              src={`${config.media_uri}${values.logo}`}
              className={classes.userAvatar}
            />
          </Grid>
          <Grid item sm zeroMinWidth>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <input
                    id="contained-button-file button"
                    accept="image/*"
                    class="MuiInput-root"
                    multiple
                    type="file"
                    sx={{ display: "none" }}
                    onChange={hadleFileUpload}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">
                  <ErrorTwoToneIcon className={classes.alertIcon} />
                  Image size Limit should be 125kb Max.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
      <Grid item xs={12} sm={5}>
        <CurrencySelect
          captionLabel="Base Currency"
          InputLabelProps={{ shrink: true }}
          selected={values.base_currency}
          onChange={handleSelect}
        />
      </Grid>
      <Grid item xs={12} sm={1} className={classes.addButtonGrid}>
        <IconButton
          aria-label="add-currency"
          onClick={() => setShowAddCurrencyModal(true)}
        >
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>

        <AddCurrenyDialog
          open={showAddCurrencyModal}
          handleClose={() => setShowAddCurrencyModal(false)}
        />
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
    </Grid>
  );
};

export default CompanyProfile;
