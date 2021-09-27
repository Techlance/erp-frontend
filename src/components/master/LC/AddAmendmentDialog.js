import React, { useState } from "react";

// project imports
import { gridSpacing } from "../../../store/constant";

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

// project imports
import useAuth from "../../../hooks/useAuth";
import useLC from "../../../hooks/useLC";
import { useParams } from "react-router";

const AddAmendmentDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { mid, lc_id } = useParams();

  const { addLCAmend } = useLC();

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

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleCreateAmendment = async () => {
    setClicked(true);
    await addLCAmend(values);
    setClicked(false);
    setValues({
      lc_id: lc_id,
      amendment_no: 1,
      issue_date: "",
      LDS: "",
      expiry_date: "",
      lc_amount: "",
      remarks: "",
      company_master_id: mid,
      created_by: user.email,
    });
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
      {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create Amendment</Typography>
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          <Typography variant="body2">Create a new company.</Typography>
        </DialogContentText> */}
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
              value={values.lc_amount && Math.abs(values.lc_amount)}
              inputProps={{ min: 0 }}
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
          onClick={handleCreateAmendment}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAmendmentDialog;
