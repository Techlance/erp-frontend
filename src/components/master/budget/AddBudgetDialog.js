import React, { useState } from "react";

// material-ui
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  MenuItem,
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/Cancel";

// project imports
import { gridSpacing } from "../../../store/constant";
import LoadingButton from "../../../ui-component/LoadingButton";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import useBudget from "../../../hooks/useBudget";
import YearSelect from "./YearSelect";
import AuthoriserSelect from "./AuthoriserSelect";

const AddBudgetDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { addCompanyBudget } = useBudget();
  const { mid } = useParams();
  const [values, setValues] = useState({
    budget_name: null,
    budget_type: null,
    year_id: null,
    authoriser: null,
    enforce_restrictions: false,
    created_by: user.email,
    company_master_id: mid,
  });

  const [clicked, setClicked] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id || "budget_type"]: event.target.value,
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
    await addCompanyBudget(values, () => handleClose());
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
        <Typography variant="h4">Create Budget</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create a new budget.</Typography>
        </DialogContentText>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="budget_name"
              label="Budget Name"
              value={values.budget_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="budget_type"
                select
                fullWidth
                label="Type"
                value={values.budget_type}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="P&L">
                  <Typography>P&L</Typography>
                </MenuItem>
                <MenuItem value="Cashflow">
                  <Typography>Cashflow</Typography>
                </MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <YearSelect
              captionLabel="Budget Year"
              InputLabelProps={{ shrink: true }}
              selected={values.year_id}
              onChange={handleSelect}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AuthoriserSelect
              captionLabel="Authoriser"
              InputLabelProps={{ shrink: true }}
              selected={values.authoriser}
              onChange={handleSelect}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <AnimateButton>
          <Button
            color="error"
            variant="contained"
            size="small"
            onClick={handleClose}
            disabled={clicked}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </AnimateButton>
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

export default AddBudgetDialog;
