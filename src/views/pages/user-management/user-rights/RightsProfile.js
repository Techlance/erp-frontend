import React, { useState } from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

// project imports
// import Avatar from "../../../../ui-component/extended/Avatar";
import { gridSpacing } from "../../../../store/constant";

// assets
// import Avatar1 from "../../../assets/images/users/user-round.svg";

// import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import useCompany from "../../../../hooks/useCompany";
import useAuth from "../../../../hooks/useAuth";
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
  const { user } = useAuth();

  const { currentCompany, updateForm } = useCompany();

  const [values, setValues] = useState({
    user_group_id: 3,
    transaction_id: 4,
    can_create: true,
    can_alter: true,
    can_delete: true,
    can_view: true,
    created_by: user.email,
  });

  const handleChecked = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="User Group - ID"
          type="number"
          value={currentCompany.name}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            updateForm({ name: e.target.value });
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Transaction ID"
          type="number"
          value={currentCompany.email}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            updateForm({ email: e.target.value });
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12}>
            <Typography
              className={classes.cardTitle}
              variant="h5"
              component="span"
              sx={{ textTransform: "uppercase" }}
            >
              User Groups Related Fields
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid container direction="column" spacing={0}>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      id="can_create"
                      name="can_create"
                      checked={values.can_create}
                      onChange={handleChecked}
                      color="primary"
                    />
                  }
                  label="Can Create"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={handleChecked}
                      name="can_alter"
                      id="can_alter"
                      checked={values.can_alter}
                      color="primary"
                    />
                  }
                  label="Can Edit"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={handleChecked}
                      name="can_view"
                      id="can_view"
                      checked={values.can_view}
                      color="primary"
                    />
                  }
                  label="Can View"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      name="can_delete"
                      onChange={handleChecked}
                      id="can_delete"
                      checked={values.can_delete}
                      color="primary"
                    />
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
