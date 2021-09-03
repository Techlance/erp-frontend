import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import MainCard from "../../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../../store/constant";

// assets
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import { IconArrowRight } from "@tabler/icons";
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";

// import useCostCenter from "../../../../hooks/useCostCenter";
import { useLocation } from "react-router";
import { formatDate } from "../../../../utils";
import useLC from "../../../../hooks/useLC";
import AddLCDialogFinal from "../../../../components/company/AddLCDialogFinal";

//-----------------------|| LC List ||-----------------------//

const SelectGroup = () => {
  const { pathname } = useLocation();
  const [{ company }, { lc_import, lc_export }] = useSelector((state) => [
    state.companyMaster,
    state.lc,
  ]);

  const { getImportLC, getExportLC } = useLC();

  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  let flag = true;
  if (pathname.includes("/export")) {
    flag = false;
  }

  const columns = [
    {
      field: "id",
      headerName: "Edit",
      flex: 0.2,
      // type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 100,

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
    // {
    //   field: "trans_type",
    //   headerName: "Transaction Type",
    //   flex: 0.5,
    //   minWidth: 150,
    // },
    {
      field: "lc_date",
      headerName: "LC Date",
      flex: 0.4,
      minWidth: 150,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    // {
    //   field: "year_id",
    //   headerName: "Year ID",
    //   flex: 0.5,
    //   minWidth: 150,
    // },
    flag
      ? {
          field: "party_code",
          headerName: "Party Code(Payables)",
          flex: 0.5,
          minWidth: 150,
          valueFormatter: (params) => {
            return params.value.ledger_name;
          },
        }
      : {
          field: "party_code",
          headerName: "Party Code(Receivables)",
          flex: 0.5,
          minWidth: 150,
          valueFormatter: (params) => {
            return params.value.ledger_name;
          },
        },

    {
      field: "cost_center",
      headerName: "Cost Center",
      flex: 0.5,
      minWidth: 150,
      valueFormatter: (params) => {
        return params.value.cost_center_name;
      },
    },
    {
      field: "applicant_bank",
      headerName: "Applicant Bank",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "applicant_bank_lc_no",
      headerName: "Applicant Bank LC No.",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "benificiary_bank",
      headerName: "Beneficiary Bank",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "benificiary_bank_lc_no",
      headerName: "Beneficiary Bank LC No.",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "inspection",
      headerName: "Inspection",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "bank_ref",
      headerName: "Bank Ref.",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "days_for_submit_to_bank",
      headerName: "Days Remaining To Return To Bank",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "payment_terms",
      headerName: "Payment Terms",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "place_of_taking_incharge",
      headerName: "Place Of Taking Incharge",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "final_destination_of_delivery",
      headerName: "Delivery Destination",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "completed",
      headerName: "Completed",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "shipment_terms",
      headerName: "Shipment Terms",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "goods_description",
      headerName: "Goods Description",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "other_lc_terms",
      headerName: "Other LC Terms",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "bank_ac",
      headerName: "Bank A/C",
      flex: 0.5,
      minWidth: 150,
      valueFormatter: (params) => {
        return params.value.ledger_name;
      },
    },
    {
      field: "expiry_date",
      headerName: "Expiry Date",
      flex: 0.5,
      minWidth: 150,

      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    // {
    //   field: "base_currency",
    //   headerName: "Currency",
    //   flex: 0.5,
    //   minWidth: 150,
    // },
    {
      field: "lc_amount",
      headerName: "LC Amount",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "created_by",
      headerName: "Created By",
      flex: 0.4,
      minWidth: 150,
    },
    {
      field: "created_on",
      headerName: "Created On",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
      minWidth: 150,

      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    flag ? getImportLC(company?.company_id) : getExportLC(company?.company_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  useEffect(() => {
    console.log(lc_import);
    console.log("lc_import");

    if (lc_import) setLoading(false);
    else setLoading(true);
  }, [lc_import]);

  useEffect(() => {
    // console.log(company_account_heads);
    if (lc_export) setLoading(false);
    else setLoading(true);
  }, [lc_export]);

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
              {`${company.company_name}'s LC (Letter of Credit)`}
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
                Create LC
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >
      {flag ? (
        <CustomDataGrid columns={columns} rows={lc_import} loading={loading} />
      ) : (
        <CustomDataGrid columns={columns} rows={lc_export} loading={loading} />
      )}

      <AddLCDialogFinal
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
      />
    </MainCard>
  );
};

export default SelectGroup;
