import React, { useState } from "react";

import { Grid, Stack } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../store/constant";

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
import useAuth from "../../hooks/useAuth";
import useCostCenter from "../../hooks/useCostCenter";
import useComapanyMaster from "../../hooks/useCompanyMaster";
import { useSelector } from "react-redux";

const AddCostCategoryDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { addCostCategory } = useCostCenter();
  // const { company } = useComapanyMaster();
  const { company } = useSelector((state) => state.companyMaster);

  const [clicked, setClicked] = useState(false);

  const [values, setValues] = useState({
    company_master_id: company.company_id,
    name: "",
    created_by: user.email,
  });

  const createCostCategory = async () => {
    setClicked(true);
    let form = { ...values };
    await addCostCategory(form);
    setClicked(false);
    setValues({
      company_master_id: company.company_id,
      name: "",
      created_by: user.email,
    });
    handleClose();
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-cost-category"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Add Cost Category</Typography>
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          <Typography variant="body2">Create a new cost category.</Typography>
        </DialogContentText> */}
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="name"
              label="Cost Category Name"
              value={values.name}
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
                  size="medium"
                  variant="contained"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => {
                    createCostCategory();
                    handleClose();
                  }}
                  color="primary"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AddCostCategoryDialog;
