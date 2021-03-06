import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import useCostCenter from "../../../../hooks/useCostCenter";
import MainCard from "../../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../../store/constant";
import AddCostCenterDialog from "../../../../components/cost-center/AddCostCenterDialog";

// assets
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import { IconArrowRight } from "@tabler/icons";
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";

//-----------------------|| User List ||-----------------------//
const SelectGroup = () => {
  const { pathname } = useLocation();
  const { getCostCenter } = useCostCenter();

  const [{ company }, { cost_center }] = useSelector((state) => [
    state.companyMaster,
    state.costCenter,
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      field: "id",
      headerName: "Edit",
      flex: 0.2,
      type: "number",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          aria-label="more-details"
          // onClick={(row) => handleCompanyClick(row.company_id)}
          href={`${pathname}/${params.value}`}
        >
          <Typography align="center">More </Typography>
          <IconArrowRight sx={{ fontSize: "1.1rem" }} />
        </Button>
      ),
    },
    {
      field: "cost_center_name",
      headerName: "Cost Center Name",
      flex: 0.4,
    },
    {
      field: "cost_category_id",
      headerName: "Cost Category",
      flex: 0.5,
    },
    {
      field: "child_of",
      headerName: "Child Of",
      flex: 0.4,
      valueFormatter: (params) => {
        return params.value || "Primary";
      },
    },
    {
      field: "created_by",
      headerName: "Created By",
      flex: 0.4,
    },
  ];

  useEffect(() => {
    setLoading(true);
    getCostCenter(company?.company_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  useEffect(() => {
    if (cost_center) setLoading(false);
    else setLoading(true);
  }, [cost_center]);

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
            <Typography variant="h3">Cost Center</Typography>
          </Grid>
          <Grid item>
            <AnimateButton>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setShowAddModal(true)}
              >
                Add Cost Center
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >
      <CustomDataGrid columns={columns} rows={cost_center} loading={loading} />
      <AddCostCenterDialog
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
        // user_id={current_user_account.id}
      />
    </MainCard>
  );
};

export default SelectGroup;
