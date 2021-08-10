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
} from "@material-ui/core";

// project imports
import useAuth from "../../hooks/useAuth";
import useUserPermissions from "../../hooks/useUserPermissions";
import UserGroupsSelect from "./UserGroupsSelect";
import UserCompanySelect from "./UserComapnySelect";
import { gridSpacing } from "../../store/constant";

const AddUserCompanyGroup = ({ open, handleClose, user_id }) => {
  const { user } = useAuth();

  const { addUserCompanyGroup } = useUserPermissions();

  const [values, setValues] = useState({
    created_by: user.email,
    user: user_id,
    user_group_id: {
      id: 0,
      user_group_name: "",
    },
    company_master_id: {
      company_id: 0,
      company_name: "",
    },
  });

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleCloseModal = () => {
    setValues({
      created_by: user.email,
      user: user_id,
      user_group_id: null,
      company_master_id: null,
    });

    handleClose();
  };

  const handleAddCompany = () => {
    let data = { ...values };
    data.company_master_id = data.company_master_id.company_id;
    data.user_group_id = data.user_group_id.id;

    addUserCompanyGroup(data);
    handleCloseModal();
  };

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
        <Typography variant="h4">Add To Company</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="h5">Add User To New Company.</Typography>
        </DialogContentText>

        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <UserCompanySelect
              captionLabel="Select Company"
              selected={values.company_master_id}
              onChange={handleSelect}
            />
          </Grid>
          <Grid item xs={12}>
            <UserGroupsSelect
              captionLabel="Select User Group"
              selected={values.user_group_id}
              onChange={handleSelect}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleAddCompany}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserCompanyGroup;
