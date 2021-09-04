import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";

// assets

// project imports
import { gridSpacing } from "../../../../store/constant";

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";

// project imports
import useAuth from "../../../../hooks/useAuth";
import useLC from "../../../../hooks/useLC";
import { useParams } from "react-router";

const EditAmendDialog = ({ open, handleClose, data }) => {
  const { user } = useAuth();
  const { mid, lc_id } = useParams();

  const { updateLCAmend } = useLC();

  const [clicked, setClicked] = useState(false);

  const [values, setValues] = useState({
    lc_id: lc_id,
    // amendment_no: 2,
    issue_date: "",
    LDS: "",
    expiry_date: "",
    lc_amount: "",
    remarks: "",
    company_master_id: mid,
    created_by: user.email,
  });

  useEffect(() => {
    setValues({
      // amend_id: data.id,
      lc_id: data.lc_id,
      amendment_no: data.amendment_no,
      issue_date: data.issue_date,
      LDS: data.LDS,
      expiry_date: data.expiry_date,
      lc_amount: data.lc_amount,
      remarks: data.remarks,
      company_master_id: mid,
      created_by: user.email,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleUpdateAmendment = async () => {
    setClicked(true);
    await updateLCAmend(values, data.id);
    setClicked(false);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-amendment"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Update Amendment</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="issue_date"
              label="Issue Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={values.issue_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="LDS"
              label="LDS"
              InputLabelProps={{ shrink: true }}
              type="date"
              InputProps={{ inputProps: { min: values.issue_date } }}
              value={values.LDS}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="expiry_date"
              label="Expiry Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              InputProps={{ inputProps: { min: values.issue_date } }}
              value={values.expiry_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lc_amount"
              label="LC Amount"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={values.lc_amount}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              multiline
              id="remarks"
              label="Remarks"
              value={values.remarks}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Button
          onClick={handleClose}
          color="error"
          size="small"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          size="small"
          variant="contained"
          disabled={clicked}
          onClick={handleUpdateAmendment}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAmendDialog;
