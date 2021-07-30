import React from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Stack, TextField, Typography } from "@material-ui/core";

// project imports
import Avatar from "../../../../ui-component/extended/Avatar";
import { gridSpacing, MEDIA_URI } from "../../../../store/constant";

// assets
// import Avatar1 from "../../../assets/images/users/user-round.svg";

import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
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
}));

//-----------------------|| PROFILE 2 - USER PROFILE ||-----------------------//

const CompanyProfile = () => {
  const classes = useStyles();

  const { currentCompany } = useCompany();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* <pre>{JSON.stringify(currentCompany, null, 2)}</pre> */}

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
                    id="contained-button-file"
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
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Address" value={currentCompany.address} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Country" defaultValue="country name" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="State" defaultValue="state Name" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Email"
          type="email"
          value={currentCompany.email}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Website"
          InputLabelProps={{ shrink: true }}
          defaultValue="www.company.com"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Contact Number"
          type="number"
          defaultValue={1234567890}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Base Currency"
          InputLabelProps={{ shrink: true }}
          defaultValue="BTC"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="CR. No."
          InputLabelProps={{ shrink: true }}
          defaultValue="x"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Registration No." defaultValue="NJjs788" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Tax ID No."
          InputLabelProps={{ shrink: true }}
          defaultValue="IDID"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="VAT ID No."
          InputLabelProps={{ shrink: true }}
          defaultValue="IDID"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Year Start Date"
          InputLabelProps={{ shrink: true }}
          type="date"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Year End Date"
          InputLabelProps={{ shrink: true }}
          type="date"
        />
      </Grid>
    </Grid>
  );
};

export default CompanyProfile;
