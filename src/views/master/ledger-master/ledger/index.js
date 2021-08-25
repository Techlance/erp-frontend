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
import AddLedgerDialog from "../../../../components/master/ledger-master/AddLedgerDialog";
import { useLocation } from "react-router-dom";

//-----------------------|| User List ||-----------------------//
const Ledger = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const { company_ledgers } = useSelector((state) => state.ledgerMaster);

  const { company } = useCompanyMaster();

  const { getCompanyLedgers } = useLedgerMaster();

  const [loading, setLoading] = useState(true);

  const { pathname } = useLocation();

  console.log(company_ledgers);

  const columns = [
    {
      field: "id",
      headerName: "Edit",
      flex: 0.2,
      minWidth:100,
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
            // target="_blank"
          >
            <Typography align="center">More </Typography>
            <IconArrowRight sx={{ fontSize: "1.1rem" }} />
          </Button>
        ) : (
          <Button disabled>Not Editable</Button>
        ),
    },
    {
      field: "ledger_id",
      headerName: "Ledger ID",
      flex: 0.2,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ledger_name",
      headerName: "Ledger Name",
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: "acc_group_id",
      headerName: "Account Group",
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: "maintain_billwise",
      headerName: "Maintain Billwise",
      type:"boolean",
      flex: 0.3,
      minWidth: 200,
    },
    {
      field: "current_balance",
      headerName: "Current Balance",
      flex: 0.3,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "old_ledger_id",
      headerName: "Ledger ID",
      flex: 0.2,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.7,
      minWidth: 400,
    },
    {
      field: "tel",
      headerName: "Telephone",
      flex: 0.4,
      minWidth: 250,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.4,
      minWidth: 250,
    },
    {
      field: "contact_person",
      headerName: "Contact Person",
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: "tax_reg_no",
      headerName: "Tax registration Number",
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: "cr_no",
      headerName: "CR No.",
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: "cr_exp_date",
      headerName: "CR expiry Date",
      flex: 0.5,
      minWidth: 300,
      align: "",
      headerAlign: "",
      valueFormatter: (params) => {
        return params.value?formatDate(params.value):null;
      }
    },
    {
      field: "id_no",
      headerName: "ID No.",
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: "id_exp_date",
      headerName: "ID expiry Date",
      flex: 0.5,
      minWidth: 300,
      align: "",
      headerAlign: "",
      valueFormatter: (params) => {
        return params.value?formatDate(params.value):null;
      }
    },
    {
      field: "cc_no",
      headerName: "CC No.",
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: "cc_exp_date",
      headerName: "CC expiry Date",
      flex: 0.5,
      minWidth: 300,
      align: "",
      headerAlign: "",
      valueFormatter: (params) => {
        return params.value?formatDate(params.value):null;
      }
    },
    {
      field: "vat_no",
      headerName: "VAT No.",
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: "delivery_terms",
      headerName: "Delivery Terms",
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: "payment_terms",
      headerName: "Payment Terms",
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: "bank_name",
      headerName: "Bank Name",
      flex: 0.4,
      minWidth: 250,
    },
    {
      field: "branch_name",
      headerName: "Branch Name",
      flex: 0.4,
      minWidth: 250,
    },
    {
      field: "bank_code",
      headerName: "Bank Code",
      flex: 0.3,
      minWidth: 200,
    },
    {
      field: "bank_ac_no",
      headerName: "Bank A/C No.",
      flex: 0.4,
      minWidth: 250,
    },
    {
      field: "credit_limit",
      headerName: "Credit Limit",
      flex: 0.3,
      minWidth: 200,
    },
    {
      field: "credit_days",
      headerName: "Credit Days",
      flex: 0.3,
      minWidth: 200,
    },
    {
      field:"credit_rating",
      headerName:"Credit Rating",
      flex:0.3,
      minWidth:200
    },
    {
      field:"block_ac",
      headerName:"Block A/C",
      flex:0.3,
      minWidth:200
    },
    {
      field: "created_on",
      headerName: "Created On",
      type: "date",
      flex: 0.3,
      minWidth:200,
      valueFormatter: (params) => {
        return params.value?formatDate(params.value):null;
      },
    },
    {
      field: "created_by",
      minWidth:200,
      headerName: "created By",
      flex: 0.3,
    },
  ];

  useEffect(() => {
    getCompanyLedgers(company.company_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  useEffect(() => {
    if (company_ledgers) setLoading(false);
    else setLoading(true);
  }, [company_ledgers, company]);

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
              {`${company?.company_name}'s Ledgers`}
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
                Add Ledger
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >

      <CustomDataGrid
        columns={columns}
        rows={company_ledgers}
        loading={loading}
      />
      <AddLedgerDialog
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
      />
    </MainCard>
  );
};

export default Ledger;
