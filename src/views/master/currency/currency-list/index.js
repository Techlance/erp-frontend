import React, { useState } from "react";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import CurrencyTable from "./currency-table";
import MainCard from "../../../../ui-component/cards/MainCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import { gridSpacing } from "../../../../store/constant";
import AddCurrenyDialog from "../../../../components/company/AddCurrencyDialog";

//-----------------------|| Company List ||-----------------------//
const CurrencyList = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  // USE SIMPLE DATA TABLE

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
            <Typography variant="h3">Currency List</Typography>
          </Grid>
          <Grid item>
            <AnimateButton>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setShowCreateModal(true)}
              >
                Create Currency
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >
      <CurrencyTable />
      <AddCurrenyDialog
        open={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
      />
    </MainCard>
  );
};

export default CurrencyList;
