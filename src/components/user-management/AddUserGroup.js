import React, { useState } from "react";

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircleTwoTone";
import CancelIcon from "@material-ui/icons/Cancel";

// project imports
import useAuth from "../../hooks/useAuth";
import useUserPermissions from "../../hooks/useUserPermissions";
import { gridSpacing } from "../../store/constant";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import LoadingButton from "../../ui-component/LoadingButton";

const AddUserGroup = ({ open, handleClose, user_id }) => {
  const { user } = useAuth();

  const { createUserGroup } = useUserPermissions();

  const [clicked, setClicked] = useState(false);
  const [values, setValues] = useState({
    created_by: user.email,
    user: user_id,
    user_group_name: "",
    backdated_days: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleCloseModal = () => {
    setValues({
      created_by: user.email,
      user: user_id,
      user_group_name: "",
      backdated_days: "",
    });

    handleClose();
  };

  const handleAddCompany = async () => {
    setClicked(true);
    await createUserGroup(values);
    setClicked(false);
    handleCloseModal();
  };

  const dayRegex = new RegExp("^[0-9]{0,2}$");

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-currency"
      fullWidth
      maxWidth="sm"
      keepMounted
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Add New User Group</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="h5">Add User Group.</Typography>
        </DialogContentText>

        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="user_group_name"
              required
              label="Group Name"
              value={values.user_group_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              required
              id="backdated_days"
              label="Backdated Days"
              type="number"
              value={values.backdated_days}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                color: dayRegex.test(values.backdated_days)
                  ? "primary"
                  : "error",
              }}
              helperText={
                dayRegex.test(values.backdated_days)
                  ? ""
                  : "Days cannot be negative and can only be 2 digit integer."
              }
              error={dayRegex.test(values.backdated_days) ? false : true}
              onChange={handleChange}
            />
            {dayRegex.test(values.backdated_days) ? true : false}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <AnimateButton>
          <Button
            onClick={handleClose}
            size="small"
            color="error"
            variant="contained"
            startIcon={<CancelIcon />}
            disabled={clicked}
          >
            Cancel
          </Button>
        </AnimateButton>
        <LoadingButton
          variant="contained"
          size="small"
          onClick={handleAddCompany}
          color="primary"
          loading={clicked}
          startIcon={<AddCircleIcon />}
        >
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserGroup;
