import React from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Typography, FormControlLabel, Switch } from "@material-ui/core";

// project imports
// import Avatar from "../../../../ui-component/extended/Avatar";
import { gridSpacing } from "../../../../store/constant";

// assets
// import Avatar1 from "../../../assets/images/users/user-round.svg";

// import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import useCompany from "../../../../hooks/useCompany";
// import FormControlSelect from "../../../../ui-component/extended/Form/FormControlSelect";

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

const RightsProfile = () => {
  const classes = useStyles();

  const { currentCompany, updateForm } = useCompany();

  return (
    
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Name"
          value={currentCompany.name}
          InputLabelProps={{ shrink: true }}
          onChange={(e)=>{updateForm({name:e.target.value})}}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="email" type="email" value={currentCompany.email} InputLabelProps={{ shrink: true }} onChange={(e)=>{updateForm({email:e.target.value})}}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.cardTitle} variant="h5" component="span" sx={{ textTransform: 'uppercase' }}>
              User Groups Related Fields
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column" spacing={0}>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch checked={true} onChange={()=>{return null}} name="checkedA" color="primary" />
                  }
                  label="Can View"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch checked={true} onChange={()=>{return null}} name="checkedB" color="primary" />
                  }
                  label="Can Create"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch checked={true} onChange={()=>{return null}} name="checkedB" color="primary" />
                  }
                  label="Can Edit"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                      <Switch checked={true} onChange={()=>{return null}} name="checkedC" color="primary" />
                  }
                  label="Can Delete"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RightsProfile;