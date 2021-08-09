import React, { useState } from "react";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import UserTable from "./user-table";
import MainCard from "../../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../../store/constant";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import AddUserDialog from "../../../../components/user-management/AddUserDialog";

//-----------------------|| User List ||-----------------------//
const UserList = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

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
            <Typography variant="h3">User List</Typography>
          </Grid>
          <Grid item>
            <AnimateButton>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setShowCreateModal(true)}
              >
                Create User
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >
      <UserTable />
      <AddUserDialog
        open={showCreateModal}
        handleClose={() => {
          setShowCreateModal(false);
        }}
      />
    </MainCard>
  );
};

export default UserList;
