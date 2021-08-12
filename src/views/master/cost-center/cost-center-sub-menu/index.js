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
//-----------------------|| User List ||-----------------------//
const SelectGroup = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const [company, ledgerMaster] = useSelector((state) => [
    state.company,
    state.ledgerMaster,
  ]);

  const { master_company } = company;

  //   const { company_account_heads } = ledgerMaster;

  //   const { getCompanyAccountHeads } = useLedgerMaster();

  const [loading, setLoading] = useState(true);

  const columns = [
    {
      field: "id",
      headerName: "Edit",
      flex: 0.2,
      type: "number",
      headerAlign: "left",
      align: "left",
      renderCell: (params) =>
        params.row["is_fixed"] ? (
          <Button
            variant="text"
            color="primary"
            aria-label="more-details"
            // onClick={(row) => handleCompanyClick(row.company_id)}
            href={`/admin/user-manager/users/${params.value}`}
            target="_blank"
          >
            <Typography align="center">More </Typography>
            <IconArrowRight sx={{ fontSize: "1.1rem" }} />
          </Button>
        ) : (
          <Button disabled>Not Editable</Button>
        ),
    },
    {
      field: "cost_center_name",
      headerName: "Cost Center Name",
      flex: 0.4,
    },
    {
      field: "acc_head_namecost_category_name",
      headerName: "Cost Category",
      flex: 0.5,
    },
    {
      field: "child_of",
      headerName: "Child Of",
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
    },
  ];

  //   useEffect(() => {
  //     setLoading(true);
  //     getCompanyAccountHeads(master_company?.company_id);
  //   }, [master_company]);

  //   useEffect(() => {
  //     console.log(company_account_heads);
  //     if (company_account_heads) setLoading(false);
  //     else setLoading(true);
  //   }, [company_account_heads]);

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
              {`${master_company.company_name}'s Cost Center`}
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
      <CustomDataGrid
        columns={columns}
        // rows={company_account_heads}
        loading={loading}
      />
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
