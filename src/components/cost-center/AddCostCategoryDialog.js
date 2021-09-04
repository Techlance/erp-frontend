import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
import { gridSpacing } from "../../store/constant";
import useAuth from "../../hooks/useAuth";
import useCostCenter from "../../hooks/useCostCenter";

// assets
import CancelIcon from "@material-ui/icons/CancelTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";
import LoadingButton from "../../ui-component/LoadingButton";
import AnimateButton from "../../ui-component/extended/AnimateButton";

const AddCostCategoryDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { addCostCategory } = useCostCenter();
  const { company } = useSelector((state) => state.companyMaster);

  const [clicked, setClicked] = useState(false);
  const [values, setValues] = useState({
    name: "",
    company_master_id: company?.company_id,
    created_by: user.email,
  });

  useEffect(() => {
    setValues({
      name: "",
      company_master_id: company?.company_id,
      created_by: user.email,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  const handleCreateCostCategory = async () => {
    setClicked(true);
    await addCostCategory(values, () => {
      setValues({
        name: "",
        company_master_id: company?.company_id,
        created_by: user.email,
      });
      handleClose();
    });

    setClicked(false);
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
          variant="contained"
          size="small"
          onClick={handleCreateCostCategory}
          color="primary"
          loading={clicked}
          startIcon={<SaveIcon />}
        >
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddCostCategoryDialog;
