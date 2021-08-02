import React from "react";

// material-ui
// import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";

// project imports
// import Avatar from "../../../../ui-component/extended/Avatar";
import { gridSpacing } from "../../../../store/constant";

// assets
// import Avatar1 from "../../../assets/images/users/user-round.svg";

// import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import useCompany from "../../../../hooks/useCompany";
// import FormControlSelect from "../../../../ui-component/extended/Form/FormControlSelect";

// style constant
// const useStyles = makeStyles((theme) => ({
//   alertIcon: {
//     height: "16px",
//     width: "16px",
//     marginRight: "8px",
//     verticalAlign: "text-bottom",
//   },
//   userAvatar: {
//     height: "80px",
//     width: "80px",
//   },
// }));

//-----------------------|| PROFILE 2 - USER PROFILE ||-----------------------//

const GroupsProfile = () => {
  // const classes = useStyles();

  const { currentCompany, updateForm } = useCompany();

  return (
    
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          label="Group Name"
          value={currentCompany.name}
          InputLabelProps={{ shrink: true }}
          onChange={(e)=>{updateForm({name:e.target.value})}}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField fullWidth label="Backdated Days" type="number" value={currentCompany.email} InputLabelProps={{ shrink: true }} onChange={(e)=>{updateForm({email:e.target.value})}}/>
      </Grid>
    </Grid>
  );
};

export default GroupsProfile;
