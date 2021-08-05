import React, { useState } from "react";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import CompanyTable from "./company-table";
import MainCard from "../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../store/constant";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import AddCompanyDialog from "../../../components/company/AddCompanyDialog";

//-----------------------|| Company List ||-----------------------//
const CompanyList = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  console.log("in CompanyList.js");

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
            <Typography variant="h3">Company List</Typography>
          </Grid>
          <Grid item>
            <AnimateButton>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setShowCreateModal(true)}
              >
                Create Company
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >
      <CompanyTable />
      <AddCompanyDialog
        open={showCreateModal}
        handleClose={() => {
          setShowCreateModal(false);
        }}
      />
    </MainCard>
  );
};

export default CompanyList;
