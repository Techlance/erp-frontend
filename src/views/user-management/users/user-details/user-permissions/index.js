import React, { useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import UserTable from "./UserTable";
import MainCard from "../../../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../../../store/constant";
import AddUserCompanyGroup from "../../../../../components/user-management/AddUserCompanyGroup";

// assets
import AnimateButton from "../../../../../ui-component/extended/AnimateButton";

//-----------------------|| User List ||-----------------------//
const UserPermissions = () => {
  const { current_user_account } = useSelector(
    (state) => state.userPermissions
  );

  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <MainCard
      title={
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={gridSpacing}
        >
          <Grid item>
            <Typography variant="h3">
              {`${current_user_account.name}'s User Groups`}
            </Typography>
          </Grid>
          <Grid item>
            <AnimateButton>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setShowAddModal(true)}
              >
                Add Company Group
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >
      <UserTable />
      <AddUserCompanyGroup
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
        user_id={current_user_account.id}
      />
    </MainCard>
  );
};

export default UserPermissions;
