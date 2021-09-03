import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import MainCard from "../../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../../store/constant";
import { formatDate } from "../../../../utils";
import AddAccountHeadDialog from "../../../../components/master/ledger-master/AddAccountHeadDialog";

// assets
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import useLedgerMaster from "../../../../hooks/useLedgerMaster";
import { IconArrowRight } from "@tabler/icons";
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";

//-----------------------|| Account Head List ||-----------------------//
const SelectGroup = () => {
  const { pathname } = useLocation();

  const [{ company }, { company_account_heads }] = useSelector((state) => [
    state.companyMaster,
    state.ledgerMaster,
  ]);

  const { getCompanyAccountHeads } = useLedgerMaster();

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
      sortable: false,
      renderCell: (params) =>
        !params.row["is_fixed"] ? (
          <Button
            variant="text"
            color="primary"
            aria-label="more-details"
            href={`${pathname}/${params.value}`}
          >
            <Typography align="center">More </Typography>
            <IconArrowRight sx={{ fontSize: "1.1rem" }} />
          </Button>
        ) : (
          <Button disabled>Not Editable</Button>
        ),
    },
    {
      field: "schedule_no",
      headerName: "Schedule No.",
      flex: 0.3,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "acc_head_name",
      headerName: "Account Head Name",
      flex: 0.5,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.4,
    },
    {
      field: "bs",
      headerName: "BS",
      type: "boolean",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
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
    getCompanyAccountHeads(company.company_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  useEffect(() => {
    if (company_account_heads) setLoading(false);
    else setLoading(true);
  }, [company_account_heads, company]);

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
            <Typography variant="h3">Account Heads</Typography>
          </Grid>
          <Grid item>
            <AnimateButton>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setShowAddModal(true)}
              >
                Add Account Head
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >
      <CustomDataGrid
        columns={columns}
        rows={company_account_heads}
        loading={loading}
      />
      <AddAccountHeadDialog
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
      />
    </MainCard>
  );
};

export default SelectGroup;
