import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// material-ui
import { Button, Divider, Grid, makeStyles, Typography } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../../store/constant";

// assets
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import MainCard from "../../../../ui-component/cards/MainCard";
import { IconArrowRight } from "@tabler/icons";
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";
import AddCreditPurchaseDialog from "../../../../components/transaction/purchase/AddCreditPurchaseDialog";
import SelectParentVoucher from "../../../../components/transaction/purchase/AddCreditPurchaseDialog/SelectParentVoucher";
import usePurchase from "../../../../hooks/usePurchase";

//-----------------------|| CreditPurchase List ||-----------------------//

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: "2rem 0",
    borderColor: theme.palette.primary.dark,
  },
}));

const CreditPurchase = () => {
  const { pathname } = useLocation();
  const classes = useStyles();
  const [{ company }, { voucher_list, parent_voucher }] = useSelector((state) => [
    state.companyMaster,
    state.purchase,
  ]);

  const { selectParentVoucher } = usePurchase();

  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const onChange = async (item) => {
    await selectParentVoucher(item);
  };

  const columns = [
    {
      field: "id",
      headerName: "Edit",
      flex: 0.2,
      minWidth: 100,
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
            href={`${pathname}${pathname.endsWith("/") ? "" : "/"}${
              params.value
            }`}
          >
            <Typography align="center">More </Typography>
            <IconArrowRight sx={{ fontSize: "1.1rem" }} />
          </Button>
        ) : (
          <Button disabled>Not Editable</Button>
        ),
    },
    {
      field: "CreditPurchase_id",
      headerName: "CreditPurchase ID",
      flex: 0.2,
      minWidth: 200,
    }
  ];

  useEffect(() => {
    // get_function

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

//   useEffect(() => {
//     if (company_CreditPurchases) setLoading(false);
//     else setLoading(true);
//   }, [company_CreditPurchases, company]);

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
            <Typography variant="h3">Credit Purchases</Typography>
          </Grid>
          <Grid item>
          {voucher_list && parent_voucher && (
            <AnimateButton>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setShowAddModal(true)}
              >
                Add Credit Purchase
              </Button>
            </AnimateButton>
          )}
          </Grid>
        </Grid>
      }
      content={true}
    >
      <SelectParentVoucher captionLabel="Select Voucher" onChange={onChange} />
      {voucher_list && parent_voucher && (
        <>
          <Divider
            variant="middle"
            py={4}
            flexItem
            className={classes.divider}
          />
          <CustomDataGrid columns={columns} rows={[]} loading={loading} />
        </>
      )}
      <AddCreditPurchaseDialog
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
      />
    </MainCard>
  );
};

export default CreditPurchase;
