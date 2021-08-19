import React, { useState } from "react";

import { IconButton, Grid, Stack } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../store/constant";
import CategorySelect from "../../components/CostCenter/CategorySelect";
import LoadingButton from "../../ui-component/LoadingButton";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
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

// project imports
import useAuth from "../../hooks/useAuth";
import useCompany from "../../hooks/useCompany";
import ParentGroupSelect from "./ParentGroupSelect";
import { useParams } from "react-router";
import useCostCenter from "../../hooks/useCostCenter";

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
  addButtonGrid: {
    paddingTop: "1 !important",
    paddingLeft: "0 !important",
  },
}));

const AddCostCenterDialog = ({ open, handleClose }) => {
  //   const classes = useStyles();
  const { user } = useAuth();
  //   const { createCompany } = useCompany();

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

  const createCostCenter = async () => {
    setClicked(true);
    let form = { ...values };
    form.child_of = parseInt(form.child_of?.id);
    form.cost_category_id = parseInt(form.cost_category_id.id);
    console.log(form);
    await addCostCenter(form);
    setClicked(false);
    setValues({
      cost_center_name: "",
      cost_category_id: null,
      child_of: null,
      company_master_id: mid,
      created_by: user.email,
    });
    handleClose();
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
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          <Grid item xs={12} sm={6}>
            <CategorySelect
              captionLabel="Cost Category"
              InputLabelProps={{ shrink: true }}
              selected={values.cost_category_id}
              onChange={handleSelect}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ParentGroupSelect
              fullWidth
              id="child_of"
              captionLabel="Child Of"
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
              value={values.cost_center_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Grid item xs={11.7}>
          <Stack direction="row">
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button
                  onClick={handleClose}
                  color="error"
                  size="small"
                  variant="contained"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={createCostCenter}
                  loading={clicked}
                  startIcon={<SaveIcon />}
                >
                  Add
                </LoadingButton>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AddCostCenterDialog;
