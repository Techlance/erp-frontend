import React, { useState } from "react";

// material-ui
import { Grid, Typography, Button } from "@material-ui/core";

// assets
import MainCard from "../../../ui-component/cards/MainCard";

// project import
import { gridSpacing } from "../../../store/constant";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import AddUserGroup from "../../../components/user-management/AddUserGroup";
import UserGroupTable from "./user-group-table";

//-----------------------|| USER MANAGEMENT - USER GROUPS ||-----------------------//

const CompanyDetails = () => {
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
            <Typography variant="h3">User Groups</Typography>
          </Grid>
          <Grid item>
            <AnimateButton>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setShowCreateModal(true)}
              >
                Create User Groups
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >
      <UserGroupTable />
      <AddUserGroup
        open={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
      />
    </MainCard>
  );
};

export default CompanyDetails;
