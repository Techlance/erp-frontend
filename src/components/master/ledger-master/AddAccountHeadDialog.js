import React, { useEffect, useState } from "react";

import { Grid, Switch, FormControlLabel } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../store/constant";

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
} from "@material-ui/core";

// project imports
import useAuth from "../../hooks/useAuth";
import useLedgerMaster from "../../hooks/useLedgerMaster";
import { useSelector } from "react-redux";

const AddUserDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const company = useSelector()
  const { addCompanyAccountHead } = useLedgerMaster();

  const [values, setValues] = useState({
    'schedule_no':null,
    'acc_head_name':"",
    "title":"ASSETS",
    "bs":true,
    "company_id":0,
    "created_by":user.email
  });

  useEffect(()=>{
      setValues({
          ...values,
          company_id:0,
          created_by:user.email
      })
  },[user])

  const [clicked, setClicked] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleChecked = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async () => {
    setClicked(true);
    await addCompanyAccountHead(values);
    setClicked(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-user"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create User</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create a new user.</Typography>
        </DialogContentText>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id=""
              label="User Name"
              value={values.name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={handleSubmit}
          disabled={clicked}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
