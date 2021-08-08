import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// material-ui
import { Button, CardActions, Divider, Grid } from "@material-ui/core";

// project imports
import useAuth from "../../../hooks/useAuth";
import useUserPermissions from "../../../hooks/useUserPermissions";
import { gridSpacing } from "../../../store/constant";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import UserGroupsSelect from "../../../components/user-management/UserGroupsSelect";

// assets
import MainCard from "../../../ui-component/cards/MainCard";
import TransactionsTable from "./TransactionsTable";

// tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

//-----------------------|| USER MANAGEMENT - USER RIGHTS ||-----------------------//

const CompanyDetails = () => {
  const { user } = useAuth();

  const { current_user_right, updateUserRights, deleteUserRights } =
    useUserPermissions();

  const [value, setValue] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSelect = (key, value) => {
    setValue(value.id);

    setValues({
      ...values,
      [key]: value,
    });
  };

  // constants
  const INIT_STATE = {
    user_group_id: null,
    transaction_id: null,
    can_create: true,
    can_alter: true,
    can_delete: true,
    can_view: true,
    created_by: user.email,
  };

  const [values, setValues] = useState(() => {
    if (value === 0) {
      return INIT_STATE;
    }

    return {
      user_group_id: current_user_right.user_group_id,
      transaction_id: current_user_right.transaction_id,
      can_create: current_user_right.can_create,
      can_alter: current_user_right.can_alter,
      can_delete: current_user_right.can_delete,
      can_view: current_user_right.can_view,
      created_by: current_user_right.created_by,
    };
  });

  useEffect(() => {
    setValues(() => {
      if (value === 0) return INIT_STATE;

      return {
        user_group_id: current_user_right.user_group_id,
        transaction_id: current_user_right.transaction_id,
        can_create: current_user_right.can_create,
        can_alter: current_user_right.can_alter,
        can_delete: current_user_right.can_delete,
        can_view: current_user_right.can_view,
        created_by: current_user_right.created_by,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current_user_right, value]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard title="User Rights Settings" content={true}>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <UserGroupsSelect
                captionLabel="User Group Name"
                selected={values.user_group_id}
                onChange={handleSelect}
              />

              <Grid item xs={12}>
                <TransactionsTable value={value} />
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <CardActions>
            <Grid container justifyContent="space-between" spacing={0}>
              <Grid item>
                {value >= -1 && (
                  <AnimateButton>
                    <Button variant="outlined" size="large" color="primary">
                      Back
                    </Button>
                  </AnimateButton>
                )}
              </Grid>

              <Grid item>
                <Grid container justifyContent="space-between" spacing={10}>
                  <Grid item>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={(e) => {
                          updateUserRights(value, values);
                        }}
                      >
                        {value === 0 ? "Create" : "Update"}
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardActions>
          <ConfirmDeleteDialog
            open={showDeleteModal}
            handleAgree={() => deleteUserRights(value)}
            handleClose={() => setShowDeleteModal(false)}
            title="Are you sure?"
            body="Are you sure you want to delete this User Rights record? Once deleted the data can not be retrived!"
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default CompanyDetails;
