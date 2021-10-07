import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// material-ui
import { Grid, Button } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../../store/constant";
import useAuth from "../../../../hooks/useAuth";
import AddBillTable from "./components/AddBillTable";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import FcNameSelect from "../../../master/ledger-master/AddLedgerDialog/FcNameSelect";

const BillwiseForm = ({ values, setValues }) => {
  const { user } = useAuth();
  const { company } = useSelector((state) => state.companyMaster);

  const addShortcut = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addBill();
    }
  };

  useEffect(() => {
    setValues({
      ...values,
      created_by: user.email,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
  const addBill = () => {
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

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
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
                onClick={addBill}
              >
                Add Bill
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <AddBillTable
          billwise={values.billwise}
          setBillwise={setBillwise}
          deleteBill={deleteBill}
          addShortcut={addShortcut}
          fcName={values.fc_name}
          base_currency={company.base_currency}
        />
      </Grid>
    </Grid>
  );
};

export default BillwiseForm;
