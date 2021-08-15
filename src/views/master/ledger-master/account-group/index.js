import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import MainCard from "../../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../../store/constant";

// assets
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import useLedgerMaster from "../../../../hooks/useLedgerMaster";
import { IconArrowRight } from "@tabler/icons";
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";
import useCompanyMaster from "../../../../hooks/useCompanyMaster";
import formatDate from "../../../../utils/format-date";
import AddAccountGroupDialog from "../../../../components/master/ledger-master/AddAccountGroupDialog";
import { useLocation } from "react-router-dom";

//-----------------------|| User List ||-----------------------//
const AccountGroup = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const { company_account_groups } = useSelector((state) => state.ledgerMaster);

  const { company } = useCompanyMaster();

  const { getCompanyAccountGroups } = useLedgerMaster();

  const [loading, setLoading] = useState(true);

  const { pathname } = useLocation();

  console.log(company_account_groups);

  const columns = [
    {
      field: "id",
      headerName: "Edit",
      flex: 0.2,
      type: "number",
      headerAlign: "left",
      align: "left",
      sortable: false,
      renderCell: (params) =>
        (
          <Button
            variant="text"
            color="primary"
            aria-label="more-details"
            href={`${pathname}/${params.value}`}
            // target="_blank"
          >
            <Typography align="center">Edit </Typography>
            <IconArrowRight sx={{ fontSize: "1.1rem" }} />
          </Button>
        )
    },
    {
      field: "group_code",
      headerName: "Group Code",
      flex: 0.2,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "group_name",
      headerName: "Group Name",
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: "child_of",
      headerName: "Parent Group",
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: "acc_head_id",
      headerName: "Account Head",
      flex: 0.5,
      minWidth: 300,
      valueFormatter: (params) => {
        return params.value.acc_head_name;
      },
    },
    {
      field: "created_on",
      headerName: "Created On",
      type: "date",
      flex: 0.3,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "created_by",
      headerName: "created By",
      flex: 0.3,
    },
  ];

  useEffect(() => {
    getCompanyAccountGroups(company.company_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  useEffect(() => {
    if (company_account_groups) setLoading(false);
    else setLoading(true);
  }, [company_account_groups, company]);

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
              {`${company?.company_name}'s Account Groups`}
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
                Add Account Group
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >
      {/* <pre>{JSON.stringify(company, null, 2)}</pre> */}
      <CustomDataGrid
        columns={columns}
        rows={company_account_groups}
        loading={loading}
      />
      <AddAccountGroupDialog
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
      />
    </MainCard>
  );
};

export default AccountGroup;
