import React, { useState,useEffect } from "react";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

import {useParams} from 'react-router-dom'

// project imports
import UserTable from "./UserTable";
import MainCard from "../../../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../../../store/constant";
import AddUserCompanyGroup from "../../../../../components/user-management/AddUserCompanyGroup";
import useUserPermissions from "../../../../../hooks/useUserPermissions";
import AnimateButton from "../../../../../ui-component/extended/AnimateButton";
//-----------------------|| User List ||-----------------------//
const SelectGroup = () => {
  const { current_user_account } = useUserPermissions();

  const [showAddModal, setShowAddModal] = useState(false);

  console.log("in SelectGroup.js");

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
              {current_user_account.name}
              {"'s User Groups"}
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
      handleClose={()=>{setShowAddModal(false)}}
      />
    </MainCard>
  );
};

export default SelectGroup;