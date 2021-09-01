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
import AddCircleIcon from "@material-ui/icons/AddCircleTwoTone";
import CancelIcon from "@material-ui/icons/Cancel";

// project imports
import useAuth from "../../hooks/useAuth";
import useUserPermissions from "../../hooks/useUserPermissions";
import UserGroupsSelect from "./UserGroupsSelect";
import UserCompanySelect from "./UserCompanySelect";
import { gridSpacing } from "../../store/constant";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import LoadingButton from "../../ui-component/LoadingButton";

const AddUserCompanyGroup = ({ open, handleClose, user_id }) => {
  const { user } = useAuth();

  const { addUserCompanyGroup } = useUserPermissions();

  const [clicked, setClicked] = useState(false);
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

  const handleAddCompany = async () => {
    setClicked(true);
    await addUserCompanyGroup(values);
    setClicked(false);
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
        <AnimateButton>
          <Button
            onClick={handleClose}
            size="small"
            color="error"
            variant="contained"
            startIcon={<CancelIcon />}
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

export default AddUserCompanyGroup;
