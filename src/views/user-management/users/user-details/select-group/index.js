import React, { useState } from "react";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import UserTable from "./user-table";
import MainCard from "../../../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../../../store/constant";
import AddUserDialog from "../../../../../components/user-management/AddUserDialog";
import useUserPermissions from '../../../../../hooks/useUserPermissions'
//-----------------------|| User List ||-----------------------//
const SelectGroup = () => {
  const { current_user_account } = useUserPermissions();
 
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
            <Typography variant="h3">{ current_user_account.name }{"'s User Groups"}</Typography>
          </Grid>
        </Grid>
      }
      content={true}
    >
      <UserTable />
    </MainCard>
  );
};

export default SelectGroup;
