import React, { useState } from "react";
import PropTypes from "prop-types";

// material-ui
import { Button, CardActions, Divider, Grid } from "@material-ui/core";

// project imports
import useUserPermissions from "../../../hooks/useUserPermissions";
import { gridSpacing } from "../../../store/constant";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import UserGroupsSelect from "../../../components/user-management/UserGroupsSelect";

// assets
import MainCard from "../../../ui-component/cards/MainCard";
import TransactionsTable from "./TransactionsTable";
import AnimateButton from "../../../ui-component/extended/AnimateButton";

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
  const { current_user_right, deleteUserRights } = useUserPermissions();

  const [value, setValue] = useState(() => {
    if (current_user_right && current_user_right.user_group_id) {
      return {
        ...current_user_right.user_group_id,
      };
    }
    return {
      id: 0,
      user_group_name: "",
    };
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSelect = (key, value) => {
    setValue(value);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard title="User Rights Settings" content={true}>
          <pre>{JSON.stringify(value, null, 2)}</pre>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <UserGroupsSelect
                captionLabel="User Group Name"
                selected={value}
                onChange={handleSelect}
              />

              <Grid item xs={12} spacing={gridSpacing}>
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
