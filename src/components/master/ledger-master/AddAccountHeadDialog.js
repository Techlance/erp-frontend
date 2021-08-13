import React, { useEffect, useState } from "react";

import { Grid, Switch, FormControlLabel } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../store/constant";
import LoadingButton from '../../../ui-component/LoadingButton'


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

import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from '@material-ui/icons/Cancel';

// project imports
import useAuth from "../../../hooks/useAuth";
import useLedgerMaster from "../../../hooks/useLedgerMaster";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import HeadTitleSelect from "./HeadTitleSelect";

const AddUserDialog = ({ open, handleClose }) => {
  const { user } = useAuth()
  const { addCompanyAccountHead } = useLedgerMaster();
  const { mid } = useParams();

  const { company_account_heads } = useSelector((state) => state.ledgerMaster);

  const [values, setValues] = useState({
    schedule_no: null,
    acc_head_name: "",
    title: "ASSETS",
    bs: true,
    company_id: mid,
    created_by: user.email,
  });

  useEffect(()=>{
      if(company_account_heads?.find(acc=>acc.schedule_no===values.schedule_no)){
        setError(false)
      }
      else{
        setError(true)
      }
  },[company_account_heads])


  useEffect(() => {
    setValues({
      ...values,
      created_by: user.email,
    });
  }, [user]);

  const [clicked, setClicked] = useState(false);
  const [error,setError] = useState(false);

  const handleChange = (event) => {
    if(event.target.id==="schedule_no"){
      if(company_account_heads.find(acc=>acc.schedule_no===event.target.value)){
        setError(false)
      }
      else{
        setError(true)
      }
    }
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

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
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
        <Typography variant="h4">Create Account Head</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create a new account head.</Typography>
        </DialogContentText>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="schedule_no"
              label="Schedule Number"
              value={values.schedule_no}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              type="number"
              error={error}
              helperText={error && "This Schedule No. Already Exists."}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="acc_head_name"
              label="Accound Head Name"
              value={values.acc_head_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HeadTitleSelect
                captionLabel="Title"
                InputLabelProps={{ shrink: true }}
                selected={values.title}
                onChange={handleSelect}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  id="bs"
                  checked={values.bs}
                  onChange={handleChecked}
                  name="Balance Sheet"
                  color="primary"
                />
              }
              label="Balance Sheet"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <LoadingButton
          color="error"
          variant="contained"
          size="small"
          onClick={handleClose}
          loading={clicked}
          startIcon={<CancelIcon />}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          color="primary"
          variant="contained"
          size="small"
          onClick={handleSubmit}
          loading={clicked}
          startIcon={<SaveIcon />}
        >
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;