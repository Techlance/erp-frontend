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
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// project imports
import Avatar from "../../../../ui-component/extended/Avatar";
import { gridSpacing, MEDIA_URI } from "../../../../store/constant";

import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import useCompany from "../../../../hooks/useCompany";
import FormControlSelect from "../../../../ui-component/extended/Form/FormControlSelect";
import AddCurrenyDialog from "../../../../components/AddCurrencyDialog";

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

const CompanyProfile = () => {
  const classes = useStyles();

  const { currentCompany, currency, updateForm } = useCompany();

  const [showAddCurrencyModal, setShowAddCurrencyModal] = useState(false);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* <pre>{JSON.stringify({ currentCompany, currency }, null, 2)}</pre> */}

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              alt={currentCompany.company_name}
              src={`${MEDIA_URI}${currentCompany.logo}`}
              className={classes.userAvatar}
            />
          </Grid>
          <Grid item sm zeroMinWidth>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <input
                    accept="image/*"
                    sx={{ display: "none" }}
                    id="contained-button-file button"
                    class="MuiInput-root"
                    multiple
                    type="file"
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
          label="Company Name"
          value={currentCompany.company_name}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            updateForm({ company_name: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Address"
          value={currentCompany.address}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            updateForm({ address: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Country"
          value={currentCompany.country}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            updateForm({ country: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="State"
          value={currentCompany.state}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            updateForm({ state: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Email"
          type="email"
          value={currentCompany.email}
          onChange={(e) => {
            updateForm({ email: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Website"
          InputLabelProps={{ shrink: true }}
          value={currentCompany.website}
          onChange={(e) => {
            updateForm({ website: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Contact Number"
          type="number"
          value={currentCompany.contact_no}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            updateForm({ contact_no: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <FormControlSelect
          fullWidth
          captionLabel="Base Currency"
          InputLabelProps={{ shrink: true }}
          currencies={currency}
          selected={currentCompany.base_currency}
          onChange={updateForm}
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
          label="CR. No."
          InputLabelProps={{ shrink: true }}
          value={currentCompany.cr_no}
          onChange={(e) => {
            updateForm({ cr_no: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Registration No."
          value={currentCompany.registration_no}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            updateForm({ registration_no: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Tax ID No."
          InputLabelProps={{ shrink: true }}
          value={currentCompany.tax_id_no}
          onChange={(e) => {
            updateForm({ tax_id_no: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="VAT ID No."
          InputLabelProps={{ shrink: true }}
          value={currentCompany.vat_id_no}
          onChange={(e) => {
            updateForm({ vat_id_no: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Year Start Date"
          InputLabelProps={{ shrink: true }}
          type="date"
          value={currentCompany.year_start_date}
          onChange={(e) => {
            updateForm({ year_start_date: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Year End Date"
          InputLabelProps={{ shrink: true }}
          type="date"
          value={currentCompany.year_end_date}
          onChange={(e) => {
            updateForm({ year_end_date: e.target.value });
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CompanyProfile;
