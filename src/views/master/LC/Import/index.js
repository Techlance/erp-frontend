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
import useComapanyMaster from "../../../../hooks/useCompanyMaster";
import { useLocation } from "react-router";
import formatDate from "../../../../utils/format-date";
import useLC from "../../../../hooks/useLC";
import AddLCDialog from "../../../../components/company/AddLCDialog";

//-----------------------|| LC List ||-----------------------//

const SelectGroup = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  //   const [costCenter] = useSelector((state) => [state.costCenter]);
  const [lc] = useSelector((state) => [state.lc]);

  const { company } = useComapanyMaster();

  //   const { cost_category } = costCenter;
  const { l_c } = lc;

  //   const { getCostCategory } = useCostCenter();
  const { getLC } = useLC();

  const [loading, setLoading] = useState(true);

  const { pathname } = useLocation();

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
      field: "trans_type",
      headerName: "Transaction Type",
      flex: 0.5,
    },
    {
      field: "lc_date",
      headerName: "LC Date",
      flex: 0.4,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "trans_type",
      headerName: "Transaction Type",
      flex: 0.5,
    },
    {
      field: "party_code",
      headerName: "Party Code",
      flex: 0.5,
    },
    {
      field: "cost_center",
      headerName: "Cost Center",
      flex: 0.5,
    },
    {
      field: "applicant_bank",
      headerName: "Applicant Bank",
      flex: 0.5,
    },
    {
      field: "applicant_bank_lc_no",
      headerName: "Applicant Bank LC No.",
      flex: 0.5,
    },
    {
      field: "benificiary_bank",
      headerName: "Beneficiary Bank",
      flex: 0.5,
    },
    {
      field: "benificiary_bank_lc_no",
      headerName: "Beneficiary Bank LC No.",
      flex: 0.5,
    },
    {
      field: "inspection",
      headerName: "Inspection",
      flex: 0.5,
    },
    {
      field: "bank_ref",
      headerName: "Bank Ref.",
      flex: 0.5,
    },
    {
      field: "days_for_submit_to_bank",
      headerName: "Days Remaining To Return To Bank",
      flex: 0.5,
    },
    {
      field: "payment_terms",
      headerName: "Payment Terms",
      flex: 0.5,
    },
    {
      field: "place_of_taking_incharge",
      headerName: "Place Of Taking Incharge",
      flex: 0.5,
    },
    {
      field: "fina_destination_of_delivery",
      headerName: "Delivery Destination",
      flex: 0.5,
    },
    {
      field: "completed",
      headerName: "Completed",
      flex: 0.5,
    },
    {
      field: "shipment_terms",
      headerName: "Shipment Terms",
      flex: 0.5,
    },
    {
      field: "goods_description",
      headerName: "Goods Description",
      flex: 0.5,
    },
    {
      field: "other_lc_terms",
      headerName: "Other LC Terms",
      flex: 0.5,
    },
    {
      field: "bank_ac",
      headerName: "Bank A/C",
      flex: 0.5,
    },
    {
      field: "expiry_date",
      headerName: "Expiry Date",
      flex: 0.5,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "lc_amount",
      headerName: "LC Amount",
      flex: 0.5,
    },
    {
      field: "trans_type",
      headerName: "Transaction Type",
      flex: 0.5,
    },
    {
      field: "trans_type",
      headerName: "Transaction Type",
      flex: 0.5,
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
    getLC(company?.company_id);
  }, [company]);

  useEffect(() => {
    // console.log(company_account_heads);
    if (l_c) setLoading(false);
    else setLoading(true);
  }, [l_c]);

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
      <CustomDataGrid columns={columns} rows={l_c} loading={loading} />
      <AddLCDialog
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
      />
    </MainCard>
  );
};

export default SelectGroup;
