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
import formatDate from '../../../../utils/format-date'
import AddAccountHeadDialog from '../../../../components/master/ledger-master/AddAccountHeadDialog'

//-----------------------|| User List ||-----------------------//
const SelectGroup = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const ledgerMaster = useSelector((state) => state.ledgerMaster);

  const { company } = useCompanyMaster();

  const { company_account_heads } = ledgerMaster;

  const { getCompanyAccountHeads } = useLedgerMaster();

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
      field:"created_on",
      headerName:"Created On",
      type:"date",
      flex: 0.3,
      valueFormatter: (params) => {
        return formatDate(params.value);
      }
    },
    {
      field:"created_by",
      headerName:"created By",
      flex: 0.3
    }
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
            <Typography variant="h3">
              {`${company?.company_name}'s Account Heads`}
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
                Add Account Head
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
