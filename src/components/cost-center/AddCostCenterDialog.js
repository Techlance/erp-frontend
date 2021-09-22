import React, { useState } from "react";
import { useParams } from "react-router";

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

// project imports
import useAuth from "../../hooks/useAuth";
import useCostCenter from "../../hooks/useCostCenter";
import { gridSpacing } from "../../store/constant";
import ParentGroupSelect from "./ParentGroupSelect";
import CategorySelect from "../../components/cost-center/CategorySelect";

// assets
import LoadingButton from "../../ui-component/LoadingButton";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/CancelTwoTone";

const AddCostCenterDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { mid } = useParams();

  const { addCostCenter } = useCostCenter();

  const [values, setValues] = useState({
    cost_center_name: "",
    cost_category_id: null,
    child_of: null,
    company_master_id: mid,
    created_by: user.email,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelect = (key, value) => {
    if (key === "cost_category_id") {
      setValues({
        ...values,
        child_of: null,
        [key]: value,
      });
    } else {
      setValues({
        ...values,
        [key]: value,
      });
    }
  };

  const [clicked, setClicked] = useState(false);

  const handleCreateCostCenter = async () => {
    setClicked(true);

    await addCostCenter(values, () => {
      setValues({
        cost_center_name: "",
        cost_category_id: null,
        child_of: null,
        company_master_id: mid,
        created_by: user.email,
      });
      handleClose();
    });
    setClicked(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-cost-center"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Add Cost Center</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create a new cost center.</Typography>
        </DialogContentText>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={6}>
            <CategorySelect
              captionLabel="Cost Category*"
              InputLabelProps={{ shrink: true }}
              selected={values.cost_category_id}
              onChange={handleSelect}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ParentGroupSelect
              fullWidth
              id="child_of"
              captionLabel="Child Of*"
              selected={values.child_of}
              InputLabelProps={{ shrink: true }}
              onChange={handleSelect}
              disabled={values.cost_category_id === null}
              cat_id={values.cost_category_id?.id}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="cost_center_name"
              label="Cost Center Name"
              required
              value={values.cost_center_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <AnimateButton>
          <Button
            onClick={handleClose}
            color="error"
            size="small"
            variant="contained"
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
          onClick={handleCreateCostCenter}
          loading={clicked}
          startIcon={<SaveIcon />}
        >
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddCostCenterDialog;
