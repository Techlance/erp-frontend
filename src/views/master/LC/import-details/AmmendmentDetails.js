import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import MainCard from "../../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../../store/constant";

// assets
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
// import useLedgerMaster from "../../../../hooks/useLedgerMaster";
import { IconArrowRight } from "@tabler/icons";
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";
import AddCostCenterDialog from "../../../../components/CostCenter/AddCostCenterDialog";
import useComapanyMaster from "../../../../hooks/useCompanyMaster";
import useCostCenter from "../../../../hooks/useCostCenter";
import { useLocation } from "react-router";
import { number } from "prop-types";

//-----------------------|| User List ||-----------------------//
const SelectGroup = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  //   const [costCenter] = useSelector((state) => [state.costCenter]);

  //   const { company } = useComapanyMaster();

  //   const { cost_center } = costCenter;

  //   const { getCostCenter } = useCostCenter();

  //   const [loading, setLoading] = useState(true);

  const { pathname } = useLocation();

  const columns = [
    {
      field: "id",
      headerName: "Edit",
      flex: 0.2,
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
      field: "issue_date",
      headerName: "Issue Date",
      flex: 0.4,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "LDS",
      headerName: "LDS",
      flex: 0.5,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "expiry_date",
      headerName: "Expiry Date",
      flex: 0.4,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "lc_amount",
      headerName: "LC Amount",
      type: number,
      flex: 0.4,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      flex: 0.4,
    },
    {
      field: "created_by",
      headerName: "Created By",
      flex: 0.4,
    },
    {
      field: "created_on",
      headerName: "Created On",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    getCostCenter(company?.company_id);
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
            <Typography variant="h3">
              {`${company.company_name}'s Cost Center`}
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
