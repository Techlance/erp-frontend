import React, { useState, useEffect } from "react";

// material-ui
import { Button, Grid, Stack } from "@material-ui/core";

// project imports
import { useParams } from "react-router";
import { useSelector } from "react-redux";

// assets
import { gridSpacing } from "../../../../store/constant";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import SaveIcon from "@material-ui/icons/SaveRounded";
import useLedgerMaster from "../../../../hooks/useLedgerMaster";
import LoadingButton from "../../../../ui-component/LoadingButton";
import FcNameSelect from "../../../../components/master/ledger-master/AddLedgerDialog/FcNameSelect";
import useAuth from "../../../../hooks/useAuth";
import BillwiseTable from "./BillwiseTable";

//-----------------------|| Ledger Form ||-----------------------//

const LedgerBillwise = () => {
  const { ledger_balance, ledger_billwise } = useSelector(
    (state) => state.ledgerMaster
  );

  const {
    getLedgerBillwise,
    getLedgerBalance,
    updateLedgerBillwise,
    deleteLedgerBill,
  } = useLedgerMaster();

  const { lid } = useParams();

  const [values, setValues] = useState({ is_cr: false, billwise: [] });
  const [clicked, setClicked] = useState(false);
  const { company } = useSelector((state) => state.companyMaster);
  const [existingBills, setExistingBills] = useState([]);

  const { user } = useAuth();

  const addShortcut = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddBill();
    }
  };

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.id]: event.target.value,
  //   });
  // };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const setBillwise = (index, e) => {
    let billwiseCopy = [...values.billwise];
    billwiseCopy[index][e.target.id || "is_cr"] = e.target.value;
    setValues({
      ...values,
      billwise: billwiseCopy,
    });
  };

  const handleAddBill = () => {
    setValues({
      ...values,
      billwise: [
        ...values.billwise,
        {
          ref_no: null,
          is_cr: true,
          amt: 0,
          fc_amount: 0,
          bill_date: null,
          due_date: null,
        },
      ],
    });
  };

  const deleteBill = (index) => {
    let billwiseCopy = [...values.billwise];
    delete billwiseCopy[index];
    setValues({
      ...values,
      billwise: billwiseCopy,
    });
  };

  const deleteExistingBill = async (id) => {
    await deleteLedgerBill(id);
    await getLedgerBillwise(ledger_balance?.id);
  };

  const makeBillwise = () => {
    return values.billwise.map((val) => {
      return {
        ref_no: val.ref_no,
        fc_amount:
          values.fc_name && values.fc_name?.id !== company.base_currency
            ? parseInt(val.fc_amount)
            : parseInt(0),
        bill_date: val.bill_date,
        due_date: val.due_date,
        amount: parseInt(val.amt),
        cr: val.is_cr ? parseInt(val.amt) : 0,
        dr: val.is_cr ? 0 : parseInt(val.amt),
        created_by: user.email,
      };
    });
  };

  const handleUpdate = async () => {
    setClicked(true);
    let bills = makeBillwise();
    let form = {
      ...values,
      fc_name: values.fc_name?.id,
      billwise: bills,
    };

    await updateLedgerBillwise(form);
    await getLedgerBillwise(ledger_balance?.id);
    setValues({
      ...values,
      billwise: [],
    });
    setClicked(false);
  };

  useEffect(() => {
    if (ledger_balance) {
      if (ledger_billwise) {
        setExistingBills(ledger_billwise);
        setValues({
          company_master_id: ledger_balance.company_master_id,
          ledger_bal_id: ledger_balance.id,
          fc_name: ledger_balance.fc_name,
          billwise: [],
        });
      } else {
        getLedgerBillwise(ledger_balance?.id);
      }
    } else {
      getLedgerBalance(lid);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ledger_balance, ledger_billwise, lid]);

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <pre>{JSON.stringify(values, null, 2)}</pre>
      <Grid item sm={12} md={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={6}>
            <FcNameSelect
              captionLabel="Currency"
              InputLabelProps={{ shrink: true }}
              selected={values.fc_name}
              onChange={handleSelect}
              baseCurrency={company.base_currency}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AnimateButton>
              <Button
                color="primary"
                fullWidth
                // variant="contained"
                size="large"
                onClick={handleAddBill}
              >
                Add Bill
              </Button>
            </AnimateButton>
          </Grid>
          <BillwiseTable
            existingBills={existingBills}
            billwise={values.billwise}
            setBillwise={setBillwise}
            deleteBill={deleteBill}
            addShortcut={addShortcut}
            deleteExistingBill={deleteExistingBill}
            is_fc={
              values.fc_name && values.fc_name?.id !== company.base_currency
            }
          />
          <Grid item xs={12}>
            <Stack direction="row">
              <Grid container justifyContent="flex-end" spacing={gridSpacing}>
                <Grid item>
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleUpdate}
                    startIcon={<SaveIcon />}
                    loading={clicked}
                  >
                    Save Details
                  </LoadingButton>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LedgerBillwise;
