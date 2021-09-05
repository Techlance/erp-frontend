import React, { useState, useEffect } from "react";

// material-ui
import { Button, Grid } from "@material-ui/core";

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
    addLedgerBillwise,
    deleteLedgerBill,
  } = useLedgerMaster();

  const { mid, lid } = useParams();

  const [values, setValues] = useState({ is_cr: false, billwise: [] });
  const [clicked, setClicked] = useState(false);
  const { company } = useSelector((state) => state.companyMaster);
  const { user } = useAuth();
  const addShortcut = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddBill();
    }
  };

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
          created: true,
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
        id: val.id ? val.id : null,
        ref_no: val.ref_no,
        fc_amount:
          values.fc_name && values.fc_name?.id !== company.base_currency
            ? parseInt(val.fc_amount)
            : parseInt(0),
        bill_date: val.bill_date,
        due_date: val.due_date,
        cr: val.is_cr ? parseInt(val.amt) : null,
        dr: val.is_cr ? null : parseInt(val.amt),
        amount: val.amt,
        created_by: user.email,
      };
    });
  };

  const handleUpdate = async () => {
    setClicked(true);
    let bills = makeBillwise();
    let form = {
      fc_name: values.fc_name?.id ? values.fc_name.id : company.base_currency,
      billwise: bills,
      company_master_id: mid,
      ledger_master_id: lid,
    };

    await addLedgerBillwise(form);
    if (ledger_balance.id) await getLedgerBillwise(ledger_balance?.id);
    else {
      await getLedgerBalance(lid);
      await getLedgerBillwise(ledger_balance?.id);
    }
    setValues({
      ...values,
      billwise: [],
    });
    setClicked(false);
  };

  useEffect(() => {
    if (ledger_balance) {
      if (ledger_billwise) {
        // setExistingBills(ledger_billwise);
        let ledger_billwise_copy = [...ledger_billwise];
        ledger_billwise_copy = ledger_billwise_copy.map((ledger) => {
          return {
            ...ledger,
            is_cr: ledger.cr > 0 ? true : false,
            amt: ledger.cr > 0 ? ledger.cr : ledger.dr,
          };
        });
        setValues({
          company_master_id: ledger_balance.company_master_id,
          ledger_master_id: lid,
          fc_name: ledger_balance.fc_name
            ? ledger_balance.fc_name
            : company.base_currency,
          billwise: ledger_billwise_copy,
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
      {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
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
                size="large"
                onClick={handleAddBill}
              >
                Add Bill
              </Button>
            </AnimateButton>
          </Grid>
          <Grid item xs={12}>
            <BillwiseTable
              billwise={values.billwise}
              setBillwise={setBillwise}
              deleteBill={deleteBill}
              addShortcut={addShortcut}
              deleteExistingBill={deleteExistingBill}
              is_fc={
                values.fc_name && values.fc_name?.id !== company.base_currency
              }
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
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
      </Grid>
    </Grid>
  );
};

export default LedgerBillwise;
