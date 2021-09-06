import React, { useState, useEffect } from "react";

// material-ui
import {
  Button,
  Collapse,
  Fade,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

// project imports
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

// assets
import { gridSpacing } from "../../../../store/constant";
import SubCard from "../../../../ui-component/cards/SubCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";
import useLedgerMaster from "../../../../hooks/useLedgerMaster";
import LoadingButton from "../../../../ui-component/LoadingButton";
import ProtectedDeleteDialog from "../../../../components/ProtectedDeleteDialog";
import AccountGroupSelect from "../../../../components/master/ledger-master/AccountGroupSelect";

//-----------------------|| Ledger Form ||-----------------------//

const LedgerForm = ({ setBs }) => {
  const history = useHistory();

  const { company_ledger_details, company_ledgers } = useSelector(
    (state) => state.ledgerMaster
  );

  const { getCompanyLedgers, updateCompanyLedger, deleteCompanyLedger } =
    useLedgerMaster();

  const { mid } = useParams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [values, setValues] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [receivable, setReceivable] = useState(false);
  const [payable, setPayable] = useState(false);
  const [checkList] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleChecked = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  useEffect(() => {
    if (company_ledger_details) {
      setValues({ ...company_ledger_details });
    }
  }, [company_ledger_details]);

  useEffect(() => {
    if (!company_ledgers) getCompanyLedgers(mid);
  });

  const handleUpdateLedger = async () => {
    setClicked(true);
    let form = { ...values };
    form.acc_group_id = parseInt(form.acc_group_id.id);
    // form.bank_ac_no = parseInt(form.bank_ac_no);
    // form.credit_limit = parseFloat(form.credit_limit);
    form.credit_days = parseInt(form.credit_days);
    if (!(receivable || payable)) {
      form = {
        ...form,
        payment_terms: null,
        delivery_terms: null,
        vat_no: null,
        cc_exp_date: null,
        cc_no: null,
        id_exp_date: null,
        id_no: null,
        cr_exp_date: null,
        cr_no: null,
        tax_reg_no: null,
        contact_person: null,
        email: null,
        tel: null,
        address: null,
      };
    }
    if (!receivable) {
      form = {
        ...form,
        credit_limit: null,
        credit_days: null,
        credit_rating: null,
        block_ac: null,
      };
    } else if (!payable) {
      form = {
        ...form,
        bank_name: null,
        bank_code: null,
        branch_name: null,
        bank_ac_no: null,
      };
    }
    await updateCompanyLedger(form);
    setClicked(false);
  };

  const handleAgree = async () => {
    await deleteCompanyLedger(values.id);
    history.replace(`/company/${mid}/master/ledger-master/ledger`);
  };

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item sm={12} md={8}>
        <SubCard title="Edit Ledger">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="ledger_name"
                label="Ledger Name"
                value={values?.ledger_name}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="old_ledger_id"
                label="Old Ledger ID"
                value={values?.old_ledger_id}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                // error={error}
                // helperText={error && "This Ledger Name Already Exists."}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AccountGroupSelect
                viewOnly
                captionLabel="Account Group"
                InputLabelProps={{ shrink: true }}
                selected={values?.acc_group_id}
                onChange={handleSelect}
                setReceivable={setReceivable}
                setPayable={setPayable}
                setBs={setBs}
              />
            </Grid>
            <Grid item sm={12}>
              <Collapse in={payable || receivable} timeout={1000}>
                <Fade in={payable || receivable}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item sm={12}>
                      <Typography variant="h4">
                        Payables And Receivables Related Fields
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="address"
                        label="Address"
                        value={values?.address}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="tel"
                        label="Telephone No."
                        value={values?.tel}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        value={values?.email}
                        type="email"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="contact_person"
                        label="Contact Person"
                        value={values?.contact_person}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="tax_reg_no"
                        label="Tax Registrtion No."
                        value={values?.tax_reg_no}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="vat_no"
                        label="VAT No."
                        value={values?.vat_no}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="cr_no"
                        label="CR No."
                        value={values?.cr_no}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="cr_exp_date"
                        label="CR Expiry Date"
                        value={values?.cr_exp_date}
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="id_no"
                        label="ID No."
                        value={values?.id_no}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="id_exp_date"
                        label="ID Expiry Date"
                        value={values?.id_exp_date}
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="cc_no"
                        label="CC No."
                        value={values?.cc_no}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="cc_exp_date"
                        label="CC Expiry Date"
                        value={values?.cc_exp_date}
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="delivery_terms"
                        label="Delivery Terms"
                        value={values?.delivery_terms}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="payment_terms"
                        label="Payment Terms"
                        value={values?.payment_terms}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Fade>
              </Collapse>
            </Grid>
            <Grid item sm={12}>
              <Collapse in={payable} style={{ transitionDelay: "500ms" }}>
                <Fade in={payable}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item sm={12}>
                      <Typography variant="h4">
                        Payables Related Fields
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="bank_name"
                        label="Bank Name"
                        value={values?.bank_name}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="branch_name"
                        label="Branch Name"
                        value={values?.branch_name}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="bank_code"
                        label="Bank Code"
                        value={values?.bank_code}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="bank_ac_no"
                        label="Bank A/C No."
                        value={values?.bank_ac_no}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Fade>
              </Collapse>
              <Collapse in={receivable} style={{ transitionDelay: "500ms" }}>
                <Fade in={receivable}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item sm={12}>
                      <Typography variant="h4">
                        Receivables Related Fields
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="credit_limit"
                        label="Credit Limit"
                        value={values?.credit_limit}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="credit_days"
                        label="Credit Days"
                        value={values?.credit_days}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="credit_rating"
                        label="Credit Rating"
                        value={values?.credit_rating}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            id="block_ac"
                            checked={values?.block_ac}
                            onChange={handleChecked}
                            name="block_ac"
                            color="primary"
                          />
                        }
                        label="Block A/C"
                      />
                    </Grid>
                  </Grid>
                </Fade>
              </Collapse>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="space-between">
              <AnimateButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setShowDeleteModal(true)}
                  startIcon={<DeleteIcon />}
                  disabled={values?.is_fixed}
                >
                  Delete
                </Button>
              </AnimateButton>

              <LoadingButton
                variant="contained"
                color="primary"
                onClick={handleUpdateLedger}
                startIcon={<SaveIcon />}
                loading={clicked}
              >
                Save Details
              </LoadingButton>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <ProtectedDeleteDialog
        checkList={checkList}
        showDeleteModal={showDeleteModal}
        handleAgree={handleAgree}
        handleClose={() => setShowDeleteModal(false)}
        title="Are you sure?"
        body="Are you sure you want to delete this Ledgers? Once deleted the data can not be retrived!"
      />
    </Grid>
  );
};

export default LedgerForm;
